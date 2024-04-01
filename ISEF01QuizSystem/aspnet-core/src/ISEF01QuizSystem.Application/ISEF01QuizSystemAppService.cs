using System;
using System.Collections.Generic;
using System.Text;
using ISEF01QuizSystem.Localization;
using Volo.Abp.Application.Services;

namespace ISEF01QuizSystem;

/* Inherit your application services from this class.
 */
public abstract class ISEF01QuizSystemAppService : ApplicationService
{
    protected ISEF01QuizSystemAppService()
    {
        LocalizationResource = typeof(ISEF01QuizSystemResource);
    }
}
