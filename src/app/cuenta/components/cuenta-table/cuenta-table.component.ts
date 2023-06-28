import { Component, Input, OnInit } from '@angular/core';
import { Cuenta } from 'src/app/models/cuenta';

@Component({
  selector: 'app-cuenta-table',
  templateUrl: './cuenta-table.component.html',
  styleUrls: ['./cuenta-table.component.css']
})
export class CuentaTableComponent implements OnInit {

  @Input() datos: Cuenta[]= [];
  constructor() {} 

  ngOnInit() {
  }

}
