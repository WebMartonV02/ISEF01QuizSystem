import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { GlobalScoreboardResultDto, PersonalScoreboardResultDto } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ScoreboardService {
  apiName = 'Default';
  

  getCalculatedGlobalScoreboardForQuizByCourseId = (courseId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GlobalScoreboardResultDto[]>({
      method: 'GET',
      url: `/api/app/scoreboard/calculated-global-scoreboard-for-quiz/${courseId}`,
    },
    { apiName: this.apiName,...config });
  

  getCalculatedPersonalScoreboardByUserId = (userId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PersonalScoreboardResultDto[]>({
      method: 'GET',
      url: `/api/app/scoreboard/calculated-personal-scoreboard/${userId}`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
