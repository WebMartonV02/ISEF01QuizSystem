using ISEF01QuizSystem.Samples;
using Xunit;

namespace ISEF01QuizSystem.EntityFrameworkCore.Applications;

[Collection(ISEF01QuizSystemTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<ISEF01QuizSystemEntityFrameworkCoreTestModule>
{

}
