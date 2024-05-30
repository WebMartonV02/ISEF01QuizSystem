import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { QuizhubRoutingModule } from './quizhub-routing.module';
import { QuizhubComponent} from './quizhub.component';
import {MatBadgeModule} from '@angular/material/badge';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [QuizhubComponent],
  imports: [SharedModule, QuizhubRoutingModule, MatBadgeModule, NgbDropdownModule, MatSelectModule, FormsModule, MatInputModule, MatFormFieldModule, 
    MatCardModule, MatButtonModule, MatIconModule, MatMenuModule
  ],
})
export class QuizhubModule {}
