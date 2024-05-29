using ISEF01QuizSystem.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace ISEF01QuizSystem.Permissions;

public class ISEF01QuizSystemPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(ISEF01QuizSystemPermissions.GroupName);
        //Define your own permissions here. Example:
        //myGroup.AddPermission(ISEF01QuizSystemPermissions.MyPermission1, L("Permission:MyPermission1"));
        myGroup.AddPermission(ISEF01QuizSystemPermissions.QuizSystem.QuizMaster, L("Permission:QuizMaster"));
        myGroup.AddPermission(ISEF01QuizSystemPermissions.QuizSystem.Student, L("Permission:Student"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<ISEF01QuizSystemResource>(name);
    }
}
