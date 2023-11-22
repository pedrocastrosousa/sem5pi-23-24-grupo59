import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Robot } from '../domain/robot';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class RobotService {
  private robotUrl = 'http://localhost:4000/api/robots/listar';
  private criarRobotUrl = 'http://localhost:4000/api/robots/criarRobot';
  private inibirRobotUrl = 'http://localhost:4000/api/robots';
  constructor(private messageService: MessageService, private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  createRobot(robot: Robot): Observable<Robot> {
    return this.http.post<Robot>(this.criarRobotUrl, robot, this.httpOptions).pipe(
      tap((newRobot: Robot) => {
        this.log(`robot foi criado!`);
        alert(`New Robot was created with ID: ${newRobot.codigoRobot}`);
      }),
      catchError(this.handleError<Robot>('createRobot')),
    );
  }

  getAllRobots(): Observable<Robot[]> {
    return this.http.get<Robot[]>(this.robotUrl);
  }


  inibirRobot(robot: Partial<Robot>): Observable<Robot> {
    const url = `${this.inibirRobotUrl}/${robot.codigoRobot}`;
    console.log('url' + url);
    return this.http.patch<Robot>(url,{}).pipe();

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
    this.messageService.add(`RobotService: ${message}`);
  }
}
