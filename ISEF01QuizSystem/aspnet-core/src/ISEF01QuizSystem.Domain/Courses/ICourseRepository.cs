using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace ISEF01QuizSystem.Courses;

public interface ICourseRepository : IRepository<CourseEntity>
{
    Task<CourseEntity> GetCourseWithIncludedQuizesAndAttempts(int courseId);
}