using System.Collections.Generic;
using ISEF01QuizSystem.Answers;
using ISEF01QuizSystem.Comments;
using ISEF01QuizSystem.Options;
using ISEF01QuizSystem.Quiz;
using Volo.Abp.Domain.Entities;

namespace ISEF01QuizSystem.Questions;

public class QuestionEntity : Entity<int>
{
    public int QuizId { get; set; }
    public virtual QuizEntity Quiz { get; set; }
    public string Content { get; set; }
    public int Order { get; set; }
    
    public ICollection<AnswerEntity> Answers { get; set; }
    public ICollection<OptionEntity> Options { get; set; }

    public QuestionEntity(
        int quizId,
        string content,
        int order)
    {
        QuizId = quizId;
        Content = content;
        Order = order;
    }
    
    public void Update(string content)
    {
        Content = content;
    }
    
    public void Update(string content, int order)
    {
        Content = content;
        Order = order;
    }
}