import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit{

  clientes: Cliente[] = [];
  filteredData: Cliente[] = [];

  constructor(private service: ClienteService){}

  ngOnInit(): void {
    console.log('inicia lista clientes')
    this.service.getAllClients().subscribe(res =>{
      if(res){
        this.clientes = res;
        this.filteredData = res;
      }
    })
  }
  
  filterData(value: string) {
    this.filteredData = this.clientes.filter((item: Cliente) => {
      return item.nombre.toLowerCase().includes(value.toLowerCase());
    });
  }
}
