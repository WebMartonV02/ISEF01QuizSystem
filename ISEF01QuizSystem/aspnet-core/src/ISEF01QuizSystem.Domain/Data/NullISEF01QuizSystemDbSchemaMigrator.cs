using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace ISEF01QuizSystem.Data;

/* This is used if database provider does't define
 * IISEF01QuizSystemDbSchemaMigrator implementation.
 */
public class NullISEF01QuizSystemDbSchemaMigrator : IISEF01QuizSystemDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
