import type { OptionResponseDto } from '../options/models';
import type { FilteredResultRequestDto } from '../common/models';

export interface QuestionRequestDto {
  id: number;
  quizId: number;
  content?: string;
  order: number;
}

export interface QuestionResponseDto {
  id: number;
  quizId: number;
  content?: string;
  order: number;
  options: OptionResponseDto[];
}

export interface QuestionsForQuizRequestDto extends FilteredResultRequestDto {
  quizId: number;
  previousQuestionId: number;
}
