import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentaRoutingModule } from './cuenta-routing.module';
import { CuentaNewComponent } from './cuenta-new/cuenta-new.component';
import { CuentaListComponent } from './cuenta-list/cuenta-list.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { SharedModule } from '../shared/shared.module';
import { CuentaTableComponent } from './components/cuenta-table/cuenta-table.component';


@NgModule({
  declarations: [
    CuentaNewComponent,
    CuentaListComponent,
    CuentaComponent,
    CuentaTableComponent
  ],
  imports: [
    CommonModule,
    CuentaRoutingModule,
    SharedModule
  ]
})
export class CuentaModule { }
