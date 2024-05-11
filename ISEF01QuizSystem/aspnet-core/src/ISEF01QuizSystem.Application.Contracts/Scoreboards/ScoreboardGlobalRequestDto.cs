using ISEF01QuizSystem.Common;

namespace ISEF01QuizSystem;

public class ScoreboardGlobalRequestDto : FilteredResultRequestDto
{
    public int CourseId { get; set; }
}