import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonSearchbar, ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../models/persona';
import { PersonasService } from '../services/personas.service';
import { Usuario } from '../models/usuario';
import { IconColor } from '../models/icon-color';
import { RespuestaService } from '../services/respuesta.service';
import { Respuesta } from '../models/respuesta';
import { EncuestaPersona } from '../models/encuesta-persona';


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
    private resService: RespuestaService,
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
      'Hotel': [],
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
        {type: 'maxlength', message: 'LONGITUD invalida!'},
        {type: 'minlength', message: 'LONGITUD invalida!'}
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

  

  isOpenAndUpdate(isModal: boolean, isToUpdate: boolean) {
  //HILG: isToUpdate nos vaa indicar si se va a insertar o actualizar,
    // true actualización
    // false inserción.
    if ( (!isModal && isToUpdate) || (!isModal && !isToUpdate) ) {
      this.formPersona.reset();
      this.presentToast('Operación cancelada!','danger');
      this.isModalUpdate = false;
    } else if ( isModal && !isToUpdate ) {
      this.presentToast('Llena los campos para insertar','warning');
    } else if ( isModal && isToUpdate ){
      this.presentToast('Modifica los campos para actualizar','warning');
    }

    this.isModalOpen = isModal;
    this.isModalUpdate = isToUpdate;
  }

  setPersonaToUpdate(prs: Persona) {
    this.formPersona.patchValue(prs);
    this.isOpenAndUpdate(true,true);
  }

  /*
            IdPersonaOK
            Nombres
            Apellidos
            CorreoEle
            Celular
   */
  addPersona() {
    let newPersona = this.formPersona.getRawValue();
    const defaultPersonaId = (
      this.admin?.Hotel.replace(/\s/g, "")+'_'+
      this.formPersona.controls['Apellidos'].value.replace(/\s/g, "")+
      this.formPersona.controls['Celular'].value.substring(5,9)
    ).toUpperCase();
    newPersona.IdPersonaOK = defaultPersonaId;
    newPersona.Hotel = this.admin?.Hotel;

    this.prsService.postPersonaItem(newPersona).subscribe( data => {
      if (data.success){
        this.presentToast('Persona agregada con exito', 'success');
        this.isModalOpen = false;
        this.formPersona.reset();
        this.cargarPersonas();
      } else if (!data.success){
        this.presentToast('Ocurrió un error en la inserción', 'danger');
        this.cargarPersonas();
      }
    });
  }
  
  updatePersona() {
    const prsToUpd = this.formPersona.getRawValue();
    this.confirmationDialog('Estas de modificar los datos de:  '+prsToUpd.Nombres, () => {
      this.prsService.putPersonaItem(prsToUpd.IdPersonaOK, prsToUpd).subscribe( data => {
        if (data.success) {
          this.presentToast('Persona modificada con exito', 'success');
          this.isModalOpen = false;
          this.formPersona.reset();
          this.cargarPersonas();
        } else if (!data.success){
          this.presentToast('Ocurrió un error en la modificación', 'danger');
          this.cargarPersonas();
        }
      });
    });
    
  }

  getEstatusEncuesta(prs: Persona): IconColor{
   if(prs.Encuestas){
    const encuestas = prs.Encuestas.length;
    if (encuestas <= 0) return {iconName: 'close-circle', iconColor: 'danger', msj:'Pendiente'};
    else if (encuestas >= 1 ) return {iconName: 'checkmark-circle', iconColor: 'success', msj:'Contestada'};
   }
   return {iconName: 'checkmark-circle', iconColor: 'primary', msj:'?'};
  }

  deletePersona() {
    
  }

  enviarEncuesta(prs: Persona) {
    const guia = (this.empleados.length>=50)?3:2;
    const fecha = new Date();
    const idRespuestaOK = prs.IdPersonaOK+'_'+fecha.getDay()+'_'+fecha.getMonth()+'_'+fecha.getFullYear()+'-'+1;
    const enlace = 'http://localhost:8100/responder/'+idRespuestaOK;

    let respuesta: Respuesta = {
      IdRespuestaOK: idRespuestaOK,
      IdPersonaOK: prs.IdPersonaOK,
      IdEncuestaOK: '1',
      IdUsuarioOK: this.admin?.IdUsuarioOK+'',
      Hotel: this.admin?.Hotel+'',
      Contestada: false,
      Enlace: enlace,
      Puntuacion: 0
    };
    let encuesta1: EncuestaPersona = {
      IdRespuestaOK: idRespuestaOK,
      Enlace: enlace,
      IdEncuestaOK: '1',
      Contestada: false,
      Fecha: fecha
    };

    this.resService.postRespuestaItem(respuesta).subscribe( data => {

      this.presentToast('Encuesta enviada con exito','success');
      this.prsService.pushEncuestaItem(prs.IdPersonaOK, idRespuestaOK, encuesta1).subscribe( data => {
        console.log(data);
      });
      const phoneNumber = '+52'+prs.Celular;
      const message = 'Hola por este medio te hacemos llegar la encuesta del hotel '+prs.Hotel+
        ' la cual la encontrarás en el siguiente enlace: '+enlace;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, '_blank');   
    });

    const idRespuestaOK2 = prs.IdPersonaOK+'_'+fecha.getDay()+'_'+fecha.getMonth()+'_'+fecha.getFullYear()+'-'+guia;
    const enlace2 = 'http://localhost:8100/responder/'+idRespuestaOK;

    let respuesta2: Respuesta = {
      IdRespuestaOK: idRespuestaOK,
      IdPersonaOK: prs.IdPersonaOK,
      IdEncuestaOK: '1',
      IdUsuarioOK: this.admin?.IdUsuarioOK+'',
      Hotel: this.admin?.Hotel+'',
      Contestada: false,
      Enlace: enlace,
      Puntuacion: 0
    };

    let encuesta2: EncuestaPersona = {
      IdRespuestaOK: idRespuestaOK2,
      Enlace: enlace2,
      IdEncuestaOK: guia+'',
      Contestada: false,
      Fecha: fecha
    };

    this.resService.postRespuestaItem(respuesta2).subscribe( data => {
      this.presentToast('Encuesta enviada con exito','success');
      const phoneNumber = '+52'+prs.Celular;
      const message = 'Hola por este medio te hacemos llegar la encuesta del hotel '+prs.Hotel+
        ' la cual la encontrarás en el siguiente enlace: '+enlace2;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, '_blank');   
    });
    this.cargarPersonas();

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
      this.cargarPersonas();
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
