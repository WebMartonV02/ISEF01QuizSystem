
export interface CommentRequestDto {
  id: number;
  content?: string;
  courseId?: number;
}

export interface CommentResultDto {
  id: number;
  content?: string;
}
