using Volo.Abp.Application.Dtos;

namespace ISEF01QuizSystem.Common;

public class FilteredResultRequestDto : PagedAndSortedResultRequestDto
{
    public string? SearchPredicate { get; set; }
}