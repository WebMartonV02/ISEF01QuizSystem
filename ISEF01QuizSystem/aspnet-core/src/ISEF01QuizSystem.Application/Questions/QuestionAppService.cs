using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ISEF01QuizSystem.Common;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;

namespace ISEF01QuizSystem.Questions;

public class QuestionAppService : ISEF01QuizSystemAppService
{
    private readonly IRepository<QuestionEntity> _questionEntityRepository;
    private readonly IGenericRepository<QuestionEntity> _genericRepository; 
    
    public QuestionAppService(
        IRepository<QuestionEntity> questionEntityRepository, 
        IGenericRepository<QuestionEntity> genericRepository)
    {
        _questionEntityRepository = questionEntityRepository;
        _genericRepository = genericRepository;
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

    public async Task<QuestionResponseDto> GetByQuizIdWithAnswersAsync(QuestionsForQuizRequestDto requestDto)
    {
        var actualSearchedQuestionOrder = ++requestDto.PreviousQuestionOrderNumber;
        var entityByQuizId = await _genericRepository.GetByPredicateWithNestedElements(x => x.QuizId == requestDto.QuizId && x.Order == actualSearchedQuestionOrder);
        
        var result = ObjectMapper.Map<QuestionEntity, QuestionResponseDto>(entityByQuizId);

        result.IsLastQuestion = await CheckIfNextQuestionExistsByOrder(actualSearchedQuestionOrder, requestDto.QuizId);
        
        return result;
    }
    
    public void CreateAsync(QuestionRequestDto requestDto)
    {
        var entity = ObjectMapper.Map<QuestionRequestDto, QuestionEntity>(requestDto);
        
        _questionEntityRepository.CreateOrLoadEntity(ref entity);
    }
    
    public void UpdateAsync(QuestionRequestDto requestDto)
    {
        var entity = ObjectMapper.Map<QuestionRequestDto, QuestionEntity>(requestDto);

        _questionEntityRepository.CreateOrUpdateEntity(ref entity);
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

        return entityByQuizId != default ? true : false;
    }
}