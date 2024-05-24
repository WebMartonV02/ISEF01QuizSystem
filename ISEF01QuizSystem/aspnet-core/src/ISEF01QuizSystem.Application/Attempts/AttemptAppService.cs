using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Users;

namespace ISEF01QuizSystem.Attempts;

public class AttemptAppService : ISEF01QuizSystemAppService
{
    private readonly IRepository<AttemptEntity> _attemptRepository;
    private readonly ICurrentUser _currentUser;
    
    public AttemptAppService(
        IRepository<AttemptEntity> attemptRepository,
        ICurrentUser currentUser)
    {
        _attemptRepository = attemptRepository;
        _currentUser = currentUser;
    }

    public async Task CreateAttempt(AttemptRequestDto requestDto)
    {
        var currentUserId = _currentUser.Id;

        var attemptsByUserAndQuiz = await _attemptRepository.GetListAsync(x =>
            x.QuizId == requestDto.QuizId && x.UserId == currentUserId);

        var lastAttemptNumber = attemptsByUserAndQuiz.MaxBy(x => x.Count)?.Count ?? 0;
        
        var entityToBeSaved = new AttemptEntity(
            (Guid)currentUserId,
            requestDto.QuizId,
            requestDto.Score,
            ++lastAttemptNumber);

        await _attemptRepository.InsertAsync(entityToBeSaved);
    }
}