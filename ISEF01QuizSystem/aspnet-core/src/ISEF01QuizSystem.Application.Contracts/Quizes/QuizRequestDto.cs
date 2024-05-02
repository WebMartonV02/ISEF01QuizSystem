using ISEF01QuizSystem.Common;

namespace ISEF01QuizSystem.Quizes;

public class QuizRequestDto : FilteredResultRequestDto
{
    public int Id { get; set; }
    public string Titel { get; set; }
    public string Description { get; set; }
    public int CourseId { get; set; }
}