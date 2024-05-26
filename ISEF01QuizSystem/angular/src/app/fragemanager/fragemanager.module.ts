import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FragemanagerRoutingModule } from './fragemanager-routing.module';
import { FragemanagerComponent} from './fragemanager.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [FragemanagerComponent],
  imports: [SharedModule, FragemanagerRoutingModule, MatBadgeModule, MatTableModule, MatPaginatorModule, MatSortModule]
})
export class FragemanagerModule {}
