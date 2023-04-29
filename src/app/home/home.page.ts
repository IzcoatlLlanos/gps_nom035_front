import { Component } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private usrService: UsuariosService) { }

  ngOnInit(): void {
    this.obtenerGerentes();
  }

  obtenerGerentes() {
    this.usrService.getGerentes().subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    })
  }
}
