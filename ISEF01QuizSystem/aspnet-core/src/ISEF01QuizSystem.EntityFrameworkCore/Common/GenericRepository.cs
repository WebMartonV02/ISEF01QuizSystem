using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ISEF01QuizSystem.EntityFrameworkCore;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace ISEF01QuizSystem.Common;

public class GenericRepository<TEntity> : EfCoreRepository<ISEF01QuizSystemDbContext,TEntity>, IGenericRepository<TEntity> where TEntity : Entity
{
    private readonly IRepository<TEntity> _entityRepository;
    private readonly IMapper _mapper;
    
    public GenericRepository(
        IDbContextProvider<ISEF01QuizSystemDbContext> dbContextProvider,
        IMapper mapper,
        IRepository<TEntity> entityRepository) :  base(dbContextProvider)
    {
        _mapper = mapper;
        _entityRepository = entityRepository;
    }

    public async Task<TEntity> GetByPredicateWithNestedElements(Expression<Func<TEntity, bool>> predicate)
    {
        var dbSet = await GetDbContextAsync();

        var result = dbSet.Set<TEntity>()
            .Where(predicate)
            .ProjectTo<TEntity>(_mapper.ConfigurationProvider)
            .SingleOrDefault();
        
        return result;
    }
    
    public async Task<List<TEntity>> GetListByPredicateWithNestedElements(Expression<Func<TEntity, bool>> predicate)
    {
        var dbSet = await GetDbContextAsync();

        var result = dbSet.Set<TEntity>()
            .Where(predicate)
            .ProjectTo<TEntity>(_mapper.ConfigurationProvider)
            .ToList();
        
        return result;
    }

    public bool? IsChangeTrackingEnabled { get; }
}