using System.Linq;
using System.Threading.Tasks;
using ISEF01QuizSystem.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace ISEF01QuizSystem.Courses;

public class CourseRepository : EfCoreRepository<ISEF01QuizSystemDbContext, CourseEntity>, ICourseRepository, ITransientDependency
{
    public CourseRepository(
        IDbContextProvider<ISEF01QuizSystemDbContext> dbContextProvider) : base(dbContextProvider) { }
    
    public async Task<CourseEntity> GetCourseWithIncludedQuizesAndAttempts(int courseId)
    {
        var result = (await GetDbSetAsync())
            .Where(x => x.Id == courseId)
            .Include(x => x.Quizes)
            .ThenInclude(x => x.Attempts)
            .FirstOrDefault();

        return result;
    }
}