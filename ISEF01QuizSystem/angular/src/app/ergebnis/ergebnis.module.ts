import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ErgebnisRoutingModule } from './ergebnis-routing.module';
import { ErgebnisComponent} from './ergebnis.component';
import {MatBadgeModule} from '@angular/material/badge';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  declarations: [ErgebnisComponent],
  imports: [SharedModule, ErgebnisRoutingModule, MatBadgeModule, MatIcon]
})
export class ErgebnisModule {}
