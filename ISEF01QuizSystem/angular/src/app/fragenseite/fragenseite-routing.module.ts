import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FragenseiteComponent } from './fragenseite.component';

const routes: Routes = [{ path: '', component: FragenseiteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FragenseiteRoutingModule {}
