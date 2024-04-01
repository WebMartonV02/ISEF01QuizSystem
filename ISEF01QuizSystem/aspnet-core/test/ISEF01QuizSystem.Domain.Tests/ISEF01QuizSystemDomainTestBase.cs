using Volo.Abp.Modularity;

namespace ISEF01QuizSystem;

/* Inherit from this class for your domain layer tests. */
public abstract class ISEF01QuizSystemDomainTestBase<TStartupModule> : ISEF01QuizSystemTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
