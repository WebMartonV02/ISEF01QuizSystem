namespace ISEF01QuizSystem.Comments;

public class CommentRequestDto
{
    public int Id { get; set; }
    public string Content { get; set; }

    public int? CourseId { get; set; }
}