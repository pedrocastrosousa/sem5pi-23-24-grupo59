import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Passagem } from '../domain/passagem';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class PassagemService {
  private criarPassagemUrl = 'http://localhost:4000/api/passagem/criarPassagem';
  private editarPassagemUrl = 'http://localhost:4000/api/passagem/editarPassagem';
  private listarPassagemEntreEdificiosUrl = 'http://localhost:4000/api/passagem/listarPassagensEdificio1Edificio2';
  private listarPassagensUrl = 'http://localhost:4000/api/passagem/listarAllPassagens';
  constructor(private messageService: MessageService, private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  createPassagem(passagem: Passagem): Observable<Passagem> {
    return this.http.post<Passagem>(this.criarPassagemUrl, passagem, this.httpOptions).pipe(
    tap((newPassagem: Passagem) => {
      this.log(`passagem foi criada!`);
      alert(`New Passsagem was created with ID: ${newPassagem.passagemId}`);
    }),
    catchError(this.handleError<Passagem>('createPassagem')),
  );;
  }
  
  updatePassagem(passagem: Passagem): Observable<Passagem> {
    return this.http.put<Passagem>(this.editarPassagemUrl, passagem, this.httpOptions).pipe(
      tap((newPassagem: Passagem) => {
        this.log(`passagem foi atualizada!`);
        alert(`Passagem ${newPassagem.codigoPassagem} was updated`);
      }),
      catchError(this.handleError<Passagem>('updatePassagem')),
    );;
  }

  listPassagens(): Observable<Passagem[]> {
    return this.http.get<Passagem[]>(this.listarPassagensUrl);
  }

  listPassagensEntreEdificios(): Observable<Passagem[]> {
    return this.http.get<Passagem[]>(this.listarPassagemEntreEdificiosUrl);
  }


   /** Log a HeroService message with the MessageService */
   private log(message: string) {
    this.messageService.add(`PassagemService: ${message}`);
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

}
