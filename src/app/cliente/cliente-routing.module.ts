import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteNewComponent } from './cliente-new/cliente-new.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    component: ClienteListComponent
  },{
    path:'cliente/:id',
    component: ClienteComponent,
    canActivate:[AuthGuard],
  },{
    path:'newcliente',
    component: ClienteNewComponent,
    canActivate:[AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
