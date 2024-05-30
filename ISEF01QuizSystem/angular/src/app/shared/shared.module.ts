import { CoreModule } from '@abp/ng.core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { SearchFilterComponent } from './filtering/search-filter.component';
import { MatButtonModule } from '@angular/material/button';
import { CdkContextMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { ThemeBasicModule } from '@abp/ng.theme.basic';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  declarations: [SearchFilterComponent],
  imports: [
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    CdkContextMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    MatIcon
  ],
  exports: [
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    SearchFilterComponent,
    MatButtonModule,
    CdkContextMenuTrigger,
    CdkMenu,
    CdkMenuItem,
  ],
  providers: []
})
export class SharedModule {}
