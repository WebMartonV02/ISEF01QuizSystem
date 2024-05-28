import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FragemanagerRoutingModule } from './fragemanager-routing.module';
import { FragemanagerComponent} from './fragemanager.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FragemanagerComponent],
  imports: [SharedModule, FragemanagerRoutingModule, MatBadgeModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule]
})
export class FragemanagerModule {}
