namespace ISEF01QuizSystem.Questions;

public class QuestionResponseDto
{
    public int Id { get; set; }
    public int QuizId { get; set; }
    public string Content { get; set; }
    public int Order { get; set; }
}