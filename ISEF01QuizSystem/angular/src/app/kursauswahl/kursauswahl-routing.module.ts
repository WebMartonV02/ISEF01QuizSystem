import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KursauswahlComponent } from './kursauswahl.component';

const routes: Routes = [{ path: '', component: KursauswahlComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KursauswahlRoutingModule {}
