namespace ISEF01QuizSystem.Comments;

public class CommentRequestDto
{
    public int Id { get; set; }
    public string Text { get; set; }

    public int? QuestionId { get; set; }
}