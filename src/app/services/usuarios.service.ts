import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = 'https://nom035.herokuapp.com/api/v1/usuarios/'

  constructor(private http: HttpClient) { }

  getGerentes(): Observable<any> {
    return this.http.get(this.url+'gerentes');
  }

  getUsuarioItem(IdUsuarioBK: string,keyType: string): Observable<any> {
    return this.http.get(this.url+IdUsuarioBK+'?keyType='+keyType);
  }

  /*
    HILG: Este método recibe un usuario, toma el IdUsuarioOK para saber cual usuario en especifico modificar
      y retorna un observable, el cual nos retorna una variable de control: verdadero o falso segun haya sido
      y el usuario modificado  */
  updateUser(usr: Usuario): Observable<any>  {
    const IdUsuarioOK = usr.IdUsuarioOK;
    return this.http.put(this.url+IdUsuarioOK,usr);
  }

  addUser(usr: Usuario): Observable<any> {
    const IdUsuarioOK = usr.IdUsuarioOK;
    return this.http.post(this.url,usr);
  }

  deleteUser(usr: Usuario): Observable<any> {
    const IdUsuarioOK = usr.IdUsuarioOK;
    return this.http.delete(this.url+IdUsuarioOK);
  }
}
