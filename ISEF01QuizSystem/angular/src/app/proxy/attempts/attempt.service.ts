import type { AttemptRequestDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AttemptService {
  apiName = 'Default';
  

  createAttemptByRequestDto = (requestDto: AttemptRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/attempt/attempt',
      body: requestDto,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
