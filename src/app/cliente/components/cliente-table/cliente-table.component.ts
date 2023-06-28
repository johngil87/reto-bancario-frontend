import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-cliente-table',
  templateUrl: './cliente-table.component.html',
  styleUrls: ['./cliente-table.component.css']
})
export class ClienteTableComponent implements OnInit {

  @Input() datos: Cliente[]= [];
  constructor() { }

  ngOnInit() {
  }

}
