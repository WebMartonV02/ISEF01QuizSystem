using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ISEF01QuizSystem.EntityFrameworkCore;
using ISEF01QuizSystem.Quiz;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.Users;

namespace ISEF01QuizSystem.Quizes;

public class QuizRepository : EfCoreRepository<ISEF01QuizSystemDbContext, QuizEntity>, IQuizRepository, ITransientDependency
{
    private readonly ICurrentUser _currentUser;
    
    public QuizRepository(
        IDbContextProvider<ISEF01QuizSystemDbContext> dbContextProvider,
        ICurrentUser currentUser) : base(dbContextProvider)
    {
        _currentUser = currentUser;
    }

    public async Task<List<QuizEntity>> GetQuizesWithIncludedAttemptsBelongingToUserId()
    {
        var result = (await GetDbSetAsync())
            .Include(x => x.Attempts
                .Where(x => x.UserId == _currentUser.Id))
            .Where(x => x.Attempts.Any())
            .ToList();

        return result;
    }
}