using System.Collections.Generic;
using ISEF01QuizSystem.Options;

namespace ISEF01QuizSystem.Questions;

public class QuestionRequestDto
{
    public int QuestionId { get; set; }
    public int QuizId { get; set; }
    public string Content { get; set; }
    public List<OptionRequestDto> Options { get; set; }
}