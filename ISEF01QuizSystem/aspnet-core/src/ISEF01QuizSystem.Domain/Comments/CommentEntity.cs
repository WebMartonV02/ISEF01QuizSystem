using ISEF01QuizSystem.Questions;
using Volo.Abp.Domain.Entities;

namespace ISEF01QuizSystem.Comments;

public class CommentEntity : Entity<int>
{
    public string Content { get; set; }
    public int Order { get; set; }
    public int QuestionId { get; set; }
    public QuestionEntity Question { get; set; }
}