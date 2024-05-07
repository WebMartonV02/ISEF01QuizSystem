import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErgebnisComponent } from './ergebnis.component';

const routes: Routes = [{ path: '', component: ErgebnisComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErgebnisRoutingModule {}
