using ISEF01QuizSystem.Common;

namespace ISEF01QuizSystem.Questions;

public class QuestionsForQuizRequestDto : FilteredResultRequestDto
{
    public int QuizId { get; set; }
    
    public int PreviousQuestionId { get; set; }
}