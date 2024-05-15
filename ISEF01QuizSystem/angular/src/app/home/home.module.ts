import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {MatBadgeModule} from '@angular/material/badge';
import { CoursesComponent } from '../courses/courses.component';

@NgModule({
  declarations: [HomeComponent, CoursesComponent],
  imports: [SharedModule, HomeRoutingModule, MatBadgeModule],
})
export class HomeModule {}
