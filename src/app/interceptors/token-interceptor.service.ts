import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

constructor() { }

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
  const token = this.tokenLocalStorage(); 
    const headers = new HttpHeaders({
      'my-token':token
    });
  const requestClone = request.clone({
    headers
  })
  return next.handle(requestClone);
}

tokenLocalStorage(): string{
  if(localStorage.getItem('token')){
    return localStorage.getItem('token')!
  }
  return '';
}

}
