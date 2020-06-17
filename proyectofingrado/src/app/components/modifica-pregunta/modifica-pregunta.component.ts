import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, Renderer2, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { AuthserviceService } from 'src/app/services/auth/authservice.service';
import { RankingsService } from 'src/app/services/rankings/rankings.service';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { Pregunta } from 'src/app/models/pregunta';
import { map } from 'rxjs/operators';
interface Foo {
  [key: string]: boolean;
}
@Component({
  selector: 'app-modifica-pregunta',
  templateUrl: './modifica-pregunta.component.html',
  styleUrls: ['./modifica-pregunta.component.scss']
})
export class ModificaPreguntaComponent implements OnInit, AfterViewInit {


  nuevaPregunta: FormGroup;
  tituloVentana: string
  btnVentana: string
  preguntas: string[] = []

  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;
  @ViewChild('titulo', { static: false }) titulo: ElementRef;
  @ViewChild('dificultad1', { static: false }) dificultad1: ElementRef;
  @ViewChild('dificultad2', { static: false }) dificultad2: ElementRef;
  @ViewChild('dificultad3', { static: false }) dificultad3: ElementRef;
  @ViewChild('respuesta1', { static: false }) respuesta1: ElementRef;
  @ViewChild('respuesta2', { static: false }) respuesta2: ElementRef;
  @ViewChild('respuesta3', { static: false }) respuesta3: ElementRef;
  @ViewChild('respuesta4', { static: false }) respuesta4: ElementRef;
  @ViewChild('respuestaCorrecta1', { static: false }) respuestaCorrecta1: ElementRef;
  @ViewChild('respuestaCorrecta2', { static: false }) respuestaCorrecta2: ElementRef;
  @ViewChild('respuestaCorrecta3', { static: false }) respuestaCorrecta3: ElementRef;
  @ViewChild('respuestaCorrecta4', { static: false }) respuestaCorrecta4: ElementRef;
  @ViewChild('tagtitulo', { static: false }) tagtitulo: ElementRef;
  @ViewChild('tagrespuesta1', { static: false }) tagrespuesta1: ElementRef;
  @ViewChild('tagrespuesta2', { static: false }) tagrespuesta2: ElementRef;
  @ViewChild('tagrespuesta3', { static: false }) tagrespuesta3: ElementRef;
  @ViewChild('tagrespuesta4', { static: false }) tagrespuesta4: ElementRef;
  keysPressed: Foo = {};
  guardarAbierto: boolean = false;

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keysPressed[event.key] = true;
    if (this.keysPressed['Alt'] && event.key == 'Enter') {
      this.addPregunta(this.nuevaPregunta.value);
    }

  }
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent2(event: KeyboardEvent) {
    delete this.keysPressed[event.key];

  }


  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authenticationService: AuthserviceService,
    public dataservice: DataService,
    public preguntaService: PreguntasService,
    private dialogRef: MatDialogRef<ModificaPreguntaComponent>,
    private renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {


    this.nuevaPregunta = new FormGroup({
      pregunta: new FormControl(''),
      respuesta1: new FormControl(''),
      respuesta2: new FormControl(''),
      respuesta3: new FormControl(''),
      respuesta4: new FormControl(''),
    });



  }


  //SI ENTRA EN MODO MODIFICAR, COLOCARA LOS VALORES DE LA PREGUNTA ELEGIDA

  ngAfterViewInit(): void {
    //ESTABLECE SI SE ESCUCHA EL SONIDO A DAR CLICKS O PASAR POR ENCIMA DE BOTONES
    if (this.dataservice.sonidosExtras) {
      this.hover.nativeElement.volume = 0.2;
      this.click.nativeElement.volume = 1
    }
    else {
      this.hover.nativeElement.volume = 0;
      this.click.nativeElement.volume = 0
    }
    if (!this.dataservice.añadeRegistro) {



      this.renderer.setProperty(this.titulo.nativeElement, 'value', this.data.pregunta);
      this.renderer.setProperty(this.respuesta1.nativeElement, 'value', this.data.respuesta1Pregunta);
      this.renderer.setProperty(this.respuesta2.nativeElement, 'value', this.data.respuesta2Pregunta);
      this.renderer.setProperty(this.respuesta3.nativeElement, 'value', this.data.respuesta3Pregunta);
      this.renderer.setProperty(this.respuesta4.nativeElement, 'value', this.data.respuesta4Pregunta);

      //SE MARCARA EL RADIO DEL NIVEL DEPENDIENDO DE LA DIFICULTAD DE LA PREGUNTA
      switch (this.data.dificultad) {
        case 1:
          this.renderer.setProperty(this.dificultad1.nativeElement, 'checked', "true");

          break;
        case 2:
          this.renderer.setProperty(this.dificultad2.nativeElement, 'checked', "true");

          break;
        case 3:
          this.renderer.setProperty(this.dificultad3.nativeElement, 'checked', "true");

          break;
        default:
          break;
      }

      //SE MARCARA EL RADIO DE LA RESPUESTA CORRECTA

      switch (this.data.respuestaCorrecta) {
        case this.data.respuesta1Pregunta:
          this.renderer.setProperty(this.respuestaCorrecta1.nativeElement, 'checked', "true");

          break;
        case this.data.respuesta2Pregunta:
          this.renderer.setProperty(this.respuestaCorrecta2.nativeElement, 'checked', "true");

          break;
        case this.data.respuesta3Pregunta:
          this.renderer.setProperty(this.respuestaCorrecta3.nativeElement, 'checked', "true");

          break;
        case this.data.respuesta4Pregunta:
          this.renderer.setProperty(this.respuestaCorrecta4.nativeElement, 'checked', "true");

          break;

        default:
          break;
      }

      //HAY QUE COLOCAR LOS VALORES AL FORMULARIO CUANDO SE ENTRA EN MODIFICAR POR SI NO
      // SE MODIFICAR ALGUNOS REGISTROS Y SE DA CLICK EN EL BOTON DE MODIFICAR, 
      // DARA ERROR AL COMPROBAR LOS CAMPOS DEL FORMULARIO

      this.nuevaPregunta.patchValue({
        pregunta: this.data.pregunta,
        respuesta1: this.data.respuesta1Pregunta,
        respuesta2: this.data.respuesta2Pregunta,
        respuesta3: this.data.respuesta3Pregunta,
        respuesta4: this.data.respuesta4Pregunta,
      });

    } else {


      // SI ENTRA EN MODO AÑADIR, SE QUITAN LOS TEXTOS DE LOS CAMPOS
      this.renderer.setStyle(this.tagtitulo.nativeElement, 'display', "none");



    }

  }


  getPreguntas() {
    this.preguntaService.getPreguntas().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(customers => {

      for (let index = 0; index < customers.length; index++) {
        this.preguntas.push(customers[index].pregunta)

      }


    });
  }



  // SE CAMBIAN LOS TEXTOS DEPENDIENDO DE EN QUE MODO ENTRE
  ngOnInit() {
    if (!this.dataservice.añadeRegistro) {
      this.tituloVentana = "Modificar pregunta"
      this.btnVentana = "Modificar"
    } else {
      this.tituloVentana = "Añadir pregunta"
      this.btnVentana = "Añadir"
    }

    this.getPreguntas();

  }

  addPregunta(value) {
    this.click.nativeElement.play();
    let errorAdd: boolean = false


    //COMPRUEBA QUE NO HAYA ERRORES EN EL FORMULARIO
    if (this.nuevaPregunta.get('pregunta').value.length == 0 && this.nuevaPregunta.get('pregunta').value == '') {
      this.toastr.error('Debe escribir la pregunta', 'Error al añadir pregunta', {
        positionClass: 'toast-top-center',

      });
      errorAdd = true
    }

    if (this.nuevaPregunta.get('respuesta1').value.length == 0 && this.nuevaPregunta.get('respuesta1').value == '') {
      this.toastr.error('Debe escribir la respuesta 1', 'Error al añadir pregunta', {
        positionClass: 'toast-top-center',

      });
      errorAdd = true
    }

    if (this.nuevaPregunta.get('respuesta2').value.length == 0 && this.nuevaPregunta.get('respuesta2').value == '') {
      this.toastr.error('Debe escribir la respuesta 2', 'Error al añadir pregunta', {
        positionClass: 'toast-top-center',

      });
      errorAdd = true
    }


    if (this.nuevaPregunta.get('respuesta3').value.length == 0 && this.nuevaPregunta.get('respuesta3').value == '') {
      this.toastr.error('Debe escribir la respuesta 3', 'Error al añadir pregunta', {
        positionClass: 'toast-top-center',

      });
      errorAdd = true
    }


    if (this.nuevaPregunta.get('respuesta4').value.length == 0 && this.nuevaPregunta.get('respuesta4').value == '') {
      this.toastr.error('Debe escribir la respuesta 4', 'Error al añadir pregunta', {
        positionClass: 'toast-top-center',

      });
      errorAdd = true

    }

    // COMPRUEBA QUE HAYA CLICKEADO UN RADIO DE LA DIFICULTAD
    if (document.querySelectorAll('input[name="dificultad"]:checked').length == 0) {
      this.toastr.error('Debe de elegir la dificultad de la preugnta', 'Error al añadir pregunta', {
        positionClass: 'toast-top-center',

      });
      errorAdd = true
    }

    // COMPRUEBA QUE HAYA CLICKEADO UN RADIO DE LA RESPUESTA CORRECTA
    if (document.querySelectorAll('input[name="respuestaCorrecta"]:checked').length == 0) {
      this.toastr.error('Debe de elegir una respuesta correcta', 'Error al añadir pregunta', {
        positionClass: 'toast-top-center',

      });
      errorAdd = true
    }

    //PARA SABER SI ALGUNA DE LAS RESPUESTAS SE REPITE
    let arrayRespuestas = [this.nuevaPregunta.get('respuesta1').value, this.nuevaPregunta.get('respuesta2').value, this.nuevaPregunta.get('respuesta3').value, this.nuevaPregunta.get('respuesta4').value]

    // COMPRUEBA QUE LAS RESPUESTAS SEAN DIFERENTES
    if (arrayRespuestas.length !== new Set(arrayRespuestas).size) {
      this.toastr.error('Las 4 respuestas debe de ser diferentes', 'Error al añadir pregunta', {
        positionClass: 'toast-top-center',

      });
      errorAdd = true
    }

    if ((this.nuevaPregunta.get('respuesta1').value.length || this.nuevaPregunta.get('respuesta2').value.length || this.nuevaPregunta.get('respuesta3').value.length || this.nuevaPregunta.get('respuesta4').value.length) > 70) {
      this.toastr.error('Las respuestas debe de menor o igual a 70 caracteres', 'Error al añadir pregunta', {
        positionClass: 'toast-top-center',

      });
      errorAdd = true
    }

    if (this.nuevaPregunta.get('pregunta').value.length > 110) {
      this.toastr.error('La pregunta debe de menor o igual a 110 caracteres', 'Error al añadir pregunta', {
        positionClass: 'toast-top-center',

      });
      errorAdd = true
    }


    if (!errorAdd) {


      // OBTIENE LOS VALORES DE LOS RADIOS CLICKEADOS
      let valorRadioCorrecta = document.querySelector('input[name="respuestaCorrecta"]:checked').getAttribute("value");
      let valorRadioNivel = document.querySelector('input[name="dificultad"]:checked').getAttribute("value");

      if (this.dataservice.añadeRegistro) {

        // COMPRUEBA QUE NO SE REPITA EL TITULO DE LA PREGUNTA CON ALGUNA QUE YA ESTE AÑADIDA
        if (this.preguntas.includes(this.nuevaPregunta.get('pregunta').value)) {

          this.toastr.error('Ya existe una pregunta igual', 'Error al eliminar pregunta', {
            positionClass: 'toast-top-center',

          });
        } else {

          // LOS DATOS QUE SE ENVIARAN AL METODO DE AÑADIR REGISTRO DEL SERVICIO
          var docData = {

            pregunta: this.nuevaPregunta.get('pregunta').value,

            // SE OBTIENE UN VALOR DEL ARRAY DE RESPUESTAS DEPENDIENDO AL RADIO PULSADO
            respuestaCorrecta: arrayRespuestas[parseInt(valorRadioCorrecta)],
            dificultad: parseInt(valorRadioNivel),
            respuestas: [this.nuevaPregunta.get('respuesta1').value, this.nuevaPregunta.get('respuesta2').value, this.nuevaPregunta.get('respuesta3').value, this.nuevaPregunta.get('respuesta4').value],
          }

          this.preguntaService.addPregunta(docData)

          // SE ENVIA UN PARAMETRO EN CLOSE PARA INDICAR QUE SE HA CERRADO EL FORMULARIO DANDO CLICK
          // AL BOTON
          this.dialogRef.close(true);
        }
      } else {

        let errorModificar: boolean = false

        // COMPRUEBA QUE AL MODIFICAR, SI HAY 4 PREGUNTAS DE LA DIFICULTAD DE LA PREGUNTA A MODIFICAR
        // Y SE QUIERE CAMBIAR LA DIFICULTAD, NO TE DEJE YA QUE NO PUEDE HABER 3 PREGUNTAS EN
        // CUALQUIER DIFICULTAD
        if (this.dataservice.preguntaAAdministrar.dificultad == 1) {
          if (this.data.preguntasNivel1 == 4) {
            if (this.dataservice.preguntaAAdministrar.dificultad != parseInt(valorRadioNivel))
              errorModificar = true

          }
        } else if (this.dataservice.preguntaAAdministrar.dificultad == 2) {
          if (this.data.preguntasNivel2 == 4)
            if (this.dataservice.preguntaAAdministrar.dificultad != parseInt(valorRadioNivel))
              errorModificar = true

        } else if (this.dataservice.preguntaAAdministrar.dificultad == 3) {
          if (this.data.preguntasNivel3 == 4)
            if (this.dataservice.preguntaAAdministrar.dificultad != parseInt(valorRadioNivel))
              errorModificar = true
        }

        if (errorModificar) {
          this.toastr.error('Debe de haber al menos 4 preguntas de cada nivel', 'Error al eliminar pregunta', {
            positionClass: 'toast-top-center',

          });
        } else {

          //SE MIRA SI LA PREGUNTA QUE SE MODIFICA SE CAMBIA DE TITULO Y SE COLOCA OTRO ITULO 
          // DE UNA PREGUNTA QUE YA ESTE EN EL JUEGO
          if (!this.preguntas.includes(this.nuevaPregunta.get('pregunta').value) || this.data.pregunta == this.nuevaPregunta.get('pregunta').value) {

            var docData = {
              pregunta: this.nuevaPregunta.get('pregunta').value,
              respuestaCorrecta: arrayRespuestas[parseInt(valorRadioCorrecta)],
              dificultad: parseInt(valorRadioNivel),
              respuestas: [this.nuevaPregunta.get('respuesta1').value, this.nuevaPregunta.get('respuesta2').value, this.nuevaPregunta.get('respuesta3').value, this.nuevaPregunta.get('respuesta4').value],
            }

            this.preguntaService.updatePregunta(this.dataservice.claveAActualizar, docData)
            this.dialogRef.close(true);
          } else {

            this.toastr.error('Ya existe una pregunta igual', 'Error al eliminar pregunta', {
              positionClass: 'toast-top-center',

            });
          }

        }



      }

    }


  }


  sonarHover() {
    this.hover.nativeElement.play();

  }




}
