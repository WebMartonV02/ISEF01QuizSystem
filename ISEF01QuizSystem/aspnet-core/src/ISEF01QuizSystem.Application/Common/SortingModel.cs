using System;
using System.Linq.Expressions;

namespace ISEF01QuizSystem.Common;

public class SortingModel<TEntity>
{
    public Expression<Func<TEntity, object>> SortedByProperty { get; private set; }
    public bool IsDescending { get; private set; }

    public SortingModel(
        Expression<Func<TEntity, object>> _sortedByProperty,
        bool _isDescending = false)
    {
        SortedByProperty = _sortedByProperty;
        IsDescending = _isDescending;
    }
}