import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { QuizmasterRoutingModule } from './quizmaster-routing.module';
import { QuizmasterComponent} from './quizmaster.component';
import {MatBadgeModule} from '@angular/material/badge';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [QuizmasterComponent],
  imports: [SharedModule, QuizmasterRoutingModule, MatBadgeModule, NgbDropdownModule, MatSelectModule, FormsModule, MatInputModule, MatFormFieldModule ],
})
export class QuizmasterModule {}
