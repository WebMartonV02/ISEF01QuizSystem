import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent} from './courses.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [CoursesComponent],
  imports: [SharedModule, CoursesRoutingModule, MatBadgeModule],
})
export class CoursesModule {}
