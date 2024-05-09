import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FragemanagerComponent } from './fragemanager.component';

const routes: Routes = [{ path: '', component: FragemanagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FragemanagerRoutingModule {}
