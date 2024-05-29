import type { FilteredResultRequestDto } from '../common/models';
import type { OptionRequestDto, OptionResponseDto } from '../options/models';

export interface QuestionCatalogRequestDto extends FilteredResultRequestDto {
  quizId?: number;
}

export interface QuestionRequestDto {
  questionId: number;
  quizId: number;
  content?: string;
  options: OptionRequestDto[];
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
