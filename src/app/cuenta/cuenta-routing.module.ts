import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaListComponent } from './cuenta-list/cuenta-list.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { CuentaNewComponent } from './cuenta-new/cuenta-new.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    component: CuentaListComponent
  },{
    path:'cuenta/:id',
    component: CuentaComponent,
    canActivate:[AuthGuard],
  },{
    path:'newcuenta',
    component: CuentaNewComponent,
    canActivate:[AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaRoutingModule { }
