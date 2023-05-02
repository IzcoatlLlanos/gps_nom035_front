import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonSearchbar, ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../models/persona';
import { PersonasService } from '../services/personas.service';
import { Usuario } from '../models/usuario';
import { IconColor } from '../models/icon-color';
import { error } from 'console';

@Component({
  selector: 'app-home-gerente',
  templateUrl: './home-gerente.page.html',
  styleUrls: ['./home-gerente.page.scss'],
})
export class HomeGerentePage implements OnInit {

  enabled: boolean=false;
  admin?: Usuario;
  usrToUpdate?: Usuario; //Toma el valor del indice cuando isModalUpdate es verdadero
  validationMessages;
  validationPwdMessages;
  formPersona: FormGroup;
  formPwd: FormGroup;
  isModalOpen = false;
  isModalUpdate = false;
  public empleados: Persona[] = [];
  public fEmpleados: Persona[] = [];

  constructor(
    private prsService: PersonasService,
    private usrService: UsuariosService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formPwd = this.fb.group({
      'pwd1': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'pwd2': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.validationPwdMessages = {
      'pwd1': [
        {type: 'required', message: 'CONTRASEÑA requerida!'},
        {type: 'minlength', message: 'CONTRASEÑA debil!'}
      ],
      'pwd2': [
        {type: 'required', message: 'CONTRASEÑA requerida!'},
        {type: 'minlength', message: 'CONTRASEÑA debil!'}
      ]
    };

    this.formPersona = this.fb.group({
      'IdPersonaOK': [],
      'Nombres': ['', Validators.required],
      'Apellidos': ['', Validators.required],
      'CorreoEle': ['', Validators.email],
      'Celular': ['', Validators.compose([
        Validators.required, 
        Validators.minLength(10),
         Validators.maxLength(11)])],
      'Encuesta': []
   });
    this.validationMessages = {
      'Nombres': [
        {type: 'required', message: 'NOMBRE requerido!'}
      ],
      'Apellidos': [
        {type: 'required', message: 'NOMBRE requerido!'}
      ],
      'CorreoEle': [
        {type: 'required', message: 'FORMATO incorrecto!'},
      ],
      'Celular': [
        {type: 'required', message: 'CELULAR requerido!'},
        {type: 'pattern', message: 'FORMATO incorrecto!'},
        {type: 'maxLength', message: 'LONGITUD invalida!'},
        {type: 'minLength', message: 'LONGITUD invalida!'}
      ]
    };
  }
  ngOnInit() {
    let IdUsuarioOK;
    this.activatedRoute.paramMap.subscribe((params) => {
      IdUsuarioOK = params.get('id');
    });
    IdUsuarioOK = IdUsuarioOK +'';
    this.cargarAdmin(IdUsuarioOK);    
  }

  validarPwd(){
    const pwd1 = this.formPwd.controls['pwd1'].value;
    const pwd2 = this.formPwd.controls['pwd2'].value;
    if (pwd1 != pwd2) this.presentToast('Las contraseñas no coinciden!','danger');
    else if (pwd1 == pwd2) {
      if(this.admin) {
        this.admin.Clave = pwd1;
        this.admin.Generated = false;
        this.usrService.updateUser(this.admin).subscribe( data => {
          this.admin = data.userItem;
          this.presentToast('Contraseña actualizada con exito!','success');
        });
      }
    }
  }

  private cargarAdmin(IdUsuarioOK: string) {
    this.usrService.getUsuarioItem(IdUsuarioOK,'OK').subscribe( data => {
      this.admin = data.userItem;
      if (this.admin?.Generated) {
        this.cargarPersonas();
        this.enabled=true;
      } 
    }, error => {
      this.presentToast('Ocurrió un error :(','danger');
    });
  }

  private cargarPersonas() {
    if (this.admin) {
      this.prsService.getPersonasByHotel(this.admin.Hotel).subscribe( data => {
        this.empleados = data.personasList;
      }, error => {
        this.presentToast('No se encontraron empleados registrados :/','warning');
      });
    }
  }



    //PresentToast/ConfirmationDialog
  

    private async confirmationDialog(
      header: string,
      handler?: Function,
      dismissFunction?: Function
    ) {
      const alert = await this.alertController.create({
        header,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              this.presentToast('Operación cancelada', 'warning');
            },
          },
          {
            text: 'Confirmar',
            role: 'confirm',
            cssClass: 'primary',
            handler: () => {
              if (handler) handler();
              this.presentToast('Operación realizada', 'success');
            },
          },
        ],
      });
      alert.present();
      alert.onDidDismiss().then((respuesta) => {
        if (dismissFunction) dismissFunction(respuesta);
      });
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
