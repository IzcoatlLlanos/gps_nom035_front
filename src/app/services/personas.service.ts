import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';
import { EncuestaPersona } from '../models/encuesta-persona';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private url = 'http://localhost:3020/api/v1/personas/'

  constructor(private http: HttpClient) { }

  getPersonasByHotel(hotel: string): Observable<any> {
    return this.http.get(this.url+hotel);
  }

  
  postPersonaItem(prs: Persona): Observable<any> {
    return this.http.post(this.url,prs);
  }

  putPersonaItem(idPersonaOK: String, prs: Persona): Observable<any> {
    return this.http.put(this.url+idPersonaOK,prs);
  }
  
  deletePersonaItem(idPersonaOK: String): Observable<any> {
    return this.http.delete(this.url+idPersonaOK);
  }

  pushEncuestaItem(idPersonaOK: string, idRespuestaOK: string, encuestaItem: EncuestaPersona): Observable<any> {
    return this.http.put(this.url+'encuesta/'+idPersonaOK+'/'+idRespuestaOK,encuestaItem);
  }
}
