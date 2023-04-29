import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = 'http://localhost:3020/api/v1/usuarios'

  constructor(private http: HttpClient) { }

  getGerentes(): Observable<any> {
    return this.http.get(this.url+'/gerentes')
  }
}
