import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Piso } from '../domain/pisos';
import { MessageService } from './message.service';
import {Edificio} from "../domain/edificio";


@Injectable({
  providedIn: 'root',
})
export class PisoService {
  private criarPisoUrl = 'http://localhost:4000/api/pisos/criarPiso';
  private listarPisosUrl = 'http://localhost:4000/api/pisos/listarAllPisos';
  private listarPisosEdificio = 'http://localhost:4000/api/pisos/listarPisosEdificio';
  private listarEdificiosComMinMaxPisosUrl = 'http://localhost:4000/api/pisos/listarEdificioMinMaxPisos';
  private editarPisoUrl = 'http://localhost:4000/api/pisos/';

  constructor(private messageService: MessageService, private http: HttpClient) {}


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  createPiso(piso: Piso): Observable<Piso> {
    return this.http.post<Piso>(this.criarPisoUrl, piso, this.httpOptions).pipe(
      tap((newPiso: Piso) => {
        this.log(`piso foi criado!`);
        alert(`New Piso was created with ID: ${newPiso.nome}`);
      }),
      catchError(this.handleError<Piso>('createPiso')),
    );;
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      alert('Ocorreu um erro!');
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PisoService: ${message}`);
  }


  getAllPisos(): Observable<Piso[]> {
    return this.http.get<Piso[]>(this.listarPisosUrl);
  }

  getPisosEdificio(codigoEdificio: string): Observable<Piso[]> {
    const url = `${this.listarPisosEdificio}/${codigoEdificio}`;
    return this.http.get<Piso[]>(url);
  }

  listarEdificiosComMinMaxPisos(minPisos: any, maxPisos: any) {
    const url = `${this.listarEdificiosComMinMaxPisosUrl}?min=${minPisos}&max=${maxPisos}`;

    return this.http.get<Edificio[]>(this.listarEdificiosComMinMaxPisosUrl, {params: {min: minPisos, max: maxPisos}});
  }


  updatePiso(codigoPiso: string, piso: Partial<Piso>): Observable<Piso> {
    const url = `${this.editarPisoUrl}${codigoPiso}`;
    console.log(url);
    return this.http.put<Piso>(url, piso, this.httpOptions).pipe(
      tap((newPiso: Piso) => {
        this.log(`Piso foi atualizada!`);
        alert(`Piso ${newPiso.codigoPiso} was updated`);
      }),
      catchError(this.handleError<Piso>('updatePiso')),
    );
  }
}
