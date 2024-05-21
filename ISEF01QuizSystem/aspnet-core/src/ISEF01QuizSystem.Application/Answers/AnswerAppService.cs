using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Users;

namespace ISEF01QuizSystem.Answers;

public class AnswerAppService : ISEF01QuizSystemAppService
{
    private readonly IRepository<AnswerEntity> _answerEntityRepository;
    private readonly ICurrentUser _currentUser;
    
    public AnswerAppService(IRepository<AnswerEntity> answerEntityRepository, ICurrentUser currentUser)
    {
        _answerEntityRepository = answerEntityRepository;
        _currentUser = currentUser;
    }

    public async Task<List<AnswerResponseDto>> GetAnswersForQuizByUserId(List<int> questionIds)
    {
        var currentLoggedInUserId = (Guid)_currentUser.Id;

        var queriedDataInDb = (await _answerEntityRepository.GetQueryableAsync())
            .Where(x => x.UserId == currentLoggedInUserId
                        && questionIds.Contains(x.QuestionId)).ToList();

        var result = ObjectMapper.Map<List<AnswerEntity>, List<AnswerResponseDto>>(queriedDataInDb);
        
        return result;
    }

    public async Task CreateAnswerAsync(AnswerRequestDto requestDto)
    {
        var currentLoggedInUserId = (Guid)_currentUser.Id;

        var entityToBeCreated = new AnswerEntity(requestDto.OptionId, requestDto.QuestionId, currentLoggedInUserId);

        await _answerEntityRepository.InsertAsync(entityToBeCreated);
    }
}