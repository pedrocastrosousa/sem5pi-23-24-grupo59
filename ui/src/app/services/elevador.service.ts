import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Elevador } from '../domain/elevador';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElevadorService {

  private elevadorURL = 'http://localhost:4000/api/elevadores';
  private criarElevadorUrl = this.elevadorURL + '/criarElevador';
  private listarElevadorUrl = this.elevadorURL + '/listar';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  createElevador(elevador: Elevador): Observable<Elevador> {
    return this.http.post<Elevador>(this.criarElevadorUrl, elevador, this.httpOptions).pipe(
      tap((newElevador: Elevador) => {
        console.log(`elevador ${newElevador.numeroIdentificativo} foi criado!`);
        alert(`New Elevador was created with ID: ${newElevador.numeroIdentificativo}`);
      }),
      catchError(this.handleError<Elevador>('createElevador')),
    );
  }

  getAllElevadores(): Observable<Elevador[]> {
    return this.http.get<Elevador[]>(this.listarElevadorUrl);
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
