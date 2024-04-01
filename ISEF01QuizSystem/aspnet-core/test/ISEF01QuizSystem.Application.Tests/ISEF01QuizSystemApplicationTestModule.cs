using Volo.Abp.Modularity;

namespace ISEF01QuizSystem;

[DependsOn(
    typeof(ISEF01QuizSystemApplicationModule),
    typeof(ISEF01QuizSystemDomainTestModule)
)]
public class ISEF01QuizSystemApplicationTestModule : AbpModule
{

}
