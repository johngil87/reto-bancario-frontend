import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovimientoListComponent } from './movimiento-list/movimiento-list.component';
import { MovimientoComponent } from './movimiento/movimiento.component';
import { MovimientoNewComponent } from './movimiento-new/movimiento-new.component';
import { MovimientoClienteComponent } from './movimiento-cliente/movimiento-cliente.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [{
  path:'',
  component: MovimientoListComponent
},{
  path:'move/:id',
  component: MovimientoComponent,
  canActivate:[AuthGuard],
},{
  path:'newmove',
  component: MovimientoNewComponent,
  canActivate:[AuthGuard],
},{
  path:'listbyclient',
  component: MovimientoClienteComponent,
  canActivate:[AuthGuard],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientoRoutingModule { }
