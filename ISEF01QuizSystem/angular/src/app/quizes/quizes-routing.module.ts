import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizesComponent } from './quizes.component';

const routes: Routes = [{ path: '', component: QuizesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizesRoutingModule {}
