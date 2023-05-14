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
import { RespuestaService } from '../services/respuesta.service';
import { Respuesta } from '../models/respuesta';


@Component({
  selector: 'app-responder',
  templateUrl: './responder.page.html',
  styleUrls: ['./responder.page.scss'],
})
export class ResponderPage implements OnInit {

  ngForm: FormGroup;

  enc: Encuesta[] = [];
  res?: Respuesta;
  constructor(
    private resService: RespuestaService,
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
    this.ngForm = this.fb.group({});
    
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const idRespuestaOK = params.get('id');
      this.cargarRespuesta(idRespuestaOK+'');
    });

    
    this.enc[0].Seccion.forEach((seccion, i) => {
      seccion.Preguntas.forEach((pregunta, j) => {
        this.ngForm.addControl(`respuesta ${i}-${j}`, this.fb.control(null));
      });
    });
    
  }

  enviarFormularios() {
    console.log(this.ngForm.value);
  }

  cargarRespuesta(idRespuestaOK: string) {
    this.resService.getRespuestaItem(idRespuestaOK).subscribe( data => {
      this.res = data.respuestaItem;
      this.encService.getEncuestaItem(data.respuestaItem.IdEncuestaOK+'').subscribe( data => {
        this.enc = data.encuestaGuiaItem;
        console.log(data);
      });
    });
  }

  

}
