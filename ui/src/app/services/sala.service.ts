import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sala } from '../domain/sala';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  private salaURL = 'http://localhost:4000/api/salas';
  private criarSalaUrl = this.salaURL + '/criarSala';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  createSala(sala: Sala): Observable<Sala> {
    return this.http.post<Sala>(this.criarSalaUrl, sala, this.httpOptions).pipe(
      tap((newSala: Sala) => {
        console.log(`sala ${newSala.nomeSala} foi criada!`);
        alert(`New Sala was created with ID: ${newSala.nomeSala}`);
      }),
      catchError(this.handleError<Sala>('createSala')),
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      alert('Ocorreu um erro!');
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}