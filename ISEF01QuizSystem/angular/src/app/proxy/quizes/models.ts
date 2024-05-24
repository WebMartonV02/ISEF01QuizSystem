import type { FilteredResultRequestDto } from '../common/models';

export interface QuizRequestDto extends FilteredResultRequestDto {
  id: number;
  titel?: string;
  description?: string;
  courseId: number;
}

export interface QuizResponseDto {
  id: number;
  titel?: string;
  description?: string;
}
