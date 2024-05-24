import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { QuizesRoutingModule } from './quizes-routing.module';
import { QuizesComponent} from './quizes.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [QuizesComponent],
  imports: [SharedModule, QuizesRoutingModule, MatBadgeModule, MatIconModule],
})
export class QuizesModule {}
