using System;
using System.Collections.Generic;
using Nito.AsyncEx.Synchronous;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;

namespace ISEF01QuizSystem.Common;

public static class DataOperationRepositoryExtension
{
    public static void CreateOrLoadEntity<T>(this IRepository<T> entityRepository, ref T entity) where T : Entity<int>
    {
        entityRepository.ExecuteCreateUpdateOrLoadWorkflow(ref entity);
    }
    
    public static void CreateOrUpdateEntity<T>(this IRepository<T> entityRepository, ref T entity) where T : Entity<int>
    {
        entityRepository.ExecuteCreateUpdateOrLoadWorkflow(ref entity, true);
    }

    public static void SetGuidForEntity<T>(this T entity, string guidStr) where T : Entity<int>
    {
        _ = Guid.TryParse(guidStr, out var guid);
        entity.GetType().GetProperty(nameof(Entity<int>.Id)).SetValue(entity, guid);
    }

    private static void ExecuteCreateUpdateOrLoadWorkflow<T>(this IRepository<T> entityRepository, ref T entity, bool updateIfExists = false)
        where T : Entity<int>
    {
        try
        {
            var entityId = entity.Id;
            var entityFromDb = entityRepository.FindAsync(x => x.Id == entityId).WaitAndUnwrapException();
            if (entityFromDb == null)
            {
                entityFromDb = entityRepository.InsertAsync(entity, autoSave: true).WaitAndUnwrapException();
            }
            else
            {
                var propertyNamesToNotCopy = new List<string>(2)
                {
                    nameof(Entity<Guid>.Id),
                    nameof(AggregateRoot.ConcurrencyStamp)
                };

                if (updateIfExists)
                {
                    entityFromDb = entityRepository.UpdateAsync(entity, autoSave: true).WaitAndUnwrapException();
                }
                
                CopyAllPropertiesExcept(ref entity, ref entityFromDb, propertyNamesToNotCopy);
            }

            entity = entityFromDb;
        }
        catch (Exception ex)
        {

            throw;
        }
    }

    private static void CopyAllPropertiesExcept<T>(ref T from, ref T to, ICollection<string> excludedPropertyNames) where T : Entity<int>
    {
        var fromProperties = from.GetType().GetProperties();
        foreach (var fromProperty in fromProperties)
        {
            if (!excludedPropertyNames.Contains(fromProperty.Name))
            {
                var fromPropertyValue = fromProperty.GetValue(from);
                to.GetType().GetProperty(fromProperty.Name).DeclaringType.GetProperty(fromProperty.Name).SetValue(to, fromPropertyValue);
            }
        }
    }
}