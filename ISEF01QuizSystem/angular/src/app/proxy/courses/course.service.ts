import type { CourseRequestDto, CourseResponseDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  apiName = 'Default';
  

  create = (requestDto: CourseRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/course',
      body: requestDto,
    },
    { apiName: this.apiName,...config });
  

  delete = (courseId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/course',
      params: { courseId },
    },
    { apiName: this.apiName,...config });
  

  getAll = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, CourseResponseDto[]>({
      method: 'GET',
      url: '/api/app/course',
    },
    { apiName: this.apiName,...config });
  

  getById = (courseId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CourseResponseDto>({
      method: 'GET',
      url: `/api/app/course/by-id/${courseId}`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
