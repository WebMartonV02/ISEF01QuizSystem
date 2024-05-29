using ISEF01QuizSystem.Common;

namespace ISEF01QuizSystem.Questions;

public class QuestionCatalogRequestDto : FilteredResultRequestDto
{
    public int? QuizId { get; set; }
}