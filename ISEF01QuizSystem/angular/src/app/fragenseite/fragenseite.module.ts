import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FragenseiteRoutingModule } from './fragenseite-routing.module';
import { FragenseiteComponent} from './fragenseite.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [FragenseiteComponent],
  imports: [SharedModule, FragenseiteRoutingModule, MatBadgeModule],
})
export class FragenseiteModule {}
