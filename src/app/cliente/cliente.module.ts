import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteComponent } from './cliente/cliente.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteNewComponent } from './cliente-new/cliente-new.component';


@NgModule({
  declarations: [
    ClienteListComponent,
    ClienteComponent,
    ClienteNewComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ClienteModule { }
