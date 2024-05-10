import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KonfigurationComponent } from './konfiguration.component';

const routes: Routes = [{ path: '', component: KonfigurationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KonfigurationRoutingModule {}
