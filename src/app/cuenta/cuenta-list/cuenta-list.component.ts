import { Component } from '@angular/core';
import { Cuenta } from 'src/app/models/cuenta';
import { CuentaService } from '../services/cuenta.service';

@Component({
  selector: 'app-cuenta-list',
  templateUrl: './cuenta-list.component.html',
  styleUrls: ['./cuenta-list.component.css']
})
export class CuentaListComponent {
  cuentas: Cuenta[] = [];
  filteredData: Cuenta[] = [];

  constructor(private service: CuentaService){}

  ngOnInit(): void {
    console.log('inicia lista clientes')
    this.service.getAllAcount().subscribe(res =>{
      if(res){
        this.cuentas = res;
        this.filteredData = res;
      }
    })
  }

  filterData(value: string) {
    if(value){
      this.filteredData = this.cuentas.filter((item: Cuenta) => {
        return item.numeroCuenta?.toString().includes(value);
      });
      return;
    }
    this.filteredData = this.cuentas;
  }
}
