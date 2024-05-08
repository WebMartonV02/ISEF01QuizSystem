using System;
using ISEF01QuizSystem.Common;

namespace ISEF01QuizSystem;

public class ScoreboardIndividualRequestDto : FilteredResultRequestDto
{
    public Guid UserId { get; set; }
}