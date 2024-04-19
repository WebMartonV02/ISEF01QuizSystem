using System;
using ISEF01QuizSystem.Quiz;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Identity;

namespace ISEF01QuizSystem.Attempts;

public class AttemptEntity : Entity<int>
{
    public Guid UserId { get; set; }
    public IdentityUser User { get; set; }
    public int QuizId { get; set; }
    public QuizEntity Quiz { get; set; }
    public int Score { get; set; }
}