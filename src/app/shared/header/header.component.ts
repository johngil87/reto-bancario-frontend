import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { BancarioService } from 'src/app/services/bancario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  log:boolean= false;
  constructor(private router: Router, private service: AuthService){
    this.service.isLog$.subscribe(bol=> this.log =bol);    
  }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.log=true
      return
    }
    this.log = false
  }

  login(){
    this.router.navigate(['login'])  
  }

  logout(){
    this.router.navigate(['login'])  
    localStorage.clear()
    this.log = false;
  }
}
