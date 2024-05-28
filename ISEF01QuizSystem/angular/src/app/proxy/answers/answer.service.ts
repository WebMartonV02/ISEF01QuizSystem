import type { AnswerRequestDto, AnswerResponseDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  apiName = 'Default';
  

  createAnswer = (requestDto: AnswerRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/answer/answer',
      body: requestDto,
    },
    { apiName: this.apiName,...config });
  

  getAnswersForQuizByUserIdByQuestionIds = (questionIds: number[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, AnswerResponseDto[]>({
      method: 'GET',
      url: '/api/app/answer/answers-for-quiz-by-user-id',
      params: { questionIds },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
