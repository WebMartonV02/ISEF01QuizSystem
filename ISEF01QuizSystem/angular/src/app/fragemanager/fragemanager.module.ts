import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FragemanagerRoutingModule } from './fragemanager-routing.module';
import { FragemanagerComponent} from './fragemanager.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [FragemanagerComponent],
  imports: [SharedModule, FragemanagerRoutingModule, MatBadgeModule],
})
export class FragemanagerModule {}
