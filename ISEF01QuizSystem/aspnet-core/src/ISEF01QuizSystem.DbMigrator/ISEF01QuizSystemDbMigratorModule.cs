using ISEF01QuizSystem.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace ISEF01QuizSystem.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(ISEF01QuizSystemEntityFrameworkCoreModule),
    typeof(ISEF01QuizSystemApplicationContractsModule)
    )]
public class ISEF01QuizSystemDbMigratorModule : AbpModule
{
}
