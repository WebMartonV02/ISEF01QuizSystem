import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StartRoutingModule } from './start-routing.module';
import { StartComponent} from './start.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [StartComponent],
  imports: [SharedModule, StartRoutingModule, MatBadgeModule],
})
export class StartModule {}
