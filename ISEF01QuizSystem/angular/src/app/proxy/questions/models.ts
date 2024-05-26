import type { FilteredResultRequestDto } from '../common/models';
import type { OptionRequestDto, OptionResponseDto } from '../options/models';

export interface QuestionCatalogRequestDto extends FilteredResultRequestDto {
  quizId?: number;
}

export interface QuestionRequestDto {
  id: number;
  content?: string;
  answers: OptionRequestDto[];
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
