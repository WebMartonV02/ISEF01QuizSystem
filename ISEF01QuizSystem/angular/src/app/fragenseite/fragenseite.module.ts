import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FragenseiteRoutingModule } from './fragenseite-routing.module';
import { FragenseiteComponent} from './fragenseite.component';

@NgModule({
  declarations: [FragenseiteComponent],
  imports: [SharedModule, FragenseiteRoutingModule],
})
export class FragenseiteModule {}
