
export interface CommentRequestDto {
  id: number;
  text?: string;
  quizId?: number;
}

export interface CommentResultDto {
  id: number;
  text?: string;
}
