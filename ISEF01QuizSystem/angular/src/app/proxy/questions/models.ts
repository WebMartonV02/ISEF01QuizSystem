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
  isLastQuestion: boolean;
}

export interface QuestionsForQuizRequestDto extends FilteredResultRequestDto {
  quizId: number;
  previousQuestionOrderNumber?: number;
}
