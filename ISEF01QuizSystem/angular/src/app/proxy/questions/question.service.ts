import type { QuestionRequestDto, QuestionResponseDto, QuestionsForQuizRequestDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  apiName = 'Default';
  

  create = (requestDto: QuestionRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/question',
      body: requestDto,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/question/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuestionResponseDto>({
      method: 'GET',
      url: `/api/app/question/${id}/by-id`,
    },
    { apiName: this.apiName,...config });
  

  getByQuizIdWithAnswers = (requestDto: QuestionsForQuizRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuestionResponseDto>({
      method: 'GET',
      url: '/api/app/question/by-quiz-id-with-answers',
      params: { quizId: requestDto.quizId, previousQuestionId: requestDto.previousQuestionId, searchPredicate: requestDto.searchPredicate, sorting: requestDto.sorting, skipCount: requestDto.skipCount, maxResultCount: requestDto.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListByQuizIdOrdered = (requestDto: QuestionsForQuizRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuestionResponseDto[]>({
      method: 'GET',
      url: '/api/app/question/by-quiz-id-ordered',
      params: { quizId: requestDto.quizId, previousQuestionId: requestDto.previousQuestionId, searchPredicate: requestDto.searchPredicate, sorting: requestDto.sorting, skipCount: requestDto.skipCount, maxResultCount: requestDto.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (requestDto: QuestionRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/app/question',
      body: requestDto,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
