using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ISEF01QuizSystem.Data;
using Volo.Abp.DependencyInjection;

namespace ISEF01QuizSystem.EntityFrameworkCore;

public class EntityFrameworkCoreISEF01QuizSystemDbSchemaMigrator
    : IISEF01QuizSystemDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreISEF01QuizSystemDbSchemaMigrator(
        IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolve the ISEF01QuizSystemDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<ISEF01QuizSystemDbContext>()
            .Database
            .MigrateAsync();
    }
}
