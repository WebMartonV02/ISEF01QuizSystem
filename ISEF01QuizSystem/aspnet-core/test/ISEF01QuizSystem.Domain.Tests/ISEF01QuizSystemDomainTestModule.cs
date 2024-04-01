using Volo.Abp.Modularity;

namespace ISEF01QuizSystem;

[DependsOn(
    typeof(ISEF01QuizSystemDomainModule),
    typeof(ISEF01QuizSystemTestBaseModule)
)]
public class ISEF01QuizSystemDomainTestModule : AbpModule
{

}
