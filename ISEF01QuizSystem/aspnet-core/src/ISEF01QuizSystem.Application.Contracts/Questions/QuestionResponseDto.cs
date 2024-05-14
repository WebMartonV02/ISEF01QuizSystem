using System.Collections.Generic;
using ISEF01QuizSystem.Options;

namespace ISEF01QuizSystem.Questions;

public class QuestionResponseDto
{
    public int Id { get; set; }
    public int QuizId { get; set; }
    public string Content { get; set; }
    public int Order { get; set; }
    public List<OptionResponseDto> Options { get; set; }
}