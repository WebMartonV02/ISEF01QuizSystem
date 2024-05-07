import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { QuizesRoutingModule } from './quizes-routing.module';
import { QuizesComponent} from './quizes.component';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [QuizesComponent],
  imports: [SharedModule, QuizesRoutingModule, MatBadgeModule],
})
export class QuizesModule {}
