import type { QuizRequestDto, QuizResponseDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { FilteredResultRequestDto } from '../common/models';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  apiName = 'Default';
  

  create = (requestDto: QuizRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuizResponseDto>({
      method: 'POST',
      url: '/api/app/quiz',
      body: requestDto,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/quiz/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuizResponseDto>({
      method: 'GET',
      url: `/api/app/quiz/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getByCourseIdOrdered = (courseId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuizResponseDto[]>({
      method: 'GET',
      url: `/api/app/quiz/by-course-id-ordered/${courseId}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (requestDto: FilteredResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuizResponseDto[]>({
      method: 'GET',
      url: '/api/app/quiz',
      params: { searchPredicate: requestDto.searchPredicate, sorting: requestDto.sorting, skipCount: requestDto.skipCount, maxResultCount: requestDto.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListWithOutOrdering = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuizResponseDto[]>({
      method: 'GET',
      url: '/api/app/quiz/with-out-ordering',
    },
    { apiName: this.apiName,...config });
  

  update = (requestDto: QuizRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, QuizResponseDto>({
      method: 'PUT',
      url: '/api/app/quiz',
      body: requestDto,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
