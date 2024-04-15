using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;

namespace ISEF01QuizSystem.Common;

public static class SortingHelper
{
    public static IQueryable<TEntity> ApplySorting<TEntity>(
        this IQueryable<TEntity> queryableItems,
        string customSorting,
        SortingModel<TEntity> defaultSorting)
    {
        if (customSorting.IsNullOrEmpty() && defaultSorting != default)
        {
            customSorting ??=
                GetPropertyName(defaultSorting.SortedByProperty)
                + (defaultSorting.IsDescending ? SortingDirectionConstants.Descending : string.Empty);
        }
        if (!customSorting.IsNullOrEmpty()) { queryableItems = queryableItems.OrderBy(customSorting); }

        return queryableItems;
    }

    private static string GetPropertyName<TType>(Expression<Func<TType, object>> property)
    {
        LambdaExpression lambda = property;
        var memberExpression = lambda.Body is UnaryExpression expression
            ? (MemberExpression)expression.Operand
            : (MemberExpression)lambda.Body;

        return memberExpression.Member.Name;
    }
}