/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Edificio } from '../domain/edificio';
import { MessageService } from './message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class EdificioService {
  private edificioUrl = 'http://localhost:4000/api/edificios';
  constructor(private messageService: MessageService, private http: HttpClient, private snackBar: MatSnackBar) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  createEdificio(
    codigoEdificio: string,
    descricaoEdificio: string,
    nomeEdificio: string,
    comprimento: number,
    largura: number,
  ): Observable<Edificio> {
    const edificio: Edificio = {
      codigoEdificio: codigoEdificio,
      descricaoEdificio: descricaoEdificio,
      nomeEdificio: nomeEdificio,
      dimensaoMaximaPisos: {
        comprimento: comprimento,
        largura: largura,
      },
    };

    return this.http.post<Edificio>(this.edificioUrl, edificio, this.httpOptions).pipe(
      tap((newEdificio: Edificio) => {
        this.log(`edificio foi criado!`);
        this.openSnackBar(`Edifício com o código ${newEdificio.codigoEdificio} foi criado com sucesso!`, 'success');
      }),
      catchError(this.handleError<Edificio>('createEdificio')),
    );
  }

  getAllEdificios(): Observable<Edificio[]> {
    return this.http.get<Edificio[]>(this.edificioUrl);
  }

  updateEdificio(updatedEdificio: Edificio): Observable<any> {
    return this.http.put<any>(this.edificioUrl, updatedEdificio, this.httpOptions).pipe(
      tap((newEdificio: Edificio) => {
        this.log(`edificio foi atualizado!`);
        this.openSnackBar(`Edifício com o código ${newEdificio.codigoEdificio} foi editado com sucesso!`, 'success');
      }),
      catchError(this.handleError<Edificio>('updateEdificio')),
    );
  }

  deleteEdificio(codigoEdificio: string): Observable<any> {
    const url = `${this.edificioUrl}/${codigoEdificio}`;
    return this.http.delete(url);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      this.openSnackBar('Ocorreu um erro!', 'error');
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

  private openSnackBar(message: string, action: 'success' | 'error') {
    const snackClass = action === 'success' ? 'success-snackbar' : 'error-snackbar';
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [snackClass],
    });
  }
}
