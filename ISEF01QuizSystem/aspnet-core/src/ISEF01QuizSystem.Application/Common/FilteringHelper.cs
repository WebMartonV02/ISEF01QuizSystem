using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace ISEF01QuizSystem.Common;

public static class FilteringHelper
{
    public static IQueryable<TEntity> ApplySearchFilter<TEntity>(this IQueryable<TEntity> queryableItems, string searchValue)
    {
        if (searchValue == null) return queryableItems;

        var fullAvailablePropertyList = typeof(TEntity).GetProperties();
        var queryableProperties = GetQueryablePropertyList(fullAvailablePropertyList);

        var propertyExpressions = GetExpressions<TEntity>(queryableProperties, searchValue);
        var combinedExpressions = GetCombinedExpressionsWithOr(propertyExpressions);

        queryableItems = queryableItems.Where(combinedExpressions);

        return queryableItems;
    }

    private static IEnumerable<PropertyInfo> GetQueryablePropertyList(IEnumerable<PropertyInfo> fullAvailablePropertyList)
    {
        IEnumerable<PropertyInfo> queryablePropertyList;
        queryablePropertyList = fullAvailablePropertyList
                .Where(x =>
                    x.PropertyType == typeof(string)
                    || x.PropertyType == typeof(short)
                    || x.PropertyType == typeof(short?)
                    || x.PropertyType == typeof(int)
                    || x.PropertyType == typeof(int?)
                    || x.PropertyType == typeof(long)
                    || x.PropertyType == typeof(long?)
                    || x.PropertyType == typeof(float)
                    || x.PropertyType == typeof(float?)
                    || x.PropertyType == typeof(double)
                    || x.PropertyType == typeof(double?)
                    || x.PropertyType == typeof(decimal)
                    || x.PropertyType == typeof(decimal?)
                    || x.PropertyType == typeof(bool)
                    || x.PropertyType == typeof(bool?)
                );

        return queryablePropertyList;
    }

    private static Expression<Func<TEntity, bool>> GetExpression<TEntity>(string propertyName, string propertyValue)
    {
        ParameterExpression parameterExpression;
        MethodCallExpression containsMethodExpression;

        parameterExpression = Expression.Parameter(typeof(TEntity), "type");
        var propertyExpression = (Expression)Expression.Property(parameterExpression, propertyName);
        MethodInfo containsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });
        var someValue = Expression.Constant(propertyValue, typeof(string));

        // INFO: in case of string the .ToString() won't work, because the LINQ not able map it and give an error
        if (propertyExpression.Type != typeof(string))
        {
            MethodInfo toStringMethod = propertyExpression.Type.GetMethod("ToString", Type.EmptyTypes);
            propertyExpression = Expression.Call(propertyExpression, toStringMethod);
        }

        containsMethodExpression = Expression.Call(propertyExpression, containsMethod, someValue);

        return Expression.Lambda<Func<TEntity, bool>>(containsMethodExpression, parameterExpression);
    }

    private static IList<Expression<Func<TEntity, bool>>> GetExpressions<TEntity>(IEnumerable<PropertyInfo> queryableProperties, string searchValue)
    {
        IList<Expression<Func<TEntity, bool>>> propertyExpressions = new List<Expression<Func<TEntity, bool>>>();
        foreach (var queryableProperty in queryableProperties)
        {
            var propertyExpression = GetExpression<TEntity>(queryableProperty.Name, searchValue);
            propertyExpressions.Add(propertyExpression);
        }

        return propertyExpressions;
    }

    private static ExpressionStarter<TEntity> GetCombinedExpressionsWithOr<TEntity>(IList<Expression<Func<TEntity, bool>>> propertyExpressions)
    {
        var combinedExpressions = PredicateBuilder.New<TEntity>(false);
        foreach (var propertyExpression in propertyExpressions)
        {
            combinedExpressions = combinedExpressions.Or(propertyExpression);
        }

        return combinedExpressions;
    }
}
