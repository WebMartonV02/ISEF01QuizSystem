namespace ISEF01QuizSystem.Permissions;

public static class ISEF01QuizSystemPermissions
{
    public const string GroupName = "QuizSystem";

    //Add your own permission names. Example:
    //public const string MyPermission1 = GroupName + ".MyPermission1";
    public static class QuizSystem
    {
        public const string QuizMaster = GroupName + ".QuizMaster";
        public const string Student = GroupName + ".Student";
    }
}
