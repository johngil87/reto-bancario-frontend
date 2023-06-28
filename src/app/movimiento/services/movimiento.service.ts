import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Movimiento } from 'src/app/models/movimiento';
import { MovimientosCliente } from 'src/app/models/movimientos-cliente';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  private baseUrl: string = 'http://localhost:8080/api/movimientos';

  constructor(private http: HttpClient) { }

  getAllMoved():Observable<Movimiento[] | null>{
    return this.http.get<Movimiento[]>(`${this.baseUrl}`)
    .pipe(
      catchError(err => of(err))
    )
  }

  createMoved(moved: Movimiento):Observable<Movimiento | null>{
    const token = this.tokenLocalStorage(); 
    const headers = new HttpHeaders({
      'my-token':token
    })
    return this.http.post<Movimiento>(`${this.baseUrl}`,moved,{headers: headers})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getMovedById(id: string):Observable<Movimiento | null >{
    return this.http.get<Movimiento>(`${this.baseUrl}/id?id=${id}`)
    .pipe(
      catchError(err => of(err))
    )
  }

  deleteMovedById(id: string):Observable< null >{
    const token = this.tokenLocalStorage(); 
    const headers = new HttpHeaders({
      'my-token':token
    })
    return this.http.delete<null>(`${this.baseUrl}?id=${id}`,{headers: headers})
    .pipe(
      catchError(err => of(null))
    )
  }

  updateMoved(mov: Movimiento):Observable<Movimiento | null>{
    const token = this.tokenLocalStorage(); 
    const headers = new HttpHeaders({
      'my-token':token
    })
    return this.http.put<Movimiento>(`${this.baseUrl}`,mov,{headers: headers})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getMovedByClient(idCLiente: number, fechaInicial: Date, fecheFinal:Date):Observable<MovimientosCliente[] | null >{
    return this.http.get<MovimientosCliente[]>(`${this.baseUrl}/cliente?id=${idCLiente}&fechaInicial=${fechaInicial}&fechaFinal=${fecheFinal}`)
    .pipe(
      catchError(this.errorHandler)
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
