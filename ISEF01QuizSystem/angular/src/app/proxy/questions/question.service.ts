import type { QuestionCatalogRequestDto, QuestionRequestDto, QuestionResponseDto, QuestionsForQuizRequestDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  apiName = 'Default';
  

  createOrUpdate = (requestDto: QuestionRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/question/or-update',
      body: requestDto,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/question/${id}`,
    },
    { apiName: this.apiName,...config });
  

  deleteOptionById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/question/${id}/option`,
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
      params: { quizId: requestDto.quizId, previousQuestionOrderNumber: requestDto.previousQuestionOrderNumber, searchPredicate: requestDto.searchPredicate, sorting: requestDto.sorting, skipCount: requestDto.skipCount, maxResultCount: requestDto.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListByQuiz = (requestDto: QuestionCatalogRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<QuestionResponseDto>>({
      method: 'GET',
      url: '/api/app/question/by-quiz',
      params: { quizId: requestDto.quizId, searchPredicate: requestDto.searchPredicate, sorting: requestDto.sorting, skipCount: requestDto.skipCount, maxResultCount: requestDto.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListByQuizId = (quizId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuestionResponseDto[]>({
      method: 'GET',
      url: `/api/app/question/by-quiz-id/${quizId}`,
    },
    { apiName: this.apiName,...config });
  

  getListByQuizIdOrdered = (requestDto: QuestionsForQuizRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuestionResponseDto[]>({
      method: 'GET',
      url: '/api/app/question/by-quiz-id-ordered',
      params: { quizId: requestDto.quizId, previousQuestionOrderNumber: requestDto.previousQuestionOrderNumber, searchPredicate: requestDto.searchPredicate, sorting: requestDto.sorting, skipCount: requestDto.skipCount, maxResultCount: requestDto.maxResultCount },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
