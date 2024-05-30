using System;

namespace ISEF01QuizSystem.Comments;

public class CommentResultDto
{
    public int Id { get; set; }
    public string Content { get; set; }

    public Guid UserId { get; set; }

    public string UserName { get; set; }
}