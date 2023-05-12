import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonSearchbar, ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../models/persona';
import { PersonasService } from '../services/personas.service';
import { Usuario } from '../models/usuario';
import { Encuesta } from '../models/encuesta';
import { IconColor } from '../models/icon-color';
import { EncuestasService } from '../services/encuestas.service';


@Component({
  selector: 'app-responder',
  templateUrl: './responder.page.html',
  styleUrls: ['./responder.page.scss'],
})
export class ResponderPage implements OnInit {

  enc: Encuesta[] = [];
  constructor(
    private encService: EncuestasService,
    private prsService: PersonasService,
    private usrService: UsuariosService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.encService.getEncuestaItem('1').subscribe( data => {
      this.enc = data.encuestasGuiasList;
      console.log(this.enc);
    });
  }

  ngOnInit() {
    let idRespuestaOK;
    this.activatedRoute.paramMap.subscribe((params) => {
      idRespuestaOK = params.get('id');
    });
  }

}
