import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BenutzerhandbuchRoutingModule } from './benutzerhandbuch-routing.module';
import { BenutzerhandbuchComponent } from './benutzerhandbuch.component';

@NgModule({
  declarations: [BenutzerhandbuchComponent],
  imports: [SharedModule, BenutzerhandbuchRoutingModule],
})
export class BenutzerhandbuchModule {}
