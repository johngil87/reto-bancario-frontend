import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'clientes',
    loadChildren: ()=> import('./cliente/cliente.module').then(m => m.ClienteModule)
  },{
    path:'cuentas',
    loadChildren: ()=> import('./cuenta/cuenta.module').then(m => m.CuentaModule)
  },{
    path:'movimientos',
    loadChildren: ()=> import('./movimiento/movimiento.module').then(m => m.MovimientoModule)
  },{
    path:'login',
    loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)
  },{
    path:'',
    redirectTo:'clientes',
    pathMatch:'full'
  },{
    path:'**',
    redirectTo:'clientes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
