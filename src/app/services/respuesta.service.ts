import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Respuesta } from '../models/respuesta';
import { Seccion } from '../models/seccion';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private url = 'http://localhost:3020/api/v1/respuestas/'

  constructor(private http: HttpClient) { }

  getRespuestaByidPersonaOK(idPersonaOK: string): Observable<any> {
    return this.http.get(this.url+'persona/'+idPersonaOK);
  }

  getRespuestaList(): Observable<any> {
    return this.http.get(this.url);
  }

  postRespuestaItem(respuestaItem: Respuesta): Observable <any> {
    return this.http.post(this.url, respuestaItem);
  }

  getRespuestaItem(idRespuestaOK: string): Observable<any> {
    return this.http.get(this.url+idRespuestaOK);
  }

  putRespuestaItem(idRespuestaOK: string, respuestaItem: Respuesta): Observable<any> {
    return this.http.put(this.url+idRespuestaOK,respuestaItem);
  }

  pushRespuestaSeccionItem(idRespuestaOK: string, idSeccionOK: string, seccionItem: Seccion): Observable<any> {
    return this.http.put(this.url+'/seccion/'+idRespuestaOK+'/'+idSeccionOK,seccionItem);
  }


}
