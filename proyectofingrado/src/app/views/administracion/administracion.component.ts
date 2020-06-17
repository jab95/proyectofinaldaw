import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { Pregunta } from 'src/app/models/pregunta';
import { map } from 'rxjs/operators';
import { MatDialogRef, MatDialog } from '@angular/material';
import { CargandoComponent } from 'src/app/components/cargando/cargando.component';
import { DataService } from 'src/app/services/data/data.service';
import { ToastrService } from 'ngx-toastr';
import { ModificaPreguntaComponent } from 'src/app/components/modifica-pregunta/modifica-pregunta.component';
import { Router } from '@angular/router';
interface Foo {
  [key: string]: boolean;
}
@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent implements OnInit, AfterViewInit {

  selectedRow: Number;
  preguntas: Pregunta[] = []
  titulosTodasLasPreguntas: string[] = []
  preguntaSeleccionada: string = "";
  preguntasNivel1: number
  preguntasNivel2: number
  preguntasNivel3: number
  dificultadPregunta: number
  respuesta1Pregunta: string
  respuesta2Pregunta: string
  respuesta3Pregunta: string
  respuesta4Pregunta: string
  respuestaCorrecta: string
  invitado: boolean
  preguntasFlitradasTexto: Pregunta[];
  invitado2: boolean


  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;
  @ViewChild('combo', { static: false }) combo: ElementRef;
  @ViewChild('volumen', { static: false }) volumen: ElementRef;
  @ViewChild('inputBusqueda', { static: false }) inputBusqueda: ElementRef;
  keysPressed: Foo = {};
  nuevaPreAbierta: boolean = false

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keysPressed[event.key] = true;
    if (this.keysPressed['Alt'] && event.key == '6') {
      this.router.navigateByUrl('/inicio');
    }
    if (this.keysPressed['Alt'] && event.key == 'b') {
      this.inputBusqueda.nativeElement.focus();
    }
    if (this.keysPressed['Alt'] && event.key == 'a') {
      if (!this.nuevaPreAbierta)
        this.nuevaPregunta();
    }
    if (this.keysPressed['Alt'] && event.key == 'm') {
      this.inputBusqueda.nativeElement.focus();
    }
    if (this.keysPressed['Alt'] && event.key == 'e') {
      this.inputBusqueda.nativeElement.focus();
    }
    if (this.keysPressed['Alt'] && event.key == '0') {
      this.onChange("todas")
      this.combo.nativeElement.value = "todas"
    }
    if (this.keysPressed['Alt'] && event.key == '1') {
      this.onChange("uno")
      this.combo.nativeElement.value = "uno"
    }
    if (this.keysPressed['Alt'] && event.key == '2') {
      this.onChange("dos")
      this.combo.nativeElement.value = "dos"
    }
    if (this.keysPressed['Alt'] && event.key == '3') {
      this.onChange("tres")
      this.combo.nativeElement.value = "tres"
    }
  }
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent2(event: KeyboardEvent) {
    delete this.keysPressed[event.key];

  }

  constructor(private preguntasService: PreguntasService,
    public dataservice: DataService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,

  ) {




  };



  // OBTIENE LAS PREGUTNAS
  ngOnInit() {

    let invitado = localStorage.getItem('invitado') == null ? "true" : localStorage.getItem('invitado')

    this.invitado = invitado == "true" ? true : false;

    if (this.invitado) {
      this.toastr.error('No tiene permiso a entrar aqui', 'Error al entrar en administracion', {
        positionClass: 'toast-top-center',

      });

      this.router.navigateByUrl('/login');

    } else {


      let dialogo = this.dialog.open(CargandoComponent, { panelClass: 'custom-dialog-container' });
      this.getPreguntasNivel1();
      this.getPreguntasNivel2();
      this.getPreguntasNivel3();
      this.getPreguntas("", dialogo);
    }

  }

  sonarClick() {
    this.click.nativeElement.play();

  }

  sonarHover() {
    this.hover.nativeElement.play();

  }


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
    this.volumen.nativeElement.volume = this.dataservice.volumenMusica;
  }

  getPreguntasNivel1() {
    this.preguntasService.getPreguntasNivel(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(preguntas => {

      this.preguntasNivel1 = preguntas.length



    });
  }

  getPreguntasNivel2() {
    this.preguntasService.getPreguntasNivel(2).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(preguntas => {
      this.preguntasNivel2 = preguntas.length


    });
  }
  getPreguntasNivel3() {
    this.preguntasService.getPreguntasNivel(3).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(preguntas => {
      this.preguntasNivel3 = preguntas.length


    });
  }


  // SE PASA UN PARAMETRO OPCIONAL DEL DIALOGO DE CARGADO, YA QUE SE DEBE DE LLAMAR EL METODO
  // EN OTRO LADO Y NO SE NECESITA VOLVER A COLOCAR EL DIALOGO EN LA LLAMADA
  getPreguntas(texto?: string, dialogo?: MatDialogRef<CargandoComponent>) {
    this.preguntasService.getPreguntas().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(customers => {


      // SI SE HA LLAMADO AL DIALOGO SE CIERRA
      if (dialogo)
        dialogo.close()

      customers.sort(function (a, b) {
        return a.dificultad - b.dificultad
      })

      this.preguntas = customers;

      //SI SE HA INTRODUCIDO CAMPO DE TEXTO EN EL INPUT DE BUSQUEDA, SE EJECUTA EL CODIGO SIGUIENTE
      // QUE FILTRARA LAS PALABRAS QUE INCLUYAN EL TEXTO IDNICADO Y LAS PASARA AL ARRAY
      if (texto.length != 0) {
        this.preguntasFlitradasTexto = []

        this.preguntas.forEach(element => {
          if (element.pregunta.includes(texto)) {
            this.preguntasFlitradasTexto.push(element)
          }
        });

        this.preguntasFlitradasTexto.sort(function (a, b) {
          return a.dificultad - b.dificultad
        })


        this.preguntas = this.preguntasFlitradasTexto;
      }



    });
  }

  // PARA OBTENER LAS PREGUNTAS SEGUN EL TEXTO QUE SE INDIQUE EN EL CAMPO DE TEXTO
  onSearchChange(texto: string) {

    this.combo.nativeElement.value = "todas"
    this.getPreguntas(texto);

    // this.getPreguntas();

  }


  // EL METODO QUE SELECCIONA LAS PREGUNTAS SEGUN SE ELIJAN EN EL DESPLEGABLE DE LA DIFICULTAD
  onChange(texto: string) {

    this.inputBusqueda.nativeElement.value = ""

    switch (texto) {
      case "uno":
        this.getPreguntasPorNivel(1);
        break;
      case "dos":
        this.getPreguntasPorNivel(2);
        break;
      case "tres":
        this.getPreguntasPorNivel(3);
        break;
      case "todas":
        this.getPreguntas();
        break;
      default:
        break;
    }


  }
  getPreguntasPorNivel(nivel: number) {
    this.preguntasService.getPreguntasNivel(nivel).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(customers => {

      this.preguntas = customers;
    });
  }


  eliminarPregunta() {
    this.sonarClick();

    // COMPRUEBA QUE AL MODIFICAR, SI HAY 4 PREGUNTAS DE LA DIFICULTAD DE LA PREGUNTA A MODIFICAR
    // Y SE QUIERE CAMBIAR LA DIFICULTAD, NO TE DEJE YA QUE NO PUEDE HABER 3 PREGUNTAS EN
    // CUALQUIER DIFICULTAD
    let errorBorrar = false
    if (this.dataservice.preguntaAAdministrar) {
      if (this.dataservice.preguntaAAdministrar.dificultad == 1) {
        if (this.preguntasNivel1 == 4)
          errorBorrar = true
      } else if (this.dataservice.preguntaAAdministrar.dificultad == 2) {
        if (this.preguntasNivel2 == 4)
          errorBorrar = true
      } else if (this.dataservice.preguntaAAdministrar.dificultad == 3) {
        if (this.preguntasNivel3 == 4)
          errorBorrar = true
      }

      if (errorBorrar) {
        this.toastr.error('Debe de haber al menos 4 preguntas de cada nivel', 'Error al eliminar pregunta', {
          positionClass: 'toast-top-center',

        });
      } else {
        this.preguntasService.deleteCustomer(this.dataservice.preguntaAAdministrar.key)
        this.combo.nativeElement.value = "todas"

      }
    } else
      this.toastr.error('Debe de seleccionar una pregunta', 'Error al borrar pregunta', {
        positionClass: 'toast-top-center',

      });


  }


  setClickedRow(event) {

    // CUANDO SE SELECCIONA UNA PREGUNTA, SE OBTEIENEN LOS VALORES
    this.preguntaSeleccionada = event.pregunta
    this.dataservice.claveAActualizar = event.key
    this.dataservice.preguntaAAdministrar = event
    this.dificultadPregunta = event.dificultad
    this.respuesta1Pregunta = event.respuestas[0]
    this.respuesta2Pregunta = event.respuestas[1]
    this.respuesta3Pregunta = event.respuestas[2]
    this.respuesta4Pregunta = event.respuestas[3]
    this.respuestaCorrecta = event.respuestaCorrecta
  }

  nuevaPregunta() {
    this.sonarClick()
    this.arreglaBugDialogo();
    this.nuevaPreAbierta = true
    // AL ABRIR LA VENTANA DE AÑADIR, SE QUITA LA PREGUNTA SELECCIONADA, SI SE HUBIESE
    // SELECCIONADO UNA
    this.dataservice.añadeRegistro = true
    this.dataservice.preguntaAAdministrar = null
    this.preguntaSeleccionada = ""
    let dialogo = this.dialog.open(ModificaPreguntaComponent, {
      panelClass: 'custom-dialog-container'
    });
    dialogo.afterClosed().subscribe(result => {
      // SI SE HA CERRADO LA VENTANA DANDO CLICK AL BOTON DE AÑADIR PREGUNTA
      // SE PONE EL DESPEGABLE EN TODAS LAS PREGUTNAS
      if (result) {
        this.combo.nativeElement.value = "todas"
      }
      this.nuevaPreAbierta = false

    })


  }

  modificarPregunta() {
    this.sonarClick()

    this.arreglaBugDialogo();

    if (this.dataservice.preguntaAAdministrar) {


      // SE ENVIAN LOS VALORES DE LA PREGUNTA SELECCIONADA AL DIALOGO DE MODIFICAR
      this.dataservice.añadeRegistro = false
      let dialogo = this.dialog.open(ModificaPreguntaComponent, {
        data: {
          pregunta: this.preguntaSeleccionada,
          dificultad: this.dificultadPregunta,
          respuesta1Pregunta: this.respuesta1Pregunta,
          respuesta2Pregunta: this.respuesta2Pregunta,
          respuesta3Pregunta: this.respuesta3Pregunta,
          respuesta4Pregunta: this.respuesta4Pregunta,
          respuestaCorrecta: this.respuestaCorrecta,
          preguntasNivel1: this.preguntasNivel1,
          preguntasNivel2: this.preguntasNivel2,
          preguntasNivel3: this.preguntasNivel3,
          todasPreguntas: this.preguntas

        },
        panelClass: 'custom-dialog-container',
      });
      dialogo.afterClosed().subscribe(result => {

        // AL CERRAR EL FOMULARIO DE MOFICIAR, SE DESCLICKEA LA PREGUNTA SELECCIONADA
        this.dataservice.preguntaAAdministrar = null
        this.preguntaSeleccionada = ""
        if (result)
          this.combo.nativeElement.value = "todas"
      })

    } else {
      this.toastr.error('Debe de seleccionar una pregunta', 'Error al modificar pregunta', {
        positionClass: 'toast-top-center',

      });
    }
  }



  //ARREGLA BUF CUANDO SE ABRE EL DIALOGO LA PANTALLA SE VE EN BLANCO

  arreglaBugDialogo() {

    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }





}
