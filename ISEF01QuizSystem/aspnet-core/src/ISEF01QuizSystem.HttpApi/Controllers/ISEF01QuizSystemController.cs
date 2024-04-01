using ISEF01QuizSystem.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace ISEF01QuizSystem.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class ISEF01QuizSystemController : AbpControllerBase
{
    protected ISEF01QuizSystemController()
    {
        LocalizationResource = typeof(ISEF01QuizSystemResource);
    }
}
