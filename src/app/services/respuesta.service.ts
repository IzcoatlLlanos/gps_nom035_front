import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Respuesta } from '../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private url = 'http://localhost:3020/api/v1/respuestas/'

  constructor(private http: HttpClient) { }

  getRespuestaList(): Observable<any> {
    return this.http.get(this.url);
  };

  postRespuestaItem(respuestaItem: Respuesta): Observable <any> {
    return this.http.post(this.url, respuestaItem);
  }
}
