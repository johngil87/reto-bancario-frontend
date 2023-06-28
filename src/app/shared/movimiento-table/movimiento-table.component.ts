import { Component, Input, OnInit } from '@angular/core';
import { Movimiento } from 'src/app/models/movimiento';

@Component({
  selector: 'app-movimiento-table',
  templateUrl: './movimiento-table.component.html',
  styleUrls: ['./movimiento-table.component.css']
})
export class MovimientoTableComponent implements OnInit {

  @Input() datos: Movimiento[]= [];
  constructor() { }

  ngOnInit() {
  }

}
