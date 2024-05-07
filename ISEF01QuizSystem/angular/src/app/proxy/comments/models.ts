
export interface CommentRequestDto {
  id: number;
  text?: string;
  questionId?: number;
}

export interface CommentResultDto {
  id: number;
  text?: string;
}
