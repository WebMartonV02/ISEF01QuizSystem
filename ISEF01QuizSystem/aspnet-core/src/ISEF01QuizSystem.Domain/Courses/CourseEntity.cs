using System.Collections.Generic;
using ISEF01QuizSystem.Comments;
using ISEF01QuizSystem.Quiz;
using Volo.Abp.Domain.Entities;

namespace ISEF01QuizSystem.Courses;

public class CourseEntity : Entity<int>
{
    public string Title { get; set; }
    public string Description { get; set; }
    
    public virtual ICollection<QuizEntity> Quizes { get; set; }

    public ICollection<CommentEntity> Comments { get; set; }
}