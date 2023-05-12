import { Component, ViewChild } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonSearchbar, ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { IconColor } from '../models/icon-color';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('ionBusqueda') busqueda!: IonSearchbar;
  
  enabled: boolean=false;
  admin?: Usuario;
  usrToUpdate?: Usuario; //Toma el valor del indice cuando isModalUpdate es verdadero
  validationMessages;
  formUsuario: FormGroup;
  isModalOpen = false;
  isModalUpdate = false;
  public gerentes: Usuario[] = [];
  public fGerentes: Usuario[] = [];

  constructor(
    private usrService: UsuariosService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.obtenerGerentes();

    this.formUsuario = this.fb.group({
      'IdUsuarioOK':[],
      'IdUsuarioBK':[],
      'Nombres':["", Validators.required],
      'Apellidos':["",Validators.required],
      'Hotel':["",Validators.required],
      'Rol':[],
      'Clave':[],
      'CorreoEle':["",Validators.compose([
        Validators.required,
        Validators.email
      ])],
      'Celular':["",Validators.compose([
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(10),
        Validators.pattern('[0-9]*')
      ])],
      'Generated':[],
      'Activo':[]
    });

    //HILG: Aqui definimos los mensajes de error que puedan surgir
      //      al llenar el formulario
    this.validationMessages = {
      'Nombres': [
        {type: 'required', message: 'NOMBRE requerido!'}
      ],
      'Apellidos': [
        {type: 'required', message: 'APELLIDO requerido!'}
      ],
      'Hotel': [
        {type: 'required', message: 'HOTEL requerido!'}
      ],
      'CorreoEle': [
        {type: 'required', message: 'CORREO requerido!'},
        {type: 'email', message: 'FORMATO incorrecto!'}
      ],
      'Celular': [
        {type: 'required', message: 'CELULAR requerido!'},
        {type: 'pattern', message: 'FORMATO incorrecto!'},
        {type: 'maxLength', message: 'LONGITUD invalida!'},
        {type: 'minLength', message: 'LONGITUD invalida!'}
      ]
    };
  }

  ngOnInit(): void {
    let IdUsuarioOK;
    this.activatedRoute.paramMap.subscribe((params) => {
      IdUsuarioOK = params.get('id');
    });
    IdUsuarioOK = IdUsuarioOK +'';
    this.usrService.getUsuarioItem(IdUsuarioOK,'OK').subscribe( data => {
      this.admin = data.userItem;
      console.log(this.admin);
      this.enabled=true;
    });
    
    
  }

  public filter (dato: String) {
    if (!dato.trim()) {
      this.fGerentes = this.gerentes;
      return;
    }
    this.fGerentes = this.gerentes.filter((ger) =>
      ger.Nombres.toLowerCase().includes(dato.toLowerCase())
    );
  }

  public filterGerentes(event: Event) {
    if (event instanceof CustomEvent) {
      this.filter(event.detail.value);
    }
  }

  obtenerGerentes() {
    this.usrService.getGerentes().subscribe(data => {
      this.gerentes = data.gerList;
      this.fGerentes = this.gerentes;
    }, error => {
      console.log(error);
    })
  }

  private createUser(): Usuario{
    const defaultUsr = (
      this.formUsuario.controls['Hotel'].value.replace(/\s/g, "")+'_'+
      this.formUsuario.controls['Celular'].value.substring(5,9)
    ).toLowerCase(); 
    let userToAdd: Usuario = this.formUsuario.getRawValue();
    userToAdd.IdUsuarioOK = defaultUsr;
    userToAdd.IdUsuarioBK = defaultUsr;
    userToAdd.Rol = '2';
    userToAdd.Clave = defaultUsr;
    userToAdd.Generated = true;
    userToAdd.Activo = true;
    return userToAdd;
  }//HILG

  addUser() {
    const generatedUser = this.createUser();
    this.usrService.addUser(generatedUser).subscribe( data => {
      this.presentToast('Se agregó con exito el usuario','success');
      const phoneNumber = '+52'+generatedUser.Celular;
      const message = 'Hola te saluda la asociación de Hoteles y Moteles de Tepic Nayarit para informarte '+
        'que puedes acceder a tu cuenta con el usuario: *'+generatedUser.IdUsuarioBK+'* siendo el mismo la contraseña.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, '_blank');        
      this.obtenerGerentes();

    }, error => {
      this.presentToast('Ocurrió un error en la inserción', 'danger');
      console.log(error);
    });
    this.setOpen(false,false)
  }

  deleteUser(usr: Usuario) {
    this.confirmationDialog('Estas seguro de eliminar el ', () => {
      this.usrService.deleteUser(usr).subscribe( data => {
        this.presentToast('Se eliminó con exito el usuario','success');
        this.obtenerGerentes();
      }, error => {
        this.presentToast('Ocurrió un error en la eliminación', 'danger');
        console.log(error);
      });
    });
  }

  updateUsrActivo(usr: Usuario, activo: boolean) {
    usr.Activo = activo;
    this.updateUsr(usr);
  }

  updateAllUsr(){
    if(this.usrToUpdate){
      let usr = this.usrToUpdate;
      usr.IdUsuarioBK = this.formUsuario.controls['IdUsuarioBK'].value;
      usr.Nombres = this.formUsuario.controls['Nombres'].value;
      usr.Apellidos = this.formUsuario.controls['Apellidos'].value;
      usr.Hotel = this.formUsuario.controls['Hotel'].value;
      usr.Celular = this.formUsuario.controls['Celular'].value;
      usr.CorreoEle = this.formUsuario.controls['CorreoEle'].value;
      this.updateUsr(usr);
    }
    
    
  }

  updateUsr(usr: Usuario) {
    this.usrService.updateUser(usr).subscribe( data => {
      this.presentToast('Se modificó con exito','success');
      this.obtenerGerentes();
    }, error => {
      this.presentToast('Ocurrió un error en la modificación','danger');
      console.log(error);
    });
    this.setCloseUpdateModal();
  }

  setOpen(isOpen: boolean, upOrAdd: boolean) {
    //upOrAdd: false = agregar, true = modificar
    this.isModalOpen = isOpen;
    this.isModalUpdate = upOrAdd;
    if (!isOpen && this.isModalUpdate) {
      this.setCloseUpdateModal();
    }
  }

  setClose() {
    this.setCloseUpdateModal();
    this.presentToast('Operación cancelada','danger');
  }

  setCloseUpdateModal(){
    this.usrToUpdate = undefined;
    this.isModalUpdate = true;
    this.setOpen(false,false);
    this.formUsuario.reset();
  }

  setUpdateOpen(usr: Usuario) {
    //const i = this.findUsrIndex(usr);
    this.isModalUpdate = true;
    this.usrToUpdate = usr;
    this.formUsuario.patchValue(usr);
    this.setOpen(true,true);
  }

  getIconActivo(estatus: boolean): IconColor {
    if(!estatus) return {iconName: 'close-circle', iconColor: 'danger', msj:'INACTIVO'};
    else return {iconName: 'checkmark-circle', iconColor: 'success', msj:'ACTIVO'};
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
/*
  ionViewDidEnter() {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
       this.admin = this.usrService.findUsrByIdBK(params.get('id')+'');
       if(this.admin?.Rol=='1') this.enabled = true;
      }else this.enabled = false;
    });
  }

*/
}
