import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ScoreboardRoutingModule } from './scoreboard-routing.module';
import { ScoreboardComponent} from './scoreboard.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [ScoreboardComponent],
  imports: [SharedModule, ScoreboardRoutingModule, MatBadgeModule, MatTableModule, MatPaginatorModule, MatSortModule],
})
export class ScoreboardModule {}
