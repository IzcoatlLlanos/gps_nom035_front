import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  constructor(private http: HttpClient) { }

  private url = 'https://nom035.herokuapp.com/api/v1/encuestas/';

  getEncuestaItem(idEncuestaOK: string): Observable<any> {
    return this.http.get(this.url+idEncuestaOK);
  }
}
