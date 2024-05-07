import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ScoreboardRoutingModule } from './scoreboard-routing.module';
import { ScoreboardComponent} from './scoreboard.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [ScoreboardComponent],
  imports: [SharedModule, ScoreboardRoutingModule, MatBadgeModule],
})
export class ScoreboardModule {}
