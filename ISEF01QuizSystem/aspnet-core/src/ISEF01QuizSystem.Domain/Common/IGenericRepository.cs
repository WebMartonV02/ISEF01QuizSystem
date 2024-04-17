using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;

namespace ISEF01QuizSystem.Common;

public interface IGenericRepository<TEntity> : IRepository where TEntity : Entity
{
    Task<TEntity> GetByPredicateWithNestedElements(Expression<Func<TEntity, bool>> predicate);
    Task<List<TEntity>> GetListByPredicateWithNestedElements(Expression<Func<TEntity, bool>> predicate);
}