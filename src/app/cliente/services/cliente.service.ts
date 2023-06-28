import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl: string = 'http://localhost:8080/api/cliente';

  constructor(private http: HttpClient) { }
  
  getAllClients():Observable<Cliente[] | null >{
    return this.http.get<Cliente[]>(`${this.baseUrl}`)
    .pipe(
      catchError(err => of(err))
    )
  }

  createCliente(cliente : Cliente):Observable<Cliente | null >{
    const token = this.tokenLocalStorage(); 
    const headers = new HttpHeaders({
      'my-token':token
    })
    return this.http.post<Cliente>(`${this.baseUrl}`,cliente,{headers: headers})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  updateClient(cliente : Cliente):Observable<Cliente | null >{
    const token = this.tokenLocalStorage(); 
    const headers = new HttpHeaders({
      'my-token':token
    })
    return this.http.put<Cliente>(`${this.baseUrl}`,cliente,{headers: headers})
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
    return this.http.delete<Cliente>(`${this.baseUrl}?id=${id}`,{headers: headers})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getClientById(id: number):Observable<Cliente | null >{
    return this.http.get<Cliente>(`${this.baseUrl}/id?id=${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getClientByIdentification(id: number):Observable<Cliente | null >{
    return this.http.get<Cliente>(`${this.baseUrl}/identificacion?id=${id}`)
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
