import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Cliente } from '../models/cliente';
import { ErrorMessage } from '../models/error';
import { Cuenta } from '../models/cuenta';
import { Movimiento } from '../models/movimiento';

@Injectable({
  providedIn: 'root'
})
export class BancarioService {

  private baseUrl: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }   

  getAllClients():Observable<Cliente[] | ErrorMessage >{
    return this.http.get<Cliente[]>(`${this.baseUrl}/cliente`)
    .pipe(
      catchError(err => of(err))
    )
  }

  getAllAcount():Observable<Cuenta[] | ErrorMessage>{
    return this.http.get<Cuenta[]>(`${this.baseUrl}/cuenta`)
    .pipe(
      catchError(err => of(err))
    )
  }

  getAllMoved():Observable<Movimiento[] | ErrorMessage>{
    return this.http.get<Cuenta[]>(`${this.baseUrl}/movimiento`)
    .pipe(
      catchError(err => of(err))
    )
  }

  getClientById(id: string):Observable<Cliente | ErrorMessage >{
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

}
