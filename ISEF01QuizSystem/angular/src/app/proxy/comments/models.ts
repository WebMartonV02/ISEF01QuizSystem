
export interface CommentRequestDto {
  id: number;
  content?: string;
  courseId?: number;
  userId?: string;
}

export interface CommentResultDto {
  id: number;
  content?: string;
  userId?: string;
  userName?: string;
}
