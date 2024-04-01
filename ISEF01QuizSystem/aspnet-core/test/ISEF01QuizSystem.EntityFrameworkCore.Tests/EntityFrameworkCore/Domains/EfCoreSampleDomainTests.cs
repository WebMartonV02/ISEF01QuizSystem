using ISEF01QuizSystem.Samples;
using Xunit;

namespace ISEF01QuizSystem.EntityFrameworkCore.Domains;

[Collection(ISEF01QuizSystemTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<ISEF01QuizSystemEntityFrameworkCoreTestModule>
{

}
