
export interface CommentRequestDto {
  id: number;
  text?: string;
  courseId?: number;
}

export interface CommentResultDto {
  id: number;
  text?: string;
}
