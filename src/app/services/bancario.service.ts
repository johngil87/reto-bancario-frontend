import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Cliente } from '../models/cliente';
import { ErrorMessage } from '../models/error';
import { Cuenta } from '../models/cuenta';
import { Movimiento } from '../models/movimiento';
import { MessageToken } from '../models/token';
import { MovimientosCliente } from '../models/movimientos-cliente';

@Injectable({
  providedIn: 'root'
})
export class BancarioService {

  private baseUrl: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }   

  getToken():Observable<MessageToken | null >{
    return this.http.get<MessageToken>(`${this.baseUrl}/jwt`)
    .pipe(
      catchError(err => of(err))
    )
  }
  
  getAllClients():Observable<Cliente[] | null >{
    return this.http.get<Cliente[]>(`${this.baseUrl}/cliente`)
    .pipe(
      catchError(err => of(err))
    )
  }

  createCliente(cliente : Cliente):Observable<Cliente | null >{
    const token = this.tokenLocalStorage(); 
    const headers = new HttpHeaders({
      'my-token':token
    })
    return this.http.post<Cliente>(`${this.baseUrl}/cliente`,cliente,{headers: headers})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  updateClient(cliente : Cliente):Observable<Cliente | null >{
    const token = this.tokenLocalStorage(); 
    const headers = new HttpHeaders({
      'my-token':token
    })
    return this.http.put<Cliente>(`${this.baseUrl}/cliente`,cliente,{headers: headers})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  deleteCliente(id:number):Observable<Cliente | null >{
    const token = this.tokenLocalStorage(); 
    const headers = new HttpHeaders({
      'my-token':token
    })
    console.log(id);
    return this.http.delete<Cliente>(`${this.baseUrl}/cliente?id=${id}`,{headers: headers})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  deleteAcount(id:number):Observable< null >{
    const token = this.tokenLocalStorage(); 
    const headers = new HttpHeaders({
      'my-token':token
    })
    console.log(id);
    return this.http.delete<null>(`${this.baseUrl}/cuenta/id?id=${id}`,{headers: headers})
    .pipe(
      catchError(err => of(err))
    )
  }

  getAllAcount():Observable<Cuenta[] | null>{
    return this.http.get<Cuenta[]>(`${this.baseUrl}/cuenta`)
    .pipe(
      catchError(err => of(err))
    )
  }

  getAllAcountByClient(id: string):Observable<Cuenta[] | null>{
    return this.http.get<Cuenta[]>(`${this.baseUrl}/cuenta/identificacion?id=${id}`)
    .pipe(
      catchError(err => of(err))
    )
  }

  createAcount(cuenta: Cuenta):Observable<Cuenta | null>{
    const token = this.tokenLocalStorage(); 
    const headers = new HttpHeaders({
      'my-token':token
    })
    return this.http.post<Cuenta>(`${this.baseUrl}/cuenta`,cuenta,{headers: headers})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllMoved():Observable<Movimiento[] | null>{
    return this.http.get<Cuenta[]>(`${this.baseUrl}/movimientos`)
    .pipe(
      catchError(err => of(err))
    )
  }

  createMoved(moved: Movimiento):Observable<Movimiento | null>{
    const token = this.tokenLocalStorage(); 
    const headers = new HttpHeaders({
      'my-token':token
    })
    return this.http.post<Movimiento>(`${this.baseUrl}/movimientos`,moved,{headers: headers})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getClientById(id: number):Observable<Cliente | null >{
    return this.http.get<Cliente>(`${this.baseUrl}/cliente/id?id=${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getClientByIdentification(id: number):Observable<Cliente | null >{
    return this.http.get<Cliente>(`${this.baseUrl}/cliente/identificacion?id=${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAcountById(id: string):Observable<Cuenta | null >{
    return this.http.get<Cuenta>(`${this.baseUrl}/cuenta/id?id=${id}`)
    .pipe(
      catchError(err => of(err))
    )
  }

  getMovedById(id: string):Observable<Movimiento | null >{
    return this.http.get<Movimiento>(`${this.baseUrl}/movimientos/id?id=${id}`)
    .pipe(
      catchError(err => of(err))
    )
  }

  deleteMovedById(id: string):Observable< null >{
    const token = this.tokenLocalStorage(); 
    const headers = new HttpHeaders({
      'my-token':token
    })
    return this.http.delete<null>(`${this.baseUrl}/movimientos?id=${id}`,{headers: headers})
    .pipe(
      catchError(err => of(null))
    )
  }

  updateMoved(mov: Movimiento):Observable<Movimiento | null>{
    const token = this.tokenLocalStorage(); 
    const headers = new HttpHeaders({
      'my-token':token
    })
    return this.http.put<Movimiento>(`${this.baseUrl}/movimientos`,mov,{headers: headers})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getMovedByClient(idCLiente: number, fechaInicial: Date, fecheFinal:Date):Observable<MovimientosCliente[] | null >{
    return this.http.get<MovimientosCliente[]>(`${this.baseUrl}/movimientos/cliente?id=${idCLiente}&fechaInicial=${fechaInicial}&fechaFinal=${fecheFinal}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  updateAcount(acount: Cuenta):Observable<Cuenta | ErrorMessage >{
    const token = this.tokenLocalStorage(); 
    const headers = new HttpHeaders({
      'my-token':token
    })
    return this.http.put<Cliente>(`${this.baseUrl}/cuenta`, acount, {headers: headers})
    .pipe(
      catchError(err => of(err))
    )
  }

  tokenLocalStorage(): string{
    if(localStorage.getItem('token')){
      return localStorage.getItem('token')!
    }
    return '';
  }

  errorHandler(error: string){
    return throwError(error)
  }
}
