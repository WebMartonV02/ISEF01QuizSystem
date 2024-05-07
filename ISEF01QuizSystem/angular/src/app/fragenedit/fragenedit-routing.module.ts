import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrageneditComponent } from './fragenedit.component';

const routes: Routes = [{ path: '', component: FrageneditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrageneditRoutingModule {}
