using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ISEF01QuizSystem.Common;
using ISEF01QuizSystem.Courses;
using ISEF01QuizSystem.Quiz;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;
using Volo.Abp.Users;

namespace ISEF01QuizSystem.Scoreboard;

public class ScoreboardAppService : ISEF01QuizSystemAppService
{
    private readonly ICurrentUser _currentUser;
    private readonly IGenericRepository<CourseEntity> _courseGenericRepository;
    private readonly IQuizRepository _quizRepository;
    private readonly ICourseRepository _courseRepository;
    private readonly IIdentityUserRepository _identityUserRepository;
    private readonly IGenericRepository<QuizEntity> _genericQuizEntity;
    
    public ScoreboardAppService(
        ICurrentUser currentUser,
        IGenericRepository<CourseEntity> courseGenericRepository, 
        IQuizRepository quizRepository, 
        IIdentityUserRepository identityUserRepository, IGenericRepository<QuizEntity> genericQuizEntity, ICourseRepository courseRepository)
    {
        _currentUser = currentUser;
        _courseGenericRepository = courseGenericRepository;
        _quizRepository = quizRepository;
        _identityUserRepository = identityUserRepository;
        _genericQuizEntity = genericQuizEntity;
        _courseRepository = courseRepository;
    }
    
    public async Task<PagedResultDto<GlobalScoreboardResultDto>> GetCalculatedGlobalScoreboardForQuiz(ScoreboardGlobalRequestDto requestDto)
    {
        var courseWithNesteds = await _courseRepository.GetCourseWithIncludedQuizesAndAttempts(requestDto.CourseId);

        // var asd = await _genericQuizEntity.GetByPredicateWithNestedElements(x => x.Id == 1);
        
        var usersAndScores = new Dictionary<Guid, int>();

        foreach (var quiz in courseWithNesteds.Quizes)
        {
            var userIdsInAttempts = quiz.Attempts.Select(x => x.UserId).Distinct().ToList();
            
            foreach (var userId in userIdsInAttempts)
            {
                var scorePointFromLastAttemptByUser = quiz.Attempts.Where(x => x.UserId == userId).MaxBy(x => x.Count).Score;
                
                // TODO: sum up score points
                if(usersAndScores.ContainsKey(userId)){
                    usersAndScores.Remove(userId);
                } 
                usersAndScores.Add(userId, scorePointFromLastAttemptByUser);
                
                
                
            }
        }

        var allUserIds = usersAndScores.Keys.Distinct().ToList();
        var builtResultModel = new List<GlobalScoreboardResultDto>();
        
        foreach (var userId in allUserIds)
        {
            var scoresByUserId = usersAndScores.Where(x => x.Key == userId).Select(x => x.Value).ToList();

            var userNameById = (await _identityUserRepository.GetAsync(userId)).UserName;
            
            builtResultModel.Add(new GlobalScoreboardResultDto()
            {
                UserName = userNameById,
                ScorePoint = scoresByUserId.Sum()
            });
        }

        var builtQueryableResultModel = builtResultModel.AsQueryable();
        builtQueryableResultModel = builtQueryableResultModel.ApplySearchFilter(requestDto.SearchPredicate);

        var totalCount = builtQueryableResultModel.Count();
        
        builtQueryableResultModel = builtQueryableResultModel.ApplySorting(requestDto.Sorting, new SortingModel<GlobalScoreboardResultDto>(x => x.ScorePoint));

        builtQueryableResultModel = builtQueryableResultModel
            .Skip(requestDto.SkipCount)
            .Take(requestDto.MaxResultCount);

        var resultData = await AsyncExecuter.ToListAsync(builtQueryableResultModel);

        var result = new PagedResultDto<GlobalScoreboardResultDto>(totalCount, resultData);
        
        return result;
    }

    public async Task<List<PersonalScoreboardResultDto>> GetCalculatedPersonalScoreboard(Guid userId)
    {
        if (_currentUser?.Id != userId)
            throw new UserFriendlyException("User is either not logged in or technical problem occured.");
        
        var quizesFilledByUser = await _quizRepository.GetQuizesWithIncludedAttemptsBelongingToUserId();

        var result = new List<PersonalScoreboardResultDto>();

        foreach (var quiz in quizesFilledByUser)
        {
            var lastAttemptOfCurrentQuiz = quiz.Attempts.MaxBy(x => x.Count);

            if (lastAttemptOfCurrentQuiz != null)
            {
                result.Add(new PersonalScoreboardResultDto()
                {
                    QuizName = quiz.Title,
                    ScorePoints = lastAttemptOfCurrentQuiz.Score
                });
            }
        }
        
        return result;
    }
}