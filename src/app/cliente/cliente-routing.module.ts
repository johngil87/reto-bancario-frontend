import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteNewComponent } from './cliente-new/cliente-new.component';

const routes: Routes = [
  {
    path:'',
    component: ClienteListComponent
  },{
    path:'cliente/:id',
    component: ClienteComponent
  },{
    path:'newcliente',
    component: ClienteNewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
