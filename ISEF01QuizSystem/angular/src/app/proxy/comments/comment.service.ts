import type { CommentRequestDto, CommentResultDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  apiName = 'Default';
  

  createCommentForCourseByRequestDto = (requestDto: CommentRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/comment/comment-for-course',
      body: requestDto,
    },
    { apiName: this.apiName,...config });
  

  deleteCommentByCommentId = (commentId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/comment/comment/${commentId}`,
    },
    { apiName: this.apiName,...config });
  

  editCommentForQuestionByRequestDto = (requestDto: CommentRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/comment/edit-comment-for-question',
      body: requestDto,
    },
    { apiName: this.apiName,...config });
  

  getCommentsOrderedForCourseByCourseId = (courseId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CommentResultDto[]>({
      method: 'GET',
      url: `/api/app/comment/comments-ordered-for-course/${courseId}`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
