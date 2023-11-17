import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Passagem } from '../domain/passagem';

@Injectable({
  providedIn: 'root',
})
export class PassagemService {
  private passagemUrl = 'api/passagens';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  createPassagem(passagem: Passagem): Observable<Passagem> {
    return this.http.post<Passagem>(this.passagemUrl, passagem, this.httpOptions);
  }
  
  updatePassagem(passagem: Passagem): Observable<Passagem> {
    return this.http.post<Passagem>(this.passagemUrl, passagem, this.httpOptions);
  }

  listPassagens(): Observable<Passagem[]> {
    return this.http.get<Passagem[]>(this.passagemUrl);
  }
}
