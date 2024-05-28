import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { GlobalScoreboardResultDto, PersonalScoreboardResultDto, ScoreboardGlobalRequestDto } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ScoreboardService {
  apiName = 'Default';
  

  getCalculatedGlobalScoreboardForQuizByRequestDto = (requestDto: ScoreboardGlobalRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<GlobalScoreboardResultDto>>({
      method: 'GET',
      url: '/api/app/scoreboard/calculated-global-scoreboard-for-quiz',
      params: { courseId: requestDto.courseId, searchPredicate: requestDto.searchPredicate, sorting: requestDto.sorting, skipCount: requestDto.skipCount, maxResultCount: requestDto.maxResultCount },
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
