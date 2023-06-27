import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject, catchError, of, tap } from 'rxjs';
import { MessageToken } from 'src/app/models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private baseUrl: string = 'http://localhost:8080/api';
private stateLog = new Subject<boolean>();
isLog$ = this.stateLog.asObservable();
constructor(private http: HttpClient) { }

getToken():Observable<MessageToken | null >{
  return this.http.get<MessageToken>(`${this.baseUrl}/login`)
  .pipe(
    tap(res => this.stateLog.next(true)),
    catchError(err => of(err))
  )
}

validateToken():Observable<boolean>{
  const token = this.tokenLocalStorage(); 
    const headersToken = new HttpHeaders({
      'my-token':token
    })
  return this.http.get<boolean>(`${this.baseUrl}/login/valid`, {headers: headersToken})
  .pipe(
    tap(res => this.stateLog.next(res)),
    catchError(err => of(false))
  )
}

tokenLocalStorage(): string{
  if(localStorage.getItem('token')){
    return localStorage.getItem('token')!
  }
  return '';
}
}