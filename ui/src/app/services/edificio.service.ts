import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Edificio } from '../domain/edificio';

@Injectable({
  providedIn: 'root',
})
export class EdificioService {
  private edificioUrl = 'api/edificios';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  createEdificio(edificio: Edificio): Observable<Edificio> {
    return this.http.post<Edificio>(this.edificioUrl, edificio, this.httpOptions);
  }
}
