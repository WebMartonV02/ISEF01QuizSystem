import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { KursauswahlRoutingModule } from './kursauswahl-routing.module';
import { KursauswahlComponent} from './kursauswahl.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [KursauswahlComponent],
  imports: [SharedModule, KursauswahlRoutingModule, MatBadgeModule],
})
export class KursauswahlModule {}
