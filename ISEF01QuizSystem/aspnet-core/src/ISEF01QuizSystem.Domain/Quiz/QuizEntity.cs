using Volo.Abp.Domain.Entities;

namespace ISEF01QuizSystem.Quiz;

public class QuizEntity : Entity<int>
{
    public string Title { get; set; }
    public string Description { get; set; }

    public void Update(string title, string description)
    {
        Title = title;
        Description = description;
    }
}