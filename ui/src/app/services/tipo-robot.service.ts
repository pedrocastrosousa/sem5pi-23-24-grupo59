/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoRobot } from '../domain/tipoRobot';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TipoRobotService {
  private tipoRobotUrl = 'http://localhost:4000/api/tipoRobots';

  constructor(private messageService: MessageService, private http: HttpClient, private snackBar: MatSnackBar) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  createTipoRobot(designacaoTipoRobot: string, tipoTarefaTipoRobot: string[]): Observable<TipoRobot> {
    const tipoRobot: TipoRobot = {
      designacaoTipoRobot: designacaoTipoRobot,
      tipoTarefaTipoRobot: tipoTarefaTipoRobot,
    };

    return this.http.post<TipoRobot>(this.tipoRobotUrl, tipoRobot, this.httpOptions).pipe(
      tap((newTipoRobot: TipoRobot) => {
        this.log(`tipoRobot foi criado!`);
        this.openSnackBar(
          `Tipo de robot com a designação ${newTipoRobot.designacaoTipoRobot} foi criado com sucesso!`,
          'success',
        );
      }),
      catchError(this.handleError<TipoRobot>('addTipoRobot')),
    );
  }

  getAllTipoRobots(): Observable<TipoRobot[]> {
    return this.http.get<TipoRobot[]>(this.tipoRobotUrl);
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
    this.messageService.add(`TipoRobotService: ${message}`);
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
