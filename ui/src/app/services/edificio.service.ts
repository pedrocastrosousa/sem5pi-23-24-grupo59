/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Edificio } from '../domain/edificio';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class EdificioService {
  private edificioUrl = 'http://localhost:4000/api/edificios';
  constructor(private messageService: MessageService, private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  createEdificio(edificio: Edificio): Observable<Edificio> {
    return this.http.post<Edificio>(this.edificioUrl, edificio, this.httpOptions).pipe(
      tap((newEdificio: Edificio) => {
        this.log(`edificio foi criado!`);
        alert(`New edificio was created with ID: ${newEdificio.codigoEdificio}`);
      }),
      catchError(this.handleError<Edificio>('createEdificio')),
    );
  }

  getAllEdificios(): Observable<Edificio[]> {
    return this.http.get<Edificio[]>(this.edificioUrl);
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
    this.messageService.add(`EdificioService: ${message}`);
  }
}
