using System.Collections.Generic;
using ISEF01QuizSystem.Options;

namespace ISEF01QuizSystem.Questions;

public class QuestionRequestDto
{
    public int Id { get; set; }
    public string Content { get; set; }
    public List<OptionRequestDto> Answers { get; set; }
}