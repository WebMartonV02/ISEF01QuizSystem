import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { KonfigurationRoutingModule } from './konfiguration-routing.module';
import { KonfigurationComponent} from './konfiguration.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [KonfigurationComponent],
  imports: [SharedModule, KonfigurationRoutingModule, MatBadgeModule],
})
export class KonfigurationModule {}
