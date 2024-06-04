using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace ISEF01QuizSystem;

[Dependency(ReplaceServices = true)]
public class ISEF01QuizSystemBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "Quizmunity";
}
