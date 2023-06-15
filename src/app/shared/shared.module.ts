import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { InputSearchComponent } from './input-search/input-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    InputSearchComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NavbarComponent,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    InputSearchComponent
  ]
})
export class SharedModule { }
