import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { pipe, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private servie: AuthService, private router: Router){}

  loign(){
    this.servie.getToken().pipe(
        tap(res => {
          if(res){
            console.log(res)
            localStorage.setItem('token', res?.token)            
          }
        }),
        tap(res=> this.router.navigate(['clientes']))    
    ).subscribe()
  }
}
