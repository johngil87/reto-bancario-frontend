import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovimientoListComponent } from './movimiento-list/movimiento-list.component';
import { MovimientoComponent } from './movimiento/movimiento.component';
import { MovimientoNewComponent } from './movimiento-new/movimiento-new.component';
import { MovimientoClienteComponent } from './movimiento-cliente/movimiento-cliente.component';

const routes: Routes = [{
  path:'',
  component: MovimientoListComponent
},{
  path:'move/:id',
  component: MovimientoComponent
},{
  path:'newmove',
  component: MovimientoNewComponent
},{
  path:'listbyclient',
  component: MovimientoClienteComponent
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientoRoutingModule { }
