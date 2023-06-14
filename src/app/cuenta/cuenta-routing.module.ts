import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaListComponent } from './cuenta-list/cuenta-list.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { CuentaNewComponent } from './cuenta-new/cuenta-new.component';

const routes: Routes = [
  {
    path:'',
    component: CuentaListComponent
  },{
    path:'cuenta/:id',
    component: CuentaComponent
  },{
    path:'newcuenta',
    component: CuentaNewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaRoutingModule { }
