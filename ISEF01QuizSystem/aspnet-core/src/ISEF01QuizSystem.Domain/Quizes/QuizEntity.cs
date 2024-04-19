using System;
using System.Collections.Generic;
using ISEF01QuizSystem.Attempts;
using ISEF01QuizSystem.Courses;
using ISEF01QuizSystem.Questions;
using Volo.Abp.Domain.Entities;

namespace ISEF01QuizSystem.Quiz;

public class QuizEntity : Entity<int>
{
    public string Title { get; set; }
    public string Description { get; set; }
    public int CourseId { get; set; }
    public CourseEntity Course { get; set; } 
    
    public virtual ICollection<QuestionEntity> Questions { get; set; }
    public virtual ICollection<AttemptEntity> Attempts { get; set; }

    public void Update(string title, string description)
    {
        Title = title;
        Description = description;
    }
}