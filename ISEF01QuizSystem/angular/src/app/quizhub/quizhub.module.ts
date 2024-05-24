import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { QuizhubRoutingModule } from './quizhub-routing.module';
import { QuizhubComponent} from './quizhub.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [QuizhubComponent],
  imports: [SharedModule, QuizhubRoutingModule, MatBadgeModule],
})
export class QuizhubModule {}
