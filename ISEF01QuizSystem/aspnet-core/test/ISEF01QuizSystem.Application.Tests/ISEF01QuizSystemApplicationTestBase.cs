using Volo.Abp.Modularity;

namespace ISEF01QuizSystem;

public abstract class ISEF01QuizSystemApplicationTestBase<TStartupModule> : ISEF01QuizSystemTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
