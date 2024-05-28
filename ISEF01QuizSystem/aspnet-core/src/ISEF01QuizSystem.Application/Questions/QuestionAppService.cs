using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ISEF01QuizSystem.Common;
using ISEF01QuizSystem.Options;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;

namespace ISEF01QuizSystem.Questions;

public class QuestionAppService : ISEF01QuizSystemAppService
{
    private readonly IRepository<QuestionEntity> _questionEntityRepository;
    private readonly IGenericRepository<QuestionEntity> _genericRepository; 
    private readonly IRepository<OptionEntity> _optionRepository; 
    
    public QuestionAppService(
        IRepository<QuestionEntity> questionEntityRepository, 
        IGenericRepository<QuestionEntity> genericRepository, 
        IRepository<OptionEntity> optionRepository)
    {
        _questionEntityRepository = questionEntityRepository;
        _genericRepository = genericRepository;
        _optionRepository = optionRepository;
    }
    
    public async Task<PagedResultDto<QuestionResponseDto>> GetListByQuizAsync(QuestionCatalogRequestDto requestDto)
    {
        var queryable = await _questionEntityRepository.GetQueryableAsync();

        if (requestDto.QuizId != null)
        {
            queryable = queryable.Where(x => x.QuizId == requestDto.QuizId);
        }

        var defaultSorting = new SortingModel<QuestionEntity>(x => x.Order);
        var result = await queryable.GetModifiedDataListWithResultCount<QuestionEntity, QuestionResponseDto>(
            requestDto,
            AsyncExecuter,
            ObjectMapper,
            defaultSorting);

        return result;
    }

    public async Task<QuestionResponseDto> GetByIdAsync(int id)
    {
        var entity = await _genericRepository.GetByPredicateWithNestedElements(x => x.Id == id);

        var result = ObjectMapper.Map<QuestionEntity, QuestionResponseDto>(entity);
        
        return result;
    }
    
    public async Task<List<QuestionResponseDto>> GetListByQuizIdOrderedAsync(QuestionsForQuizRequestDto requestDto)
    {
        var queryable = (await _genericRepository.GetListByPredicateWithNestedElements(x => x.QuizId == requestDto.QuizId)).AsQueryable();

        var defaultSorting = new SortingModel<QuestionEntity>(x => x.Order);
        var result = await queryable.GetModifiedDataList<QuestionEntity, QuestionResponseDto>(
            requestDto,
            AsyncExecuter,
            ObjectMapper,
            defaultSorting);
        
        return result;
    }
    
    public async Task<List<QuestionResponseDto>> GetListByQuizIdAsync(int quizId)
    {
        var entityInDb = (await _genericRepository.GetListByPredicateWithNestedElements(x => x.QuizId == quizId)).ToList();

        var result = ObjectMapper.Map<List<QuestionEntity>, List<QuestionResponseDto>>(entityInDb);
        
        return result;
    }

    public async Task<QuestionResponseDto> GetByQuizIdWithAnswersAsync(QuestionsForQuizRequestDto requestDto)
    {
        var actualSearchedQuestionOrder = ++requestDto.PreviousQuestionOrderNumber;
        var entityByQuizId = await _genericRepository.GetByPredicateWithNestedElements(x => x.QuizId == requestDto.QuizId && x.Order == actualSearchedQuestionOrder);
        
        var result = ObjectMapper.Map<QuestionEntity, QuestionResponseDto>(entityByQuizId);

        result.IsLastQuestion = await CheckIfNextQuestionExistsByOrder((int)actualSearchedQuestionOrder, requestDto.QuizId);
        
        return result;
    }
    
    public async Task CreateOrUpdateAsync(QuestionRequestDto requestDto)
    {
        var questionEntityInDb = await _questionEntityRepository.FirstOrDefaultAsync(x => x.Id == requestDto.QuestionId);

        if (questionEntityInDb != default)
        {
            await UpdateWorkflowForQuestionAndOption(questionEntityInDb, requestDto);
        }
        else
        {
            await CreateWorkflowForQuestionAndOption(requestDto);
        }
    }
    
    public async Task DeleteAsync(int id)
    {
        var quizEntity = await _questionEntityRepository.FirstOrDefaultAsync(x => x.Id == id);

        if (quizEntity != default)
        {
            await _questionEntityRepository.DeleteAsync(quizEntity);
        }

        throw new UserFriendlyException($"Quiz cannot be deleted, because it doesn't exist!");
    }

    private async Task<bool> CheckIfNextQuestionExistsByOrder(int actualOrderNumber, int quizId)
    {
        var nextQuestionOrder = ++actualOrderNumber;
        var entityByQuizId = await _questionEntityRepository.FirstOrDefaultAsync(x => x.QuizId == quizId && x.Order == nextQuestionOrder);

        return entityByQuizId == default ? true : false;
    }

    private async Task CreateWorkflowForQuestionAndOption(QuestionRequestDto requestDto)
    {
        var lastQuestionOrder = (await _questionEntityRepository.GetListAsync(x => x.QuizId == requestDto.QuizId)).OrderByDescending(x=> x.Order).First().Order;

        var entity = new QuestionEntity(requestDto.QuizId, requestDto.Content, ++lastQuestionOrder);
            
        var insertedQuestion = await _questionEntityRepository.InsertAsync(entity, autoSave: true);
            
        var mappedOptions = ObjectMapper.Map<List<OptionRequestDto>, List<OptionEntity>>(requestDto.Options);

        foreach (var option in mappedOptions)
        {
            option.QuestionId = insertedQuestion.Id;
        }
            
        await _optionRepository.InsertManyAsync(mappedOptions);
    }
    
    private async Task UpdateWorkflowForQuestionAndOption(QuestionEntity questionEntityInDb, QuestionRequestDto requestDto)
    {
        questionEntityInDb.Update(requestDto.Content);

        await _questionEntityRepository.UpdateAsync(questionEntityInDb);

        foreach (var option in requestDto.Options)
        {
            var optionEntity = await _optionRepository.GetAsync(x => x.Id == option.Id);
                
            optionEntity.Update(option.Text, option.IsCorrect);

            await _optionRepository.UpdateAsync(optionEntity, autoSave: true);
        }
    }
}