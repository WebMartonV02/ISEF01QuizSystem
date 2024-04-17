using System.Collections.Generic;
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
        var entity = await _questionEntityRepository.GetAsync(x => x.Id == id);

        var result = ObjectMapper.Map<QuestionEntity, QuestionResponseDto>(entity);
        
        return result;
    }
    
    public async Task<List<QuestionResponseDto>> GetByQuizIdOrderedAsync(int quizId)
    {
        var entitiesByQuizId = await _genericRepository.GetListByPredicateWithNestedElements(x => x.QuizId == quizId);

        var result = ObjectMapper.Map<List<QuestionEntity>, List<QuestionResponseDto>>(entitiesByQuizId);
        
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
}