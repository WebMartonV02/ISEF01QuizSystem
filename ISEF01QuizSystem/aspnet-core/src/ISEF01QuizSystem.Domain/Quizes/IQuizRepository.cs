using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace ISEF01QuizSystem.Quiz;

public interface IQuizRepository : IRepository<QuizEntity>
{
    Task<List<QuizEntity>> GetQuizesWithIncludedAttemptsBelongingToUserId();
}