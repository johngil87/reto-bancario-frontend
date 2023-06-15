import { Component, OnInit } from '@angular/core';
import { Movimiento } from 'src/app/models/movimiento';
import { BancarioService } from 'src/app/services/bancario.service';

@Component({
  selector: 'app-movimiento-list',
  templateUrl: './movimiento-list.component.html',
  styleUrls: ['./movimiento-list.component.css']
})
export class MovimientoListComponent implements OnInit{
  
  movimientos : Movimiento[] = [];
  filteredData: Movimiento[] = [];

  constructor(private service: BancarioService){}

  ngOnInit(): void {
    console.log('inicia lista de movimientos')
    this.service.getAllMoved().subscribe(res =>{
      if(res){
        this.movimientos = res;
        this.filteredData = res;
      }
    })
  }

  filterData(value: string) {
    if(value){
      this.filteredData = this.movimientos.filter((item: Movimiento) => {
        return item.idMovimiento === Number(value);
      });
      return;
    }
    this.filteredData = this.movimientos;
  }
}
