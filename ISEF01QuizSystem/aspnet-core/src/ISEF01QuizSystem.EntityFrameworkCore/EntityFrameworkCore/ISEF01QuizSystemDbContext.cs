using ISEF01QuizSystem.Answers;
using ISEF01QuizSystem.Attempts;
using ISEF01QuizSystem.Comments;
using ISEF01QuizSystem.Courses;
using ISEF01QuizSystem.Options;
using ISEF01QuizSystem.Questions;
using ISEF01QuizSystem.Quiz;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;

namespace ISEF01QuizSystem.EntityFrameworkCore;

[ReplaceDbContext(typeof(IIdentityDbContext))]
[ReplaceDbContext(typeof(ITenantManagementDbContext))]
[ConnectionStringName("Default")]
public class ISEF01QuizSystemDbContext :
    AbpDbContext<ISEF01QuizSystemDbContext>,
    IIdentityDbContext,
    ITenantManagementDbContext
{
    /* Add DbSet properties for your Aggregate Roots / Entities here. */
    public DbSet<QuizEntity> Quizes { get; set; }
    public DbSet<QuestionEntity> Questions { get; set; }
    public DbSet<CourseEntity> Courses { get; set; }
    public DbSet<AttemptEntity> Attempts { get; set; }
    public DbSet<CommentEntity> Comments { get; set; }
    public DbSet<AnswerEntity> Answers { get; set; }
    public DbSet<OptionEntity> Options { get; set; }

    #region Entities from the modules

    /* Notice: We only implemented IIdentityDbContext and ITenantManagementDbContext
     * and replaced them for this DbContext. This allows you to perform JOIN
     * queries for the entities of these modules over the repositories easily. You
     * typically don't need that for other modules. But, if you need, you can
     * implement the DbContext interface of the needed module and use ReplaceDbContext
     * attribute just like IIdentityDbContext and ITenantManagementDbContext.
     *
     * More info: Replacing a DbContext of a module ensures that the related module
     * uses this DbContext on runtime. Otherwise, it will use its own DbContext class.
     */

    //Identity
    public DbSet<IdentityUser> Users { get; set; }
    public DbSet<IdentityRole> Roles { get; set; }
    public DbSet<IdentityClaimType> ClaimTypes { get; set; }
    public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
    public DbSet<IdentitySecurityLog> SecurityLogs { get; set; }
    public DbSet<IdentityLinkUser> LinkUsers { get; set; }
    public DbSet<IdentityUserDelegation> UserDelegations { get; set; }

    // Tenant Management
    public DbSet<Tenant> Tenants { get; set; }
    public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; }

    #endregion

    public ISEF01QuizSystemDbContext(DbContextOptions<ISEF01QuizSystemDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        /* Include modules to your migration db context */

        builder.ConfigurePermissionManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureBackgroundJobs();
        builder.ConfigureAuditLogging();
        builder.ConfigureIdentity();
        builder.ConfigureOpenIddict();
        builder.ConfigureFeatureManagement();
        builder.ConfigureTenantManagement();

        /* Configure your own tables/entities inside here */

        builder.Entity<CourseEntity>(b =>
        {
            b.ToTable(ISEF01QuizSystemConsts.DbTablePrefix + nameof(CourseEntity), ISEF01QuizSystemConsts.DbSchema);
            b.Property(x => x.Title).IsRequired();
            b.Property(x => x.Description).IsRequired();
            
            b.HasMany(x => x.Quizes)
                .WithOne(x => x.Course).HasForeignKey(x => x.CourseId);
        });
        
        builder.Entity<QuizEntity>(b =>
        {
            b.ToTable(ISEF01QuizSystemConsts.DbTablePrefix + nameof(QuizEntity), ISEF01QuizSystemConsts.DbSchema);
            b.Property(x => x.Title).IsRequired();
            b.Property(x => x.Description).IsRequired();

            b.HasMany(x => x.Questions)
                .WithOne(x => x.Quiz).HasForeignKey(x => x.QuizId);
            
            b.HasMany(x => x.Attempts)
                .WithOne(x => x.Quiz).HasForeignKey(x => x.QuizId);
            
            b.HasMany(x => x.Comments)
                .WithOne(x => x.Quiz).HasForeignKey(x => x.QuizId);
        });
        
        builder.Entity<QuestionEntity>(b =>
        {
            b.ToTable(ISEF01QuizSystemConsts.DbTablePrefix + nameof(QuestionEntity), ISEF01QuizSystemConsts.DbSchema);
            b.Property(x => x.QuizId).IsRequired();
            b.Property(x => x.Content).IsRequired();
            b.Property(x => x.Order).IsRequired();

            b.HasOne<QuizEntity>(x => x.Quiz)
                .WithMany(x => x.Questions).HasForeignKey(x => x.QuizId);
            
            b.HasMany(x => x.Answers)
                .WithOne(x => x.Question).HasForeignKey(x => x.QuestionId);
            
            b.HasMany(x => x.Options)
                .WithOne(x => x.Question).HasForeignKey(x => x.QuestionId);
        });
        
        builder.Entity<AttemptEntity>(b =>
        {
            b.ToTable(ISEF01QuizSystemConsts.DbTablePrefix + nameof(AttemptEntity), ISEF01QuizSystemConsts.DbSchema);
            b.Property(x => x.QuizId).IsRequired();
            b.Property(x => x.UserId).IsRequired();
            b.Property(x => x.Score).IsRequired();
        });
        
        builder.Entity<AnswerEntity>(b =>
        {
            b.ToTable(ISEF01QuizSystemConsts.DbTablePrefix + nameof(AnswerEntity), ISEF01QuizSystemConsts.DbSchema);
            b.Property(x => x.QuestionId).IsRequired();
            b.Property(x => x.UserId).IsRequired();
        });
        
        builder.Entity<CommentEntity>(b =>
        {
            b.ToTable(ISEF01QuizSystemConsts.DbTablePrefix + nameof(CommentEntity), ISEF01QuizSystemConsts.DbSchema);
            b.Property(x => x.QuizId).IsRequired();
            b.Property(x => x.Content).IsRequired();
            b.Property(x => x.Order).IsRequired();
        });
        
        builder.Entity<OptionEntity>(b =>
        {
            b.ToTable(ISEF01QuizSystemConsts.DbTablePrefix + nameof(OptionEntity), ISEF01QuizSystemConsts.DbSchema);
            b.Property(x => x.QuestionId).IsRequired();
            b.Property(x => x.Text).IsRequired();
        });
    }
}