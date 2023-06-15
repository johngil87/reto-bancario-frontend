import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { InputSearchComponent } from './input-search/input-search.component';



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
    InputSearchComponent
  ]
})
export class SharedModule { }
