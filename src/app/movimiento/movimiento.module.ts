import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimientoRoutingModule } from './movimiento-routing.module';
import { MovimientoListComponent } from './movimiento-list/movimiento-list.component';
import { MovimientoComponent } from './movimiento/movimiento.component';
import { MovimientoNewComponent } from './movimiento-new/movimiento-new.component';
import { SharedModule } from '../shared/shared.module';
import { MovimientoClienteComponent } from './movimiento-cliente/movimiento-cliente.component';
import { ClietneMovimientosTableComponent } from './components/cliente-movimientos-table/cliente-movimientos-table.component';


@NgModule({
  declarations: [
    MovimientoListComponent,
    MovimientoComponent,
    MovimientoNewComponent,
    MovimientoClienteComponent,
    ClietneMovimientosTableComponent,
  ],
  imports: [
    CommonModule,
    MovimientoRoutingModule,
    SharedModule
  ]
})
export class MovimientoModule { }
