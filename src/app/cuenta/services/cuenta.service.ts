import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Cuenta } from 'src/app/models/cuenta';
import { ErrorMessage } from 'src/app/models/error';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private baseUrl: string = 'http://localhost:8080/api/cuenta';

  constructor(private http: HttpClient) { }

  createAcount(cuenta: Cuenta):Observable<Cuenta | null>{
    const token = this.tokenLocalStorage(); 
    const headers = new HttpHeaders({
      'my-token':token
    })
    return this.http.post<Cuenta>(`${this.baseUrl}`,cuenta,{headers: headers})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAcountById(id: string):Observable<Cuenta | null >{
    return this.http.get<Cuenta>(`${this.baseUrl}/id?id=${id}`)
    .pipe(
      catchError(err => of(err))
    )
  }

  updateAcount(acount: Cuenta):Observable<Cuenta | ErrorMessage >{
    const token = this.tokenLocalStorage(); 
    const headers = new HttpHeaders({
      'my-token':token
    })
    return this.http.put<Cuenta>(`${this.baseUrl}`, acount, {headers: headers})
    .pipe(
      catchError(err => of(err))
    )
  }

  deleteAcount(id:number):Observable< null >{
    const token = this.tokenLocalStorage(); 
    const headers = new HttpHeaders({
      'my-token':token
    })
    console.log(id);
    return this.http.delete<null>(`${this.baseUrl}/id?id=${id}`,{headers: headers})
    .pipe(
      catchError(err => of(err))
    )
  }

  getAllAcount():Observable<Cuenta[] | null>{
    return this.http.get<Cuenta[]>(`${this.baseUrl}`)
    .pipe(
      catchError(err => of(err))
    )
  }

  getAllAcountByClient(id: string):Observable<Cuenta[] | null>{
    return this.http.get<Cuenta[]>(`${this.baseUrl}/identificacion?id=${id}`)
    .pipe(
      catchError(err => of(err))
    )
  }

  errorHandler(error: string){
    return throwError(error)
  }
  

  tokenLocalStorage(): string{
    if(localStorage.getItem('token')){
      return localStorage.getItem('token')!
    }
    return '';
  }
}
