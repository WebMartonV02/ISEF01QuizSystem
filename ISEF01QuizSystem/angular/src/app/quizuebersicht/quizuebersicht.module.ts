import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { QuizuebersichtRoutingModule } from './quizuebersicht-routing.module';
import { QuizuebersichtComponent} from './quizuebersicht.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [QuizuebersichtComponent],
  imports: [SharedModule, QuizuebersichtRoutingModule, MatBadgeModule],
})
export class QuizuebersichtModule {}
