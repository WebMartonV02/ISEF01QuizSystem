using ISEF01QuizSystem.Quiz;
using Volo.Abp.Domain.Entities;

namespace ISEF01QuizSystem.Questions;

public class QuestionEntity : Entity<int>
{
    public int QuizId { get; set; }
    public virtual QuizEntity Quiz { get; set; }
    public string Content { get; set; }
    public int Order { get; set; }

    public void Update(string content, int order)
    {
        Content = content;
        Order = order;
    }
}