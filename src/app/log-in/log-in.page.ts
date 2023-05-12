import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController,IonSelect,ModalController,ToastController } from '@ionic/angular';

import { WhatsappService } from '../services/whatsapp.service';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../models/usuario';

import{ FormGroup, FormControl, Validators, FormBuilder }from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  
  formularioLogin: FormGroup;

  constructor(
    private wa: WhatsappService,
    private router: Router,
    public fb: FormBuilder,
    private usrService: UsuariosService,
    private alertController: AlertController,
    private toastController: ToastController,
  ) {
    
    this.formularioLogin=this.fb.group({
      'usr': new FormControl("",Validators.required),
      'pwd': new FormControl("",Validators.required)
    });
  }

  private validateLogIn(){
    const IdUsuarioBK = this.formularioLogin.controls['usr'].value;
    const Clave = this.formularioLogin.controls['pwd'].value;
    this.usrService.getUsuarioItem(IdUsuarioBK,'BK').subscribe( data => {
      const logedUser: Usuario = data.userItem;
      if (!logedUser.Activo) {
        this.presentToast('Cuenta inhabilitada', 'danger');
      } else if (logedUser.Activo) {
        if (logedUser.Clave == Clave){
          const Rol = logedUser.Rol;
          if (Rol == '1') {
            this.presentToast('Bienvenido Director '+ logedUser.Nombres,'success');
            this.router.navigate(['/homeDirector',logedUser.IdUsuarioOK]);
          }else if (Rol == '2') {
            this.presentToast('Bienvenido Gerente '+ logedUser.Nombres,'success');
            this.router.navigate(['/homeGerente',logedUser.IdUsuarioOK]);
          }
        } else {
          this.presentToast('Contraseña Incorrecta','danger');
        }
      }
    } );

  }

  logIn() {
    this.validateLogIn();
    
  }

  ngOnInit() {
    
  }

  private async presentToast(
    message: string,
    color: 'success' | 'danger' | 'warning'
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 500,
      color,
    });
    toast.present();
  }

}
