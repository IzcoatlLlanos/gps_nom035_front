import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private url = 'http://localhost:3020/api/v1/personas/'

  constructor(private http: HttpClient) { }

  getPersonasByHotel(hotel: string): Observable<any> {
    return this.http.get(this.url+hotel);
  }

  
}
