import type { FilteredResultRequestDto } from './common/models';

export interface GlobalScoreboardResultDto {
  userName?: string;
  scorePoint: number;
}

export interface PersonalScoreboardResultDto {
  quizName?: string;
  scorePoints: number;
}

export interface ScoreboardGlobalRequestDto extends FilteredResultRequestDto {
  courseId: number;
}
