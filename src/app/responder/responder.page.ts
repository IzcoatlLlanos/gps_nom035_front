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
import { Seccion } from '../models/seccion';
import { EncuestaPersona } from '../models/encuesta-persona';


@Component({
  selector: 'app-responder',
  templateUrl: './responder.page.html',
  styleUrls: ['./responder.page.scss'],
})
export class ResponderPage implements OnInit {

  prs?: Persona;
  res?: Respuesta;
  validationMessages;

  guia1: FormGroup;
  guia2: FormGroup;
  guia3: FormGroup;
  
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
    this.guia1 = this.fb.group({
      '1_1':['',Validators.required],

      '2_1':['',Validators.required],
      '2_2':['',Validators.required],

      '3_1':['',Validators.required],
      '3_2':['',Validators.required],
      '3_3':['',Validators.required],
      '3_4':['',Validators.required],
      '3_5':['',Validators.required],
      '3_6':['',Validators.required],
      '3_7':['',Validators.required],

      '4_1':['',Validators.required],
      '4_2':['',Validators.required],
      '4_3':['',Validators.required],
      '4_4':['',Validators.required],
      '4_5':['',Validators.required],
    });

    this.guia2 = this.fb.group({
      '1_1':['',Validators.required],
      '1_2':['',Validators.required],
      '1_3':['',Validators.required],
      '1_4':['',Validators.required],
      '1_5':['',Validators.required],
      '1_6':['',Validators.required],
      '1_7':['',Validators.required],
      '1_8':['',Validators.required],
      '1_9':['',Validators.required],
      '1_10':['',Validators.required],
      '1_11':['',Validators.required],
      '1_12':['',Validators.required],
      '1_13':['',Validators.required],
      '1_14':['',Validators.required],
      '1_15':['',Validators.required],
      '1_16':['',Validators.required],
      '1_17':['',Validators.required],
      '1_18':['',Validators.required],
      '1_19':['',Validators.required],
      '1_20':['',Validators.required],
      '1_21':['',Validators.required],
      '1_22':['',Validators.required],
      '1_23':['',Validators.required],
      '1_24':['',Validators.required],
      '1_25':['',Validators.required],
      '1_26':['',Validators.required],
      '1_27':['',Validators.required],
      '1_28':['',Validators.required],
      '1_29':['',Validators.required],

      '2_1':['',Validators.required],
      '2_2':['',Validators.required],
      '2_3':['',Validators.required],
      '2_4':['',Validators.required],
      '2_5':['',Validators.required],
      '2_6':['',Validators.required],
      '2_7':['',Validators.required],
      '2_8':['',Validators.required],
      '2_9':['',Validators.required],
      '2_10':['',Validators.required],
      '2_11':['',Validators.required],
      '2_12':['',Validators.required],
      '2_13':['',Validators.required],
      '2_14':['',Validators.required],
      '2_15':['',Validators.required],
      '2_16':['',Validators.required],
   });

   this.guia3 = this.fb.group({
    '1_1':['',Validators.required],
    '1_2':['',Validators.required],
    '1_3':['',Validators.required],
    '1_4':['',Validators.required],
    '1_5':['',Validators.required],
    '1_6':['',Validators.required],
    '1_7':['',Validators.required],
    '1_8':['',Validators.required],
    '1_9':['',Validators.required],
    '1_10':['',Validators.required],
    '1_11':['',Validators.required],
    '1_12':['',Validators.required],
    '1_13':['',Validators.required],
    '1_14':['',Validators.required],
    '1_15':['',Validators.required],
    '1_16':['',Validators.required],
    '1_17':['',Validators.required],
    '1_18':['',Validators.required],
    '1_19':['',Validators.required],
    '1_20':['',Validators.required],
    '1_21':['',Validators.required],
    '1_22':['',Validators.required],
    '1_23':['',Validators.required],
    '1_24':['',Validators.required],
    '1_25':['',Validators.required],
    '1_26':['',Validators.required],
    '1_27':['',Validators.required],
    '1_28':['',Validators.required],
    '1_29':['',Validators.required],
    '1_30':['',Validators.required],
    '1_31':['',Validators.required],
    '1_32':['',Validators.required],
    '1_33':['',Validators.required],
    '1_34':['',Validators.required],

    '2_1':['',Validators.required],
    '2_2':['',Validators.required],
    '2_3':['',Validators.required],
    '2_4':['',Validators.required],
    '2_5':['',Validators.required],
    '2_6':['',Validators.required],
    '2_7':['',Validators.required],
    '2_8':['',Validators.required],
    '2_9':['',Validators.required],
    '2_10':['',Validators.required],
    '2_11':['',Validators.required],
    '2_12':['',Validators.required],
    '2_13':['',Validators.required],
    '2_14':['',Validators.required],
    '2_15':['',Validators.required],
    '2_16':['',Validators.required],
    '2_17':['',Validators.required],
    '2_18':['',Validators.required],
    '2_19':['',Validators.required],
    '2_20':['',Validators.required],
    '2_21':['',Validators.required],
    '2_22':['',Validators.required],
    '2_23':['',Validators.required],
    '2_24':['',Validators.required],
    '2_25':['',Validators.required],
    '2_26':['',Validators.required],
    '2_27':['',Validators.required],
    '2_28':['',Validators.required],
    '2_29':['',Validators.required],
    '2_30':['',Validators.required],
    '2_31':['',Validators.required],
    '2_32':['',Validators.required],
    '2_33':['',Validators.required],
    '2_34':['',Validators.required],
    '2_35':['',Validators.required],
    '2_36':['',Validators.required],
    '2_37':['',Validators.required],
 });
 

