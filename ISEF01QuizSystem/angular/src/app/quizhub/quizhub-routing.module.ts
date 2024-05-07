import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizhubComponent } from './quizhub.component';

const routes: Routes = [{ path: '', component: QuizhubComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizhubRoutingModule {}
