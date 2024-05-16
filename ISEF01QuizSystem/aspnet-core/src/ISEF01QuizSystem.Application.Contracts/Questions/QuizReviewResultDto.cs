using System.Collections.Generic;
using ISEF01QuizSystem.Options;

namespace ISEF01QuizSystem.Questions;

public class QuizReviewResultDto
{
    public string QuestionText { get; set; }
    public List<OptionResponseDto> Options { get; set; }
    public int AnsweredOptionId { get; set; }
}