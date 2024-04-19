using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Linq;
using Volo.Abp.ObjectMapping;

namespace ISEF01QuizSystem.Common;

public static class DataManagementHelper
{
    public static async Task<PagedResultDto<TResultDto>> GetModifiedDataListWithResultCount<TEntity, TResultDto>(
        this IQueryable<TEntity> queryableItems,
        FilteredResultRequestDto request,
        IAsyncQueryableExecuter asyncQueryableExecuter,
        IObjectMapper objectMapper,
        SortingModel<TEntity> defaultSorting = default)
    {
        PagedResultDto<TResultDto> modifiedDataList;

        queryableItems = queryableItems.ApplySearchFilter(request.SearchPredicate);

        var totalCount = queryableItems.Count();

        queryableItems = queryableItems.ApplySorting(request.Sorting, defaultSorting);

        queryableItems = queryableItems
            .Skip(request.SkipCount)
            .Take(request.MaxResultCount);

        var queryResult = await asyncQueryableExecuter.ToListAsync(queryableItems);
        var resultDto = objectMapper.Map<List<TEntity>, List<TResultDto>>(queryResult);

        modifiedDataList = new PagedResultDto<TResultDto>(
            totalCount,
            resultDto);

        return modifiedDataList;
    }
    
    public static async Task<List<TResultDto>> GetModifiedDataList<TEntity, TResultDto>(
        this IQueryable<TEntity> queryableItems,
        FilteredResultRequestDto request,
        IAsyncQueryableExecuter asyncQueryableExecuter,
        IObjectMapper objectMapper,
        SortingModel<TEntity> defaultSorting = default)
    {
        PagedResultDto<TResultDto> modifiedDataList;

        queryableItems = queryableItems.ApplySearchFilter(request.SearchPredicate);


        queryableItems = queryableItems.ApplySorting(request.Sorting, defaultSorting);

        queryableItems = queryableItems
            .Skip(request.SkipCount)
            .Take(request.MaxResultCount);

        var queryResult = await asyncQueryableExecuter.ToListAsync(queryableItems);
        var resultDto = objectMapper.Map<List<TEntity>, List<TResultDto>>(queryResult);

        return resultDto;
    }
}