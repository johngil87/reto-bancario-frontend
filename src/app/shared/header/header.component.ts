import { Component } from '@angular/core';
import { BancarioService } from 'src/app/services/bancario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private service: BancarioService){}

  obtenerToken(){
    this.service.getToken().subscribe(res =>{
      if(res){
        console.log(res);
        localStorage.setItem('token', res?.token)
      }
    });
  }
}
