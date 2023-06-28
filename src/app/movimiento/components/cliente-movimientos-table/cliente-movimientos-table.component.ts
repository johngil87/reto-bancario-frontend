import { Component, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { MovimientosCliente } from 'src/app/models/movimientos-cliente';

@Component({
  selector: 'app-cliente-movimientos-table',
  templateUrl: './cliente-movimientos-table.component.html',
  styleUrls: ['./cliente-movimientos-table.component.css']
})
export class ClietneMovimientosTableComponent implements OnInit {

  @Input() datos: MovimientosCliente[]= [];
  constructor() { }

  ngOnInit() {
  }

  imprimirTabla(mov: MovimientosCliente){
    const doc = new jsPDF();
    doc.text(this.setFormato(mov),10,10)
    doc.save('movimiento')
  }

  setFormato(mov: MovimientosCliente): string{
    const form = `nombres: ${mov.nombre} \n  
    cuenta: ${mov.numeroCuenta} \n
    estado: ${mov.estado?'activo':'inactivo'} \n
    fecha: ${mov.fecha} \n
    saldo: ${mov.saldo} \n
    saldo inicial: ${mov.saldoInicial} \n
    valor Movimiento: ${mov.valor} \n
    tipo: ${mov.tipo}` ;
   return form;
  }

}
