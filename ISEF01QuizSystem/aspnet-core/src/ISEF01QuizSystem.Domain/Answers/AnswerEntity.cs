using System;
using ISEF01QuizSystem.Options;
using ISEF01QuizSystem.Questions;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Identity;

namespace ISEF01QuizSystem.Answers;

public class AnswerEntity : Entity<int>
{
    public int OptionId { get; set; }
    public OptionEntity Option { get; set; }
    public int QuestionId { get; set; }
    public QuestionEntity Question { get; set; }
    public Guid UserId { get; set; }
    public IdentityUser User { get; set; }

    public AnswerEntity(int optionId, int questionId, Guid userId)
    {
        OptionId = optionId;
        QuestionId = questionId;
        UserId = userId;
    }
}