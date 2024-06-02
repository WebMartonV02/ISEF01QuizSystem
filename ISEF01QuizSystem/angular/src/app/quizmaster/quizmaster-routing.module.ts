import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizmasterComponent } from './quizmaster.component';

const routes: Routes = [{ path: '', component: QuizmasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizmasterRoutingModule {}
