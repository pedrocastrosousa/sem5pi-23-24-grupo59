import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Piso } from '../domain/pisos';

@Injectable({
  providedIn: 'root',
})
export class PisoService {
  private pisoUrl = 'api/pisos';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  createPiso(piso: Piso): Observable<Piso> {
    return this.http.post<Piso>(this.pisoUrl, piso, this.httpOptions);
  }
}