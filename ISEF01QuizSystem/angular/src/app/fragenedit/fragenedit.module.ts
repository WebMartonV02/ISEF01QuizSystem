import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FrageneditRoutingModule } from './fragenedit-routing.module';
import { FrageneditComponent} from './fragenedit.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [FrageneditComponent],
  imports: [SharedModule, FrageneditRoutingModule, MatBadgeModule],
})
export class FrageneditModule {}
