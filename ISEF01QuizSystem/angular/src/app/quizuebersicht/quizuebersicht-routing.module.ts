import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizuebersichtComponent } from './quizuebersicht.component';

const routes: Routes = [{ path: '', component: QuizuebersichtComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizuebersichtRoutingModule {}
