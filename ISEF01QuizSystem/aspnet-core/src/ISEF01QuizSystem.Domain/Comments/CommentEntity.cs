using System;
using ISEF01QuizSystem.Questions;
using ISEF01QuizSystem.Quiz;
using Volo.Abp.Domain.Entities;

namespace ISEF01QuizSystem.Comments;

public class CommentEntity : Entity<int>
{
    public string Content { get; set; }
    public Guid UserId { get; set; }
    public int Order { get; set; }
    public int QuizId { get; set; }
    public QuizEntity Quiz { get; set; }

    public void IncrementAndSetOrder(int order)
    {
        Order = ++order;
    }

    public void Update(string content)
    {
        Content = content;
    }
}