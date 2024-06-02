import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BenutzerhandbuchComponent } from './benutzerhandbuch.component';

const routes: Routes = [{ path: '', component: BenutzerhandbuchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BenutzerhandbuchRoutingModule {}
