import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent} from './login.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, LoginRoutingModule, MatBadgeModule],
})
export class LoginModule {}
