using System.Threading.Tasks;

namespace ISEF01QuizSystem.Data;

public interface IISEF01QuizSystemDbSchemaMigrator
{
    Task MigrateAsync();
}
