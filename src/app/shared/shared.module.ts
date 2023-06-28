import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { InputSearchComponent } from './input-search/input-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { EstadoPipe } from './pipes/estado.pipe';
import { MovimientoTableComponent } from './movimiento-table/movimiento-table.component';



@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    InputSearchComponent,
    ModalComponent,
    EstadoPipe,
    MovimientoTableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    NavbarComponent,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    InputSearchComponent,
    ModalComponent,
    EstadoPipe,
    MovimientoTableComponent,
  ]
})
export class SharedModule { }
