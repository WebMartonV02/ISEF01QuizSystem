using ISEF01QuizSystem.Questions;
using Volo.Abp.Domain.Entities;

namespace ISEF01QuizSystem.Options;

public class OptionEntity : Entity<int>
{
    public int QuestionId { get; set; }
    public QuestionEntity Question { get; set; }
    public string Text { get; set; }
    public bool IsCorrect { get; set; }
}