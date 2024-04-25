import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, HomeRoutingModule, MatBadgeModule],
})
export class HomeModule {}
