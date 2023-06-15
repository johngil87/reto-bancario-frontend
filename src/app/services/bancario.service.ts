import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Cliente } from '../models/cliente';
import { ErrorMessage } from '../models/error';
import { Cuenta } from '../models/cuenta';
import { Movimiento } from '../models/movimiento';
import { MessageToken } from '../models/token';

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
      catchError(err => of(err))
    )
  }

  getAllAcount():Observable<Cuenta[] | null>{
    return this.http.get<Cuenta[]>(`${this.baseUrl}/cuenta`)
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
      catchError(err => of(err))
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
      catchError(err => of(err))
    )
  }

  getClientById(id: number):Observable<Cliente | null >{
    return this.http.get<Cliente>(`${this.baseUrl}/cliente/id?id=${id}`)
    .pipe(
      catchError(err => of(err))
    )
  }

  getAcountById(id: string):Observable<Cuenta | ErrorMessage >{
    return this.http.get<Cuenta>(`${this.baseUrl}/cuenta/id?id=${id}`)
    .pipe(
      catchError(err => of(err))
    )
  }

  getMovedById(id: string):Observable<Movimiento | ErrorMessage >{
    return this.http.get<Movimiento>(`${this.baseUrl}/movimiento/id?id=${id}`)
    .pipe(
      catchError(err => of(err))
    )
  }

  updateClient(client: Cliente):Observable<Cliente | ErrorMessage >{
    return this.http.put<Cliente>(`${this.baseUrl}/cliente`, client)
    .pipe(
      catchError(err => of(err))
    )
  }
  updateAcount(acount: Cuenta):Observable<Cuenta | ErrorMessage >{
    return this.http.put<Cliente>(`${this.baseUrl}/cuenta`, acount)
    .pipe(
      catchError(err => of(err))
    )
  }

  updateMoved(moved: Movimiento):Observable<Movimiento | ErrorMessage >{
    return this.http.put<Cliente>(`${this.baseUrl}/movimiento`, moved)
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
}