    this.validationMessages = {
      'general': [
        {type: 'required', message: 'Respuesta Requerida!'}
      ],
      
    }
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const idRespuestaOK = params.get('id');
      this.cargarRespuesta(idRespuestaOK+'');
    });  
    
  }


  cargarRespuesta(idRespuestaOK: string) {
    this.resService.getRespuestaItem(idRespuestaOK).subscribe( data => {
      this.res = data.respuestaItem;
      this.prsService.getPersonaItem(this.res?.IdPersonaOK+'').subscribe( data => {
        this.prs = data.personaItem[0];
      });
    });
  }

  obtenerPuntaje(valor: string, ceroCuatro: boolean): number{
    if (ceroCuatro) {
      switch (valor){
        case 'SIEMPRE':
          return 4;
          break;
        case 'CASI SIEMPRE':
          return 3;
          break;
        case 'ALGUNAS VECES':
          return 2;
          break;
        case 'CASI NUNCA':
          return 1;
          break;
        case 'NUNCA':
          return 0;
          break;
      }
    } else if (!ceroCuatro) {
      switch (valor){
        case 'SIEMPRE':
          return 0;
          break;
        case 'CASI SIEMPRE':
          return 1;
          break;
        case 'ALGUNAS VECES':
          return 2;
          break;
        case 'CASI NUNCA':
          return 3;
          break;
        case 'NUNCA':
          return 4;
          break;
      }
    }
    return 0;
  }
  
  enviarGuia_1() {

    const resSeccion1: number = (this.guia1.controls['1_1'].value=='SI')?1:0;
    let seccion_1: Seccion = {
      IdSeccionOK:  '1_1',
      Nombre:       'Acontecimiento traumatico severo',
      Tipo:         'SI-NO',
      Resultado:    resSeccion1,
      Respuestas: [
        {
          IdPreguntaOK: '1',
          Respuesta:    this.guia1.controls['1_1'].value,
          Valor:        (this.guia1.controls['1_1'].value=='SI')?1:0
        }
      ]
    };
    const resSeccion2: number = ((this.guia1.controls['2_1'].value=='SI')?1:0)+
                                ((this.guia1.controls['2_2'].value=='SI')?1:0);
    let seccion_2: Seccion = {
      IdSeccionOK:  '1_2',
      Nombre:       'Recuerdos persistentes sobre el acontecimiento',
      Tipo:         'SI-NO',
      Resultado:    resSeccion2,
      Respuestas: [
        {
          IdPreguntaOK: '2',
          Respuesta:    this.guia1.controls['2_1'].value,
          Valor:        (this.guia1.controls['2_1'].value=='SI')?1:0
        },
        {
          IdPreguntaOK: '3',
          Respuesta:    this.guia1.controls['2_2'].value,
          Valor:        (this.guia1.controls['2_2'].value=='SI')?1:0
        }
      ]
    };

    const resSeccion3 = ((this.guia1.controls['3_1'].value=='SI')?1:0)+((this.guia1.controls['3_2'].value=='SI')?1:0)+
                        ((this.guia1.controls['3_3'].value=='SI')?1:0)+((this.guia1.controls['3_4'].value=='SI')?1:0)+
                        ((this.guia1.controls['3_5'].value=='SI')?1:0)+((this.guia1.controls['3_6'].value=='SI')?1:0)+
                        ((this.guia1.controls['3_7'].value=='SI')?1:0);
    let seccion_3: Seccion = {
      IdSeccionOK:  '1_3',
      Nombre:       'Esfuerzo por evitar circunstancias parecidas o asociadas al acontecimiento ',
      Tipo:         'SI-NO',
      Resultado:    resSeccion3,
      Respuestas: [
        {
          IdPreguntaOK: '4',
          Respuesta:    this.guia1.controls['3_1'].value,
          Valor:        (this.guia1.controls['3_1'].value=='SI')?1:0
        },
        {
          IdPreguntaOK: '5',
          Respuesta:    this.guia1.controls['3_2'].value,
          Valor:        (this.guia1.controls['3_2'].value=='SI')?1:0
        },
        {
          IdPreguntaOK: '6',
          Respuesta:    this.guia1.controls['3_3'].value,
          Valor:        (this.guia1.controls['3_3'].value=='SI')?1:0
        },
        {
          IdPreguntaOK: '7',
          Respuesta:    this.guia1.controls['3_4'].value,
          Valor:        (this.guia1.controls['3_4'].value=='SI')?1:0
        },
        {
          IdPreguntaOK: '8',
          Respuesta:    this.guia1.controls['3_5'].value,
          Valor:        (this.guia1.controls['3_5'].value=='SI')?1:0
        },
        {
          IdPreguntaOK: '9',
          Respuesta:    this.guia1.controls['3_6'].value,
          Valor:        (this.guia1.controls['3_6'].value=='SI')?1:0
        },
        {
          IdPreguntaOK: '10',
          Respuesta:    this.guia1.controls['3_7'].value,
          Valor:        (this.guia1.controls['3_7'].value=='SI')?1:0
        }
      ]
    };

    const resSeccion4: number =((this.guia1.controls['4_1'].value=='SI')?1:0)+((this.guia1.controls['4_2'].value=='SI')?1:0)+
                              ((this.guia1.controls['4_3'].value=='SI')?1:0)+((this.guia1.controls['4_4'].value=='SI')?1:0)+
                              ((this.guia1.controls['4_5'].value=='SI')?1:0);
    let seccion_4: Seccion = {
      IdSeccionOK:  '1_4',
      Nombre:       'Afectacion ',
      Tipo:         'SI-NO',
      Resultado:    resSeccion4,
      Respuestas: [
        {
          IdPreguntaOK: '11',
          Respuesta:    this.guia1.controls['4_1'].value,
          Valor:        (this.guia1.controls['4_1'].value=='SI')?1:0
        },
        {
          IdPreguntaOK: '12',
          Respuesta:    this.guia1.controls['4_2'].value,
          Valor:        (this.guia1.controls['4_2'].value=='SI')?1:0
        },
        {
          IdPreguntaOK: '13',
          Respuesta:    this.guia1.controls['4_3'].value,
          Valor:        (this.guia1.controls['4_3'].value=='SI')?1:0
        },
        {
          IdPreguntaOK: '14',
          Respuesta:    this.guia1.controls['4_4'].value,
          Valor:        (this.guia1.controls['4_4'].value=='SI')?1:0
        },
        {
          IdPreguntaOK: '15',
          Respuesta:    this.guia1.controls['4_5'].value,
          Valor:        (this.guia1.controls['4_5'].value=='SI')?1:0
        }
      ]
    };

    const idRespuestaOK = this.res?.IdRespuestaOK+'';

    const encuestaPersona1: EncuestaPersona ={
      IdRespuestaOK : idRespuestaOK,
      Enlace        : 'http://localhost:8100/responder/'+idRespuestaOK,
      IdEncuestaOK  : '1',
      Contestada    : true,
      Fecha         : new Date()
    };

    

      if (this.res){
        this.res.Contestada=true;
        this.res.Puntuacion = resSeccion1 + resSeccion2 + resSeccion3 + resSeccion4;
        this.resService.putRespuestaItem(this.res?.IdRespuestaOK+'',this.res).subscribe( data => {
          this.presentToast('Encuesta contestada con exito', 'success');
        
    
          this.resService.pushRespuestaSeccionItem(idRespuestaOK,seccion_1.IdSeccionOK,seccion_1).subscribe( data => {
            console.log(data);
            this.resService.pushRespuestaSeccionItem(idRespuestaOK,seccion_2.IdSeccionOK,seccion_2).subscribe( data => {
              console.log(data);
              this.resService.pushRespuestaSeccionItem(idRespuestaOK,seccion_3.IdSeccionOK,seccion_3).subscribe( data => {
                console.log(data);
                this.resService.pushRespuestaSeccionItem(idRespuestaOK,seccion_4.IdSeccionOK,seccion_4).subscribe( data => {
                  console.log(data);
                  this.prsService.pushEncuestaItem(this.res.IdPersonaOK+'',idRespuestaOK,encuestaPersona1).subscribe( data => {
                    console.log(data);
                  });
                });
              });
            });
          });
        });
      }
    
  }
  
  enviarGuia_2() {
    
    const puntajeSeccion1 = this.obtenerPuntaje(this.guia2.controls['1_1'].value,true)+this.obtenerPuntaje(this.guia2.controls['1_2'].value,true)+
                            this.obtenerPuntaje(this.guia2.controls['1_3'].value,true)+this.obtenerPuntaje(this.guia2.controls['1_4'].value,true)+
                            this.obtenerPuntaje(this.guia2.controls['1_5'].value,true)+this.obtenerPuntaje(this.guia2.controls['1_6'].value,true)+
                            this.obtenerPuntaje(this.guia2.controls['1_7'].value,true)+this.obtenerPuntaje(this.guia2.controls['1_8'].value,true)+
                            this.obtenerPuntaje(this.guia2.controls['1_9'].value,true)+this.obtenerPuntaje(this.guia2.controls['1_10'].value,true)+
                            this.obtenerPuntaje(this.guia2.controls['1_11'].value,true)+this.obtenerPuntaje(this.guia2.controls['1_12'].value,true)+
                            this.obtenerPuntaje(this.guia2.controls['1_13'].value,true)+this.obtenerPuntaje(this.guia2.controls['1_14'].value,true)+
                            this.obtenerPuntaje(this.guia2.controls['1_15'].value,true)+this.obtenerPuntaje(this.guia2.controls['1_16'].value,true)+
                            this.obtenerPuntaje(this.guia2.controls['1_17'].value,true)+this.obtenerPuntaje(this.guia2.controls['1_18'].value,true)+
                            this.obtenerPuntaje(this.guia2.controls['1_19'].value,true)+this.obtenerPuntaje(this.guia2.controls['1_20'].value,true)+
                            this.obtenerPuntaje(this.guia2.controls['1_21'].value,true)+this.obtenerPuntaje(this.guia2.controls['1_22'].value,true)+
                            this.obtenerPuntaje(this.guia2.controls['1_23'].value,true)+this.obtenerPuntaje(this.guia2.controls['1_24'].value,true)+
                            this.obtenerPuntaje(this.guia2.controls['1_25'].value,true)+this.obtenerPuntaje(this.guia2.controls['1_26'].value,true)+
                            this.obtenerPuntaje(this.guia2.controls['1_27'].value,true)+this.obtenerPuntaje(this.guia2.controls['1_28'].value,true)+
                            this.obtenerPuntaje(this.guia2.controls['1_29'].value,true);
    let seccion_1: Seccion = {
      IdSeccionOK:  '2_1',
      Nombre:       'Abiente de trabajo',
      Tipo:         '0-4',
      Resultado:    puntajeSeccion1,
      Respuestas: [
        {
          IdPreguntaOK: '1',
          Respuesta:    this.guia2.controls['1_1'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_1'].value,true)
        },
        {
          IdPreguntaOK: '2',
          Respuesta:    this.guia2.controls['1_2'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_2'].value,true)
        }
        ,
        {
          IdPreguntaOK: '3',
          Respuesta:    this.guia2.controls['1_3'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_3'].value,true)
        },
        {
          IdPreguntaOK: '4',
          Respuesta:    this.guia2.controls['1_4'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_4'].value,true)
        },
        {
          IdPreguntaOK: '5',
          Respuesta:    this.guia2.controls['1_5'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_5'].value,true)
        },
        {
          IdPreguntaOK: '6',
          Respuesta:    this.guia2.controls['1_6'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_6'].value,true)
        },
        {
          IdPreguntaOK: '7',
          Respuesta:    this.guia2.controls['1_7'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_7'].value,true)
        },
        {
          IdPreguntaOK: '8',
          Respuesta:    this.guia2.controls['1_8'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_8'].value,true)
        },
        {
          IdPreguntaOK: '9',
          Respuesta:    this.guia2.controls['1_9'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_9'].value,true)
        },
        {
          IdPreguntaOK: '10',
          Respuesta:    this.guia2.controls['1_10'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_10'].value,true)
        },
        {
          IdPreguntaOK: '11',
          Respuesta:    this.guia2.controls['1_11'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_11'].value,true)
        },
        {
          IdPreguntaOK: '12',
          Respuesta:    this.guia2.controls['1_12'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_12'].value,true)
        },
        {
          IdPreguntaOK: '13',
          Respuesta:    this.guia2.controls['1_13'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_13'].value,true)
        },
        {
          IdPreguntaOK: '14',
          Respuesta:    this.guia2.controls['1_14'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_14'].value,true)
        },
        {
          IdPreguntaOK: '15',
          Respuesta:    this.guia2.controls['1_15'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_15'].value,true)
        },
        {
          IdPreguntaOK: '16',
          Respuesta:    this.guia2.controls['1_16'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_16'].value,true)
        },
        {
          IdPreguntaOK: '17',
          Respuesta:    this.guia2.controls['1_17'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_17'].value,true)
        },
        {
          IdPreguntaOK: '34',
          Respuesta:    this.guia2.controls['1_18'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_18'].value,true)
        },
        {
          IdPreguntaOK: '35',
          Respuesta:    this.guia2.controls['1_19'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_19'].value,true)
        },
        {
          IdPreguntaOK: '36',
          Respuesta:    this.guia2.controls['1_20'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_20'].value,true)
        },
        {
          IdPreguntaOK: '37',
          Respuesta:    this.guia2.controls['1_21'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_21'].value,true)
        },
        {
          IdPreguntaOK: '38',
          Respuesta:    this.guia2.controls['1_22'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_22'].value,true)
        },
        {
          IdPreguntaOK: '39',
          Respuesta:    this.guia2.controls['1_23'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_23'].value,true)
        },
        {
          IdPreguntaOK: '40',
          Respuesta:    this.guia2.controls['1_24'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_24'].value,true)
        },
        {
          IdPreguntaOK: '41',
          Respuesta:    this.guia2.controls['1_25'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_25'].value,true)
        },
        {
          IdPreguntaOK: '42',
          Respuesta:    this.guia2.controls['1_26'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_26'].value,true)
        },
        {
          IdPreguntaOK: '43',
          Respuesta:    this.guia2.controls['1_27'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_27'].value,true)
        },
        {
          IdPreguntaOK: '44',
          Respuesta:    this.guia2.controls['1_28'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_28'].value,true)
        },
        {
          IdPreguntaOK: '45',
          Respuesta:    this.guia2.controls['1_29'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['1_29'].value,true)
        }
        
      ]
    };

    const puntajeSeccion2 = this.obtenerPuntaje(this.guia2.controls['2_1'].value,false)+this.obtenerPuntaje(this.guia2.controls['2_2'].value,false)+
                            this.obtenerPuntaje(this.guia2.controls['2_3'].value,false)+this.obtenerPuntaje(this.guia2.controls['2_4'].value,false)+
                            this.obtenerPuntaje(this.guia2.controls['2_5'].value,false)+this.obtenerPuntaje(this.guia2.controls['2_6'].value,false)+
                            this.obtenerPuntaje(this.guia2.controls['2_7'].value,false)+this.obtenerPuntaje(this.guia2.controls['2_8'].value,false)+
                            this.obtenerPuntaje(this.guia2.controls['2_9'].value,false)+this.obtenerPuntaje(this.guia2.controls['2_10'].value,false)+
                            this.obtenerPuntaje(this.guia2.controls['2_11'].value,false)+this.obtenerPuntaje(this.guia2.controls['2_12'].value,false)+
                            this.obtenerPuntaje(this.guia2.controls['2_13'].value,false)+this.obtenerPuntaje(this.guia2.controls['2_14'].value,false)+
                            this.obtenerPuntaje(this.guia2.controls['2_15'].value,false)+this.obtenerPuntaje(this.guia2.controls['2_16'].value,false);

    let seccion_2: Seccion = {
      IdSeccionOK:  '3_2',
      Nombre:       'Segunda seccion',
      Tipo:         '4-0',
      Resultado:    puntajeSeccion2,
      Respuestas: [
        {
          IdPreguntaOK: '18',
          Respuesta:    this.guia2.controls['2_1'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['2_1'].value,false)
        },
        {
          IdPreguntaOK: '19',
          Respuesta:    this.guia2.controls['2_2'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['2_2'].value,false)
        }
        ,
        {
          IdPreguntaOK: '20',
          Respuesta:    this.guia2.controls['2_3'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['2_3'].value,false)
        },
        {
          IdPreguntaOK: '21',
          Respuesta:    this.guia2.controls['2_4'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['2_4'].value,false)
        },
        {
          IdPreguntaOK: '22',
          Respuesta:    this.guia2.controls['2_5'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['2_5'].value,false)
        },
        {
          IdPreguntaOK: '23',
          Respuesta:    this.guia2.controls['2_6'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['2_6'].value,false)
        },
        {
          IdPreguntaOK: '24',
          Respuesta:    this.guia2.controls['2_7'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['2_7'].value,false)
        },
        {
          IdPreguntaOK: '25',
          Respuesta:    this.guia2.controls['2_8'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['2_8'].value,false)
        },
        {
          IdPreguntaOK: '26',
          Respuesta:    this.guia2.controls['2_9'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['2_9'].value,false)
        },
        {
          IdPreguntaOK: '27',
          Respuesta:    this.guia2.controls['2_10'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['2_10'].value,false)
        },
        {
          IdPreguntaOK: '28',
          Respuesta:    this.guia2.controls['2_11'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['2_11'].value,false)
        },
        {
          IdPreguntaOK: '29',
          Respuesta:    this.guia2.controls['2_12'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['2_12'].value,false)
        },
        {
          IdPreguntaOK: '30',
          Respuesta:    this.guia2.controls['2_13'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['2_13'].value,false)
        },
        {
          IdPreguntaOK: '31',
          Respuesta:    this.guia2.controls['2_14'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['2_14'].value,false)
        },
        {
          IdPreguntaOK: '32',
          Respuesta:    this.guia2.controls['2_15'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['2_15'].value,false)
        },
        {
          IdPreguntaOK: '33',
          Respuesta:    this.guia2.controls['2_16'].value,
          Valor:        this.obtenerPuntaje(this.guia2.controls['2_16'].value,false)
        }
      ]
    };

    const idRespuestaOK = this.res.IdRespuestaOK+'';

    const encuestaPersona2: EncuestaPersona ={
      IdRespuestaOK : idRespuestaOK,
      Enlace        : 'http://localhost:8100/responder/'+idRespuestaOK,
      IdEncuestaOK  : '2',
      Contestada    : true,
      Fecha         : new Date()
    };

    if (this.res) {
      this.res.Contestada = true;
      this.res.Puntuacion = puntajeSeccion1 + puntajeSeccion2;
      this.resService.putRespuestaItem(this.res?.IdRespuestaOK,this.res).subscribe( data => {
        console.log(data);
        this.presentToast('Encuesta Contestada con exito', 'success');
        this.resService.pushRespuestaSeccionItem(this.res?.IdRespuestaOK+'',seccion_1.IdSeccionOK,seccion_1).subscribe( data => {
          console.log(data);
          this.resService.pushRespuestaSeccionItem(this.res?.IdRespuestaOK+'',seccion_2.IdSeccionOK,seccion_2).subscribe( data => {
            console.log(data);
            this.prsService.pushEncuestaItem(this.res.IdPersonaOK+'',idRespuestaOK,encuestaPersona2).subscribe( data => {
              console.log(data);
            });
          });
        });
      });
    }
  }


  enviarGuia_3(){
      const puntajeSeccion1 =   this.obtenerPuntaje(this.guia3.controls['1_1'].value,true)+ this.obtenerPuntaje(this.guia3.controls['1_2'].value,true)+
                                this.obtenerPuntaje(this.guia3.controls['1_3'].value,true)+ this.obtenerPuntaje(this.guia3.controls['1_4'].value,true)+
                                this.obtenerPuntaje(this.guia3.controls['1_5'].value,true)+ this.obtenerPuntaje(this.guia3.controls['1_6'].value,true)+
                                this.obtenerPuntaje(this.guia3.controls['1_7'].value,true)+ this.obtenerPuntaje(this.guia3.controls['1_8'].value,true)+
                                this.obtenerPuntaje(this.guia3.controls['1_9'].value,true)+ this.obtenerPuntaje(this.guia3.controls['1_10'].value,true)+
                                this.obtenerPuntaje(this.guia3.controls['1_11'].value,true)+this.obtenerPuntaje(this.guia3.controls['1_12'].value,true)+
                                this.obtenerPuntaje(this.guia3.controls['1_13'].value,true)+this.obtenerPuntaje(this.guia3.controls['1_14'].value,true)+
                                this.obtenerPuntaje(this.guia3.controls['1_15'].value,true)+this.obtenerPuntaje(this.guia3.controls['1_16'].value,true)+
                                this.obtenerPuntaje(this.guia3.controls['1_17'].value,true)+this.obtenerPuntaje(this.guia3.controls['1_18'].value,true)+
                                this.obtenerPuntaje(this.guia3.controls['1_19'].value,true)+this.obtenerPuntaje(this.guia3.controls['1_20'].value,true)+
                                this.obtenerPuntaje(this.guia3.controls['1_21'].value,true)+this.obtenerPuntaje(this.guia3.controls['1_22'].value,true)+
                                this.obtenerPuntaje(this.guia3.controls['1_23'].value,true)+this.obtenerPuntaje(this.guia3.controls['1_24'].value,true)+
                                this.obtenerPuntaje(this.guia3.controls['1_25'].value,true)+this.obtenerPuntaje(this.guia3.controls['1_26'].value,true)+
                                this.obtenerPuntaje(this.guia3.controls['1_27'].value,true)+this.obtenerPuntaje(this.guia3.controls['1_28'].value,true)+
                                this.obtenerPuntaje(this.guia3.controls['1_29'].value,true)+this.obtenerPuntaje(this.guia3.controls['1_30'].value,true)+
                                this.obtenerPuntaje(this.guia3.controls['1_31'].value,true)+this.obtenerPuntaje(this.guia3.controls['1_32'].value,true)+
                                this.obtenerPuntaje(this.guia3.controls['1_33'].value,true)+this.obtenerPuntaje(this.guia3.controls['1_34'].value,true);
    let seccion_1: Seccion = {
      IdSeccionOK:  '3_1',
      Nombre:       'Primera seccion',
      Tipo:         '0-4',
      Resultado:    puntajeSeccion1,
      Respuestas: [
        {
          IdPreguntaOK: '1',
          Respuesta:    this.guia3.controls['1_1'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_1'].value,true)
        },
        {
          IdPreguntaOK: '4',
          Respuesta:    this.guia3.controls['1_2'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_2'].value,true)
        }
        ,
        {
          IdPreguntaOK: '23',
          Respuesta:    this.guia3.controls['1_3'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_3'].value,true)
        },
        {
          IdPreguntaOK: '24',
          Respuesta:    this.guia3.controls['1_4'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_4'].value,true)
        },
        {
          IdPreguntaOK: '25',
          Respuesta:    this.guia3.controls['1_5'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_5'].value,true)
        },
        {
          IdPreguntaOK: '26',
          Respuesta:    this.guia3.controls['1_6'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_6'].value,true)
        },
        {
          IdPreguntaOK: '27',
          Respuesta:    this.guia3.controls['1_7'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_7'].value,true)
        },
        {
          IdPreguntaOK: '28',
          Respuesta:    this.guia3.controls['1_8'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_8'].value,true)
        },
        {
          IdPreguntaOK: '30',
          Respuesta:    this.guia3.controls['1_9'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_9'].value,true)
        },
        {
          IdPreguntaOK: '31',
          Respuesta:    this.guia3.controls['1_10'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_10'].value,true)
        },
        {
          IdPreguntaOK: '32',
          Respuesta:    this.guia3.controls['1_11'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_11'].value,true)
        },
        {
          IdPreguntaOK: '33',
          Respuesta:    this.guia3.controls['1_12'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_12'].value,true)
        },
        {
          IdPreguntaOK: '34',
          Respuesta:    this.guia3.controls['1_13'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_13'].value,true)
        },
        {
          IdPreguntaOK: '35',
          Respuesta:    this.guia3.controls['1_14'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_14'].value,true)
        },
        {
          IdPreguntaOK: '36',
          Respuesta:    this.guia3.controls['1_15'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_15'].value,true)
        },
        {
          IdPreguntaOK: '37',
          Respuesta:    this.guia3.controls['1_16'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_16'].value,true)
        },
        {
          IdPreguntaOK: '38',
          Respuesta:    this.guia3.controls['1_17'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_17'].value,true)
        },
        {
          IdPreguntaOK: '39',
          Respuesta:    this.guia3.controls['1_18'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_18'].value,true)
        },
        {
          IdPreguntaOK: '40',
          Respuesta:    this.guia3.controls['1_19'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_19'].value,true)
        },
        {
          IdPreguntaOK: '42',
          Respuesta:    this.guia3.controls['1_20'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_20'].value,true)
        },
        {
          IdPreguntaOK: '43',
          Respuesta:    this.guia3.controls['1_21'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_21'].value,true)
        },
        {
          IdPreguntaOK: '44',
          Respuesta:    this.guia3.controls['1_22'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_22'].value,true)
        },
        {
          IdPreguntaOK: '45',
          Respuesta:    this.guia3.controls['1_23'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_23'].value,true)
        },
        {
          IdPreguntaOK: '46',
          Respuesta:    this.guia3.controls['1_24'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_24'].value,true)
        },
        {
          IdPreguntaOK: '47',
          Respuesta:    this.guia3.controls['1_25'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_25'].value,true)
        },
        {
          IdPreguntaOK: '48',
          Respuesta:    this.guia3.controls['1_26'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_26'].value,true)
        },
        {
          IdPreguntaOK: '49',
          Respuesta:    this.guia3.controls['1_27'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_27'].value,true)
        },
        {
          IdPreguntaOK: '50',
          Respuesta:    this.guia3.controls['1_28'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_28'].value,true)
        },
        {
          IdPreguntaOK: '51',
          Respuesta:    this.guia3.controls['1_29'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_29'].value,true)
        },
        {
          IdPreguntaOK: '52',
          Respuesta:    this.guia3.controls['1_30'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_30'].value,true)
        },
        {
          IdPreguntaOK: '55',
          Respuesta:    this.guia3.controls['1_31'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_31'].value,true)
        },
        {
          IdPreguntaOK: '56',
          Respuesta:    this.guia3.controls['1_32'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_32'].value,true)
        },
        {
          IdPreguntaOK: '53',
          Respuesta:    this.guia3.controls['1_33'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_33'].value,true)
        },
        {
          IdPreguntaOK: '57',
          Respuesta:    this.guia3.controls['1_34'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['1_34'].value,true)
        }
        
      ]
    };

    const puntajeSeccion2 =     this.obtenerPuntaje(this.guia3.controls['2_1'].value,false)+ this.obtenerPuntaje(this.guia3.controls['2_2'].value,false)+ 
                                this.obtenerPuntaje(this.guia3.controls['2_3'].value,false)+ this.obtenerPuntaje(this.guia3.controls['2_4'].value,false)+ 
                                this.obtenerPuntaje(this.guia3.controls['2_5'].value,false)+ this.obtenerPuntaje(this.guia3.controls['2_6'].value,false)+ 
                                this.obtenerPuntaje(this.guia3.controls['2_7'].value,false)+ this.obtenerPuntaje(this.guia3.controls['2_8'].value,false)+ 
                                this.obtenerPuntaje(this.guia3.controls['2_9'].value,false)+ this.obtenerPuntaje(this.guia3.controls['2_10'].value,false)+ 
                                this.obtenerPuntaje(this.guia3.controls['2_11'].value,false)+this.obtenerPuntaje(this.guia3.controls['2_12'].value,false)+ 
                                this.obtenerPuntaje(this.guia3.controls['2_13'].value,false)+this.obtenerPuntaje(this.guia3.controls['2_14'].value,false)+ 
                                this.obtenerPuntaje(this.guia3.controls['2_15'].value,false)+this.obtenerPuntaje(this.guia3.controls['2_16'].value,false)+ 
                                this.obtenerPuntaje(this.guia3.controls['2_17'].value,false)+this.obtenerPuntaje(this.guia3.controls['2_18'].value,false)+ 
                                this.obtenerPuntaje(this.guia3.controls['2_19'].value,false)+this.obtenerPuntaje(this.guia3.controls['2_20'].value,false)+ 
                                this.obtenerPuntaje(this.guia3.controls['2_21'].value,false)+this.obtenerPuntaje(this.guia3.controls['2_22'].value,false)+ 
                                this.obtenerPuntaje(this.guia3.controls['2_23'].value,false)+this.obtenerPuntaje(this.guia3.controls['2_24'].value,false)+ 
                                this.obtenerPuntaje(this.guia3.controls['2_25'].value,false)+this.obtenerPuntaje(this.guia3.controls['2_26'].value,false)+ 
                                this.obtenerPuntaje(this.guia3.controls['2_27'].value,false)+this.obtenerPuntaje(this.guia3.controls['2_28'].value,false)+ 
                                this.obtenerPuntaje(this.guia3.controls['2_29'].value,false)+this.obtenerPuntaje(this.guia3.controls['2_30'].value,false)+ 
                                this.obtenerPuntaje(this.guia3.controls['2_31'].value,false)+this.obtenerPuntaje(this.guia3.controls['2_32'].value,false)+ 
                                this.obtenerPuntaje(this.guia3.controls['2_33'].value,false)+this.obtenerPuntaje(this.guia3.controls['2_34'].value,false); 
    let seccion_2: Seccion = {
      IdSeccionOK:  '3_2',
      Nombre:       'Segunda seccion',
      Tipo:         '4-0',
      Resultado:    puntajeSeccion2,
      Respuestas: [
        {
          IdPreguntaOK: '2',
          Respuesta:    this.guia3.controls['2_1'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_1'].value,false)
        },
        {
          IdPreguntaOK: '3',
          Respuesta:    this.guia3.controls['2_2'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_2'].value,false)
        }
        ,
        {
          IdPreguntaOK: '5',
          Respuesta:    this.guia3.controls['2_3'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_3'].value,false)
        },
        {
          IdPreguntaOK: '6',
          Respuesta:    this.guia3.controls['2_4'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_4'].value,false)
        },
        {
          IdPreguntaOK: '7',
          Respuesta:    this.guia3.controls['2_5'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_5'].value,false)
        },
        {
          IdPreguntaOK: '8',
          Respuesta:    this.guia3.controls['2_6'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_6'].value,false)
        },
        {
          IdPreguntaOK: '9',
          Respuesta:    this.guia3.controls['2_7'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_7'].value,false)
        },
        {
          IdPreguntaOK: '10',
          Respuesta:    this.guia3.controls['2_8'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_8'].value,false)
        },
        {
          IdPreguntaOK: '11',
          Respuesta:    this.guia3.controls['2_9'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_9'].value,false)
        },
        {
          IdPreguntaOK: '12',
          Respuesta:    this.guia3.controls['2_10'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_10'].value,false)
        },
        {
          IdPreguntaOK: '13',
          Respuesta:    this.guia3.controls['2_11'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_11'].value,false)
        },
        {
          IdPreguntaOK: '14',
          Respuesta:    this.guia3.controls['2_12'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_12'].value,false)
        },
        {
          IdPreguntaOK: '15',
          Respuesta:    this.guia3.controls['2_13'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_13'].value,false)
        },
        {
          IdPreguntaOK: '16',
          Respuesta:    this.guia3.controls['2_14'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_14'].value,false)
        },
        {
          IdPreguntaOK: '17',
          Respuesta:    this.guia3.controls['2_15'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_15'].value,false)
        },
        {
          IdPreguntaOK: '18',
          Respuesta:    this.guia3.controls['2_16'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_16'].value,false)
        },
        {
          IdPreguntaOK: '19',
          Respuesta:    this.guia3.controls['2_17'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_17'].value,false)
        },
        {
          IdPreguntaOK: '20',
          Respuesta:    this.guia3.controls['2_18'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_18'].value,false)
        },
        {
          IdPreguntaOK: '21',
          Respuesta:    this.guia3.controls['2_19'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_19'].value,false)
        },
        {
          IdPreguntaOK: '22',
          Respuesta:    this.guia3.controls['2_20'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_20'].value,false)
        },
        {
          IdPreguntaOK: '29',
          Respuesta:    this.guia3.controls['2_21'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_21'].value,false)
        },
        {
          IdPreguntaOK: '54',
          Respuesta:    this.guia3.controls['2_22'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_22'].value,false)
        },
        {
          IdPreguntaOK: '58',
          Respuesta:    this.guia3.controls['2_23'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_23'].value,false)
        },
        {
          IdPreguntaOK: '59',
          Respuesta:    this.guia3.controls['2_24'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_24'].value,false)
        },
        {
          IdPreguntaOK: '60',
          Respuesta:    this.guia3.controls['2_25'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_25'].value,false)
        },
        {
          IdPreguntaOK: '61',
          Respuesta:    this.guia3.controls['2_26'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_26'].value,false)
        },
        {
          IdPreguntaOK: '62',
          Respuesta:    this.guia3.controls['2_27'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_27'].value,false)
        },
        {
          IdPreguntaOK: '63',
          Respuesta:    this.guia3.controls['2_28'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_28'].value,false)
        },
        {
          IdPreguntaOK: '64',
          Respuesta:    this.guia3.controls['2_29'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_29'].value,false)
        },
        {
          IdPreguntaOK: '65',
          Respuesta:    this.guia3.controls['2_30'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_30'].value,false)
        },
        {
          IdPreguntaOK: '66',
          Respuesta:    this.guia3.controls['2_31'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_31'].value,false)
        },
        {
          IdPreguntaOK: '67',
          Respuesta:    this.guia3.controls['2_32'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_32'].value,false)
        },
        {
          IdPreguntaOK: '68',
          Respuesta:    this.guia3.controls['2_33'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_33'].value,false)
        },
        {
          IdPreguntaOK: '69',
          Respuesta:    this.guia3.controls['2_34'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_34'].value,false)
        },
        {
          IdPreguntaOK: '70',
          Respuesta:    this.guia3.controls['2_35'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_35'].value,false)
        },
        {
          IdPreguntaOK: '71',
          Respuesta:    this.guia3.controls['2_36'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_36'].value,false)
        },
        {
          IdPreguntaOK: '72',
          Respuesta:    this.guia3.controls['2_37'].value,
          Valor:        this.obtenerPuntaje(this.guia3.controls['2_37'].value,false)
        }
        
      ]
    };

    const idRespuestaOK = this.res.IdRespuestaOK+'';

    const encuestaPersona3: EncuestaPersona ={
      IdRespuestaOK : idRespuestaOK,
      Enlace        : 'http://localhost:8100/responder/'+idRespuestaOK,
      IdEncuestaOK  : '3',
      Contestada    : true,
      Fecha         : new Date()
    };


    if (this.res) {
      this.res.Contestada=true;
      this.res.Puntuacion = puntajeSeccion1 + puntajeSeccion2;
      this.resService.putRespuestaItem(this.res.IdRespuestaOK+'',this.res).subscribe( data => {
        console.log(data);
        this.presentToast('Encuesta contestada con exito','success');
        this.resService.pushRespuestaSeccionItem(this.res?.IdRespuestaOK+'',seccion_1.IdSeccionOK,seccion_1).subscribe( data => {
          console.log(data);
          this.resService.pushRespuestaSeccionItem(this.res?.IdRespuestaOK+'',seccion_2.IdSeccionOK,seccion_2).subscribe( data => {
            console.log(data);
            this.prsService.pushEncuestaItem(this.res.IdPersonaOK+'',idRespuestaOK,encuestaPersona3).subscribe( data => {
              console.log(data);
            });
          })
        })
      })
    }
    console.log(seccion_1);
    console.log(seccion_2);
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
