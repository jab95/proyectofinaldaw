import { Component, OnInit, ViewChild, Renderer2, ElementRef, QueryList, ViewChildren, AfterViewInit, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComodinLLamadaComponent } from 'src/app/components/comodin-llamada/comodin-llamada.component';
import { ComodinPublicoComponent } from 'src/app/components/comodin-publico/comodin-publico.component';
import { DataService } from 'src/app/services/data/data.service';
import { Router } from '@angular/router';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { Pregunta } from 'src/app/models/pregunta';
import { map } from 'rxjs/operators';
import { MuestraSaldoComponent } from 'src/app/components/muestra-saldo/muestra-saldo.component';
import { ColocaSeguroComponent } from 'src/app/components/coloca-seguro/coloca-seguro.component';
import { AcertadaFalladaComponent } from 'src/app/components/acertada-fallada/acertada-fallada.component';
import { CargandoComponent } from 'src/app/components/cargando/cargando.component';
interface Foo {
  [key: string]: boolean;
}
@Component({
  selector: 'app-pantalla-juego',
  templateUrl: './pantalla-juego.component.html',
  styleUrls: ['./pantalla-juego.component.scss', '../../app.component.scss']
})
export class PantallaJuegoComponent implements OnInit, AfterViewInit {

  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;
  @ViewChildren('btnRespuesta') btnRespuesta: QueryList<ElementRef>;
  @ViewChild('publico2', { static: false }) publico2: ElementRef;
  @ViewChild('publico1', { static: false }) publico1: ElementRef;
  @ViewChild('llamada1', { static: false }) llamada1: ElementRef;
  @ViewChild('llamada2', { static: false }) llamada2: ElementRef;
  @ViewChild('cincuenta1', { static: false }) cincuenta1: ElementRef;
  @ViewChild('cincuenta2', { static: false }) cincuenta2: ElementRef;
  @ViewChild('tituloPregunta', { static: false }) tituloPregunta: ElementRef;
  @ViewChild('respuesta1', { static: false }) respuesta1: ElementRef;
  @ViewChild('respuesta2', { static: false }) respuesta2: ElementRef;
  @ViewChild('respuesta3', { static: false }) respuesta3: ElementRef;
  @ViewChild('respuesta4', { static: false }) respuesta4: ElementRef;
  @ViewChild('barraprogreso', { static: false }) barraProgreso: ElementRef;
  @ViewChild('confirmar', { static: false }) confirmar: ElementRef;
  @ViewChild('plantarse', { static: false }) plantarse: ElementRef;
  @ViewChild('volumen', { static: false }) volumen: ElementRef;



  preguntas: Pregunta[] = []
  preguntasElegidas: Pregunta[] = []
  respuestasAcertadasTodasLasPreguntas: string[] = []
  respuestas1TodasLasPreguntas: string[] = []
  respuestas2TodasLasPreguntas: string[] = []
  respuestas3TodasLasPreguntas: string[] = []
  respuestas4TodasLasPreguntas: string[] = []
  titulosTodasLasPreguntas: string[] = []
  contador2: number = 0
  contadorCronometro: number = 0
  continuaInterval: boolean = false;
  valores: number[] = []
  respuestas: string[] = []
  indiceCorrecto: number
  otroIndiceElegido: number
  indice3: number
  indice4: number
  valorIndiceCorrecto: number
  respuestasComodin5050: ElementRef[] = []
  comodin50Habilitado: boolean = true
  comodinLLamadaHabilitado: boolean = true
  comodinPublicoHabilitado: boolean = true


  keysPressed: Foo = {};
  nuevaPreAbierta: boolean = false
  cincAbierto: boolean = false
  llamadaAbierto: boolean = false
  publicoAbierto: boolean = false
  comprobarAbierto: boolean = false;
  plantadoAbierto: boolean = false;

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keysPressed[event.key] = true;
    if (this.keysPressed['Alt'] && event.key == '5') {
      if (!this.cincAbierto)
        this.click5050();
    }
    if (this.keysPressed['Alt'] && event.key == 'l') {
      if (!this.llamadaAbierto)
        this.clickLLamada();
    }
    if (this.keysPressed['Alt'] && event.key == 'p') {
      if (!this.publicoAbierto)
        this.clickPublico();
    }
    if (this.keysPressed['Alt'] && event.key == '1' && (!this.comprobarAbierto || !this.llamadaAbierto || !this.publicoAbierto || !this.plantadoAbierto)) {
      let but: HTMLElement = this.respuesta1.nativeElement as HTMLElement
      but.click()
    }
    if (this.keysPressed['Alt'] && event.key == '2' && (!this.comprobarAbierto || !this.llamadaAbierto || !this.publicoAbierto || !this.plantadoAbierto)) {
      let but: HTMLElement = this.respuesta2.nativeElement as HTMLElement
      but.click()
    }
    if (this.keysPressed['Alt'] && event.key == '3' && (!this.comprobarAbierto || !this.llamadaAbierto || !this.publicoAbierto || !this.plantadoAbierto)) {
      let but: HTMLElement = this.respuesta3.nativeElement as HTMLElement
      but.click()
    }
    if (this.keysPressed['Alt'] && event.key == '4' && (!this.comprobarAbierto || !this.llamadaAbierto || !this.publicoAbierto || !this.plantadoAbierto)) {
      let but: HTMLElement = this.respuesta4.nativeElement as HTMLElement
      but.click()
    }
    if (this.keysPressed['Alt'] && event.key == 'c') {
      if (!this.comprobarAbierto)
        this.ComprobarRespuesta();

    }
    if (this.keysPressed['Alt'] && event.key == 's') {
      if (!this.plantadoAbierto)
        this.Plantarse();
    }
  }
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent2(event: KeyboardEvent) {
    delete this.keysPressed[event.key];

  }


  constructor(private elRef: ElementRef,
    private renderer: Renderer2,
    public dialog: MatDialog,
    public dataservice: DataService,
    private router: Router,
    private preguntasService: PreguntasService,
    // private dialogRef: MatDialogRef<CargandoComponent>,

  ) {

    //CUANDO SE CAMBIA DE PANTALLA SE QUITA EL INTERVAL, YA QUE DA ERROR CUANDO
    // SE VA A LA PAGINA ANTERIOR MIENTRAS SE ESTA JUGANDO
    router.events.subscribe((val) => {

      // see also 
      clearInterval(this.dataservice.interval)

      // CUANDO SE CAMBIA DE PAGINA SE REINICIAN TODOS LOS DATOS

      this.dataservice.usadoComodin50 = false
      this.dataservice.usadoComodinLLamada = false
      this.dataservice.usadoComodinPublico = false
      this.dataservice.respuestasPosibles = []
      this.dataservice.contadorPreguntaActual = 0
      this.dataservice.intervaloDone = false
      this.dataservice.contadorParaProgreso = 0
      this.dataservice.seguroNuevo = 0
      this.dataservice.llegadoAMillon = false
      this.dataservice.comodinesUsados = 0


    });
  }



  ngOnInit() {
    let dialogo = this.dialog.open(CargandoComponent, { panelClass: 'custom-dialog-container' });


    this.getPreguntasNivel1();
    this.getPreguntasNivel2();
    this.getPreguntasNivel3(dialogo);
    this.contadorCronometro = this.dataservice.tiempoCronometro

    // dialogo.close()
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
    this.comodinLLamadaHabilitado = this.dataservice.comodinLLamadaHabilitado
    this.comodinPublicoHabilitado = this.dataservice.comodinPublicoHabilitado
    this.comodin50Habilitado = this.dataservice.comodin50Habilitado


    if (!this.comodin50Habilitado) {
      this.renderer.setProperty(this.cincuenta1.nativeElement, 'innerHTML', '&#10060;');
      this.renderer.setProperty(this.cincuenta2.nativeElement, 'innerHTML', '&#10060;');
      this.dataservice.usadoComodin50 = true;

    }
    if (!this.comodinLLamadaHabilitado) {
      this.renderer.setProperty(this.llamada1.nativeElement, 'innerHTML', '&#10060;');
      this.renderer.setProperty(this.llamada2.nativeElement, 'innerHTML', '&#10060;');
      this.dataservice.usadoComodinLLamada = true;

    }
    if (!this.comodinPublicoHabilitado) {
      this.renderer.setProperty(this.publico1.nativeElement, 'innerHTML', '&#10060;');
      this.renderer.setProperty(this.publico2.nativeElement, 'innerHTML', '&#10060;');
      this.dataservice.usadoComodinPublico = true;

    }

  }


  getPreguntas() {
    this.preguntasService.getPreguntas().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(customers => {
      this.preguntas = customers;
    });
  }

  getPreguntasNivel1() {
    this.preguntasService.getPreguntasNivel(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(preguntas => {

      // SE DESORDENAN LAS PREGUNTAS DEL NIVEL 1
      preguntas = preguntas.sort(function () { return Math.random() - 0.5 })

      // ELIGE 4 DE ENTRE TODAS LAS PREGUNTAS DE ESE NIVEL
      for (let index = 0; index < 4; index++) {

        this.preguntasElegidas.push(preguntas[index])

      }

      // ALMACENA TODOS LOS DATOS DE LAS PREGUNTAS COMO RESPUESTAS, TITULOS Y LAS RESPUESTAS CORRECTAS
      for (let index = 0; index < 4; index++) {
        this.respuestasAcertadasTodasLasPreguntas.push(this.preguntasElegidas[index].respuestaCorrecta)
        this.respuestas1TodasLasPreguntas.push(this.preguntasElegidas[index].respuestas[0])
        this.respuestas2TodasLasPreguntas.push(this.preguntasElegidas[index].respuestas[1])
        this.respuestas3TodasLasPreguntas.push(this.preguntasElegidas[index].respuestas[2])
        this.respuestas4TodasLasPreguntas.push(this.preguntasElegidas[index].respuestas[3])
        this.titulosTodasLasPreguntas.push(this.preguntasElegidas[index].pregunta)

      }

      // SE RELLENAN LOS DATOS LA PRIMERA VEZ QUE SE ENTRA EN LA VENTANA JUEGO
      this.RellenaDatosPrimeraVez();

      // PARA LOS COMODINES, NECESITAMOS ALMACENAR LAS RESPUESTAS POSIBLES Y LA CORRECTA
      this.dataservice.respuestasPosibles = this.preguntasElegidas[this.dataservice.contadorPreguntaActual].respuestas
      this.dataservice.respuestaCorrecta = this.preguntasElegidas[this.dataservice.contadorPreguntaActual].respuestaCorrecta

      this.cronometro()

      this.desarrolloComodin5050();

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


      // DOCUMENTADO EN EL METODO DE LAS PREGUTAS DE NIVEL 1

      preguntas = preguntas.sort(function () { return Math.random() - 0.5 })

      for (let index = 0; index < 4; index++) {

        this.preguntasElegidas.push(preguntas[index])

      }

      for (let index = 4; index < 8; index++) {
        this.respuestasAcertadasTodasLasPreguntas.push(this.preguntasElegidas[index].respuestaCorrecta)
        this.respuestas1TodasLasPreguntas.push(this.preguntasElegidas[index].respuestas[0])
        this.respuestas2TodasLasPreguntas.push(this.preguntasElegidas[index].respuestas[1])
        this.respuestas3TodasLasPreguntas.push(this.preguntasElegidas[index].respuestas[2])
        this.respuestas4TodasLasPreguntas.push(this.preguntasElegidas[index].respuestas[3])
        this.titulosTodasLasPreguntas.push(this.preguntasElegidas[index].pregunta)

      }


    });
  }
  getPreguntasNivel3(dialogo: MatDialogRef<CargandoComponent>) {
    this.preguntasService.getPreguntasNivel(3).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(preguntas => {

      // SE CIERRA EL COMPONENTE DE CARGADO CUANDO SE CARGUEN TODAS LAS PREGUNTAS
      dialogo.close()




      // DOCUMENTADO EN EL METODO DE LAS PREGUTAS DE NIVEL 1
      preguntas = preguntas.sort(function () { return Math.random() - 0.5 })

      for (let index = 0; index < 4; index++) {

        this.preguntasElegidas.push(preguntas[index])

      }

      for (let index = 8; index < 12; index++) {
        this.respuestasAcertadasTodasLasPreguntas.push(this.preguntasElegidas[index].respuestaCorrecta)
        this.respuestas1TodasLasPreguntas.push(this.preguntasElegidas[index].respuestas[0])
        this.respuestas2TodasLasPreguntas.push(this.preguntasElegidas[index].respuestas[1])
        this.respuestas3TodasLasPreguntas.push(this.preguntasElegidas[index].respuestas[2])
        this.respuestas4TodasLasPreguntas.push(this.preguntasElegidas[index].respuestas[3])
        this.titulosTodasLasPreguntas.push(this.preguntasElegidas[index].pregunta)

      }

    });
  }

  deleteCustomers() {
    this.preguntasService.deleteAll();
  }


  RellenaDatosPrimeraVez() {

    // SE RELLENAN LOS TEXTOS DE LAS RESPUESTAS Y EL TITULO DE LA PREGUNTA
    this.renderer.setProperty(this.tituloPregunta.nativeElement, 'textContent', this.preguntasElegidas[0].pregunta);
    this.renderer.setProperty(this.respuesta1.nativeElement, 'textContent', "A) " + this.preguntasElegidas[0].respuestas[0]);
    this.renderer.setProperty(this.respuesta2.nativeElement, 'textContent', "B) " + this.preguntasElegidas[0].respuestas[1]);
    this.renderer.setProperty(this.respuesta3.nativeElement, 'textContent', "C) " + this.preguntasElegidas[0].respuestas[2]);
    this.renderer.setProperty(this.respuesta4.nativeElement, 'textContent', "D) " + this.preguntasElegidas[0].respuestas[3]);
  }


  clickRespuesta(event: any) {
    this.sonarClick()

    // SE CONTROLA QUE SE NO SE DE CLICK SI UNA RESPUESTA ESTA BLOQUEADA POR EL COMODIN DEL 50/50
    if (event.target.style.background != "rgb(221, 221, 221)") {

      // SE OBTIENE EL TEXTO DE LA RESPUESTA Y SE ALMACENA PARA COMPROBAR DESPUES
      // SE LA QUE SE HACE CLICK ES LA CORRECTA
      this.dataservice.respuestaClickeada = event.target.textContent.substring(3, event.target.textContent.length);
      console.log(this.dataservice.respuestaClickeada)
      // SE DESCLICKEA LA RESPUESTA ANTERIORMENTE CLICKEADA SI HACEMOS CLICK EN OTRA
      this.DesclickeaRespuesta();

      // SE CAMBIA EL COLOR DE LA RESPUESTA A LA QUE SE HA HECHO CLICK
      this.renderer.setStyle(event.target, 'background', 'rgb(198, 216, 239)');
    }
  }

  ComprobarRespuesta() {
    this.sonarClick()
    this.arreglaBugDialogo();
    this.llamadaAbierto = true
    this.plantadoAbierto = true
    this.comprobarAbierto = true
    this.publicoAbierto = true
    // SE PAUSA EL CONTADOR CUANDO SE COMPRUEBA LA RESPUESTA
    clearInterval(this.dataservice.interval)

    // SE COMPRUEBA QUE LA RESPUESTA CLICKEADA ES CORRECTA COMPROBANDO EN EL ARRAY DE
    // RESPUESTAS CORRECTAS, LA RESPUESTA EN EL INDICE ACTUAL
    if (this.dataservice.respuestaClickeada == this.respuestasAcertadasTodasLasPreguntas[this.dataservice.contadorPreguntaActual]) {

      // PONEMOS QUE SE HA ACERTADO PARA QUE EL TEXTO DE EL COMPONENTE DE ACERTADO/FALLADO CAMBIE
      this.dataservice.acertada = true
      this.dataservice.plantado = false


      // SE MUESTRA EL COMPONENTE DE ACERTADO/FALLADO
      let dialogref = this.dialog.open(AcertadaFalladaComponent, { panelClass: 'custom-dialog-container' });
      dialogref.afterClosed().subscribe(result => {


        // CUANDO SE CIERRE SI SE HA LLEGADO Y ACERTADO EL PRIMER SEGURO
        if (this.dataservice.contadorPreguntaActual == 3) {

          // SE ABRIRA EL COMPONENTE DE ABRIR SEGUNDO SEGURO
          let dialogref = this.dialog.open(ColocaSeguroComponent, { panelClass: 'custom-dialog-container' });
          dialogref.afterClosed().subscribe(result => {

            // SE MOSTRARA EL DIALOGO DE DINERO
            this.muestraDialogoDinero();
            this.llamadaAbierto = false
            this.plantadoAbierto = false
            this.comprobarAbierto = false
            this.publicoAbierto = false
          })

          // SI NO SE HALLEGADO AL PRIMER SEGURO, CUANDO SE CIERRE EL COMPONENTE, SE MOSTRARA
          // SOLO EL COMPONENTE DEL DINERO
        } else
          this.muestraDialogoDinero();

      })


      // SI NO SE HA ACERTADO LA PREGUNTA
    } else {

      // PONEMOS QUE NO HA SIDO ACERTADA
      this.dataservice.acertada = false
      this.dataservice.plantado = false

      let dialogref = this.dialog.open(AcertadaFalladaComponent, { panelClass: 'custom-dialog-container' });
      dialogref.afterClosed().subscribe(result => {

        // REINICIAMOS TODOS LOS DATOS Y VOLVEMOS A LA VENTANA DE INICIO


        this.router.navigate(['/inicio']);
        clearInterval(this.dataservice.interval)

      })

    }

  }

  muestraDialogoDinero() {
    let dialogref = this.dialog.open(MuestraSaldoComponent, { panelClass: 'custom-dialog-container' });

    dialogref.afterClosed().subscribe(result => {

      // AL CERRAR LA VENTANA DEL DINERO, SI HEMOS LLEGADO AL MILLON Y ACERTADO
      if (this.dataservice.contadorPreguntaActual == 11) {

        // SE CAMBIARA EL TEXTO DE LA VENTANA ACERTADA/FALLADA
        this.dataservice.llegadoAMillon = true

        let dialogref = this.dialog.open(AcertadaFalladaComponent, { panelClass: 'custom-dialog-container' });
        dialogref.afterClosed().subscribe(result => {

          this.router.navigate(['/inicio']);

        })

        // SI NO SE HA LLEGADO AL MILLON TODAVIA
      } else {

        // SE REINICIA EL COLOR DE LAS RESPUESTAS QUITADAS POR EL COMODIN 50/50 EN CASO DE HABERLO USADO
        this.renderer.setStyle(this.respuestasComodin5050[this.indice3].nativeElement, 'background', "none")
        this.renderer.setStyle(this.respuestasComodin5050[this.indice4].nativeElement, 'background', "none")

        // SE AUMENTA EL CONTADOR DE LA PREGUNTA ACTUAL Y SE AUMENTA LA BARRA DE PROGRESO
        this.dataservice.contadorPreguntaActual++;
        this.dataservice.contadorParaProgreso += 8.6;

        // SE CAMBIA EL TEXTO DE LA VENTANA PARA OBTENER LA SIGUIENTE PREGUNTA
        this.renderer.setStyle(this.barraProgreso.nativeElement, 'width', this.dataservice.contadorParaProgreso + "%")
        this.renderer.setProperty(this.tituloPregunta.nativeElement, 'textContent', this.titulosTodasLasPreguntas[this.dataservice.contadorPreguntaActual]);
        this.renderer.setProperty(this.respuesta1.nativeElement, 'textContent', "A) " + this.respuestas1TodasLasPreguntas[this.dataservice.contadorPreguntaActual]);
        this.renderer.setProperty(this.respuesta2.nativeElement, 'textContent', "B) " + this.respuestas2TodasLasPreguntas[this.dataservice.contadorPreguntaActual]);
        this.renderer.setProperty(this.respuesta3.nativeElement, 'textContent', "C) " + this.respuestas3TodasLasPreguntas[this.dataservice.contadorPreguntaActual]);
        this.renderer.setProperty(this.respuesta4.nativeElement, 'textContent', "D) " + this.respuestas4TodasLasPreguntas[this.dataservice.contadorPreguntaActual]);

        // SE VUELVEN A ELEGIR LAS RESPUESTAS POSIBLES Y LA CORRECTA
        this.dataservice.respuestasPosibles = this.preguntasElegidas[this.dataservice.contadorPreguntaActual].respuestas
        this.dataservice.respuestaCorrecta = this.preguntasElegidas[this.dataservice.contadorPreguntaActual].respuestaCorrecta

        // Y SE REINICIA DE NUEVO VARIOS DATOS
        this.DesclickeaRespuesta();
        this.desarrolloComodin5050();
        this.contadorCronometro = this.dataservice.tiempoCronometro
        this.cronometro()
      }

    });

  }

  Plantarse() {
    this.sonarClick()
    this.arreglaBugDialogo();
    this.llamadaAbierto = true
    this.plantadoAbierto = true
    this.comprobarAbierto = true
    this.publicoAbierto = true
    // SE PONE QUE SE HA PLANTADO PARA EL TEXTO DEL COMPONENTE ACERTADO/FALLADO
    this.dataservice.plantado = true
    this.dataservice.acertada = false

    // SE QUITA EL CONTADOR
    clearInterval(this.dataservice.interval)

    let dialogref = this.dialog.open(AcertadaFalladaComponent, { panelClass: 'custom-dialog-container' });
    dialogref.afterClosed().subscribe(result => {
      clearInterval(this.dataservice.interval)

      this.router.navigate(['/inicio']);
      this.llamadaAbierto = false
      this.plantadoAbierto = false
      this.comprobarAbierto = false
      this.publicoAbierto = false
    })

  }


  DesclickeaRespuesta() {

    // SE RECORREN TODAS LOS ELEMENTOS DE RESPUESTA, SI NO TIENE EL COLOR DE LA RESPUESTA CLICKEADA
    // SE VUELVEN AL COLOR NORMAL
    this.btnRespuesta.forEach((btn) => {
      if (this.renderer) {
        if (btn.nativeElement.style.background != "rgb(221, 221, 221)")
          this.renderer.setStyle(btn.nativeElement, 'background', 'none');
      }
    });
  }

  click5050() {
    // event.target.innerHTML = "&#10060;";
    this.sonarClick()

    // SI NO SE HA USADO ANTERIORMENTE EL COMODIN
    if (!this.dataservice.usadoComodin50) {
      this.cincAbierto = true
      // SE COLOCA LA X EN EL BOTON DEL COMODIN
      this.renderer.setProperty(this.cincuenta1.nativeElement, 'innerHTML', '&#10060;');
      this.renderer.setProperty(this.cincuenta2.nativeElement, 'innerHTML', '&#10060;');

      // SE QUITAN 2 RESPUESTAS EN ESTE CASO, LAS DEL INDICE 3 Y 4, ANTERIORMENTE ESCOGIDOS
      // MEDAINTE EL METODO DE DESARROLLOCOMODIN5050
      this.renderer.setStyle(this.respuestasComodin5050[this.indice3].nativeElement, 'background', "#dddddd")
      this.renderer.setStyle(this.respuestasComodin5050[this.indice4].nativeElement, 'background', "#dddddd")

      this.dataservice.usadoComodin50 = true;
      this.dataservice.comodinesUsados++
    }

  }

  clickLLamada() {
    this.sonarClick()

    this.arreglaBugDialogo();


    // SI NO SE HA USADO ANTERIORMENTE EL COMODIN DE LA LLAMADA
    if (!this.dataservice.usadoComodinLLamada) {
      this.llamadaAbierto = true
      this.plantadoAbierto = true
      this.comprobarAbierto = true
      this.publicoAbierto = true
      // SE PAUSA EL INTERVALO
      this.dataservice.intervaloDone = true
      this.renderer.setProperty(this.llamada1.nativeElement, 'innerHTML', '&#10060;');
      this.renderer.setProperty(this.llamada2.nativeElement, 'innerHTML', '&#10060;');

      // SE ABRE EL COMPONENTE DEL COMODIN DE LA LLAMADA
      let dia = this.dialog.open(ComodinLLamadaComponent, { panelClass: 'custom-dialog-container' });
      this.dataservice.usadoComodinLLamada = true;
      this.dataservice.comodinesUsados++
      dia.afterClosed().subscribe(result => {

        this.llamadaAbierto = false
        this.plantadoAbierto = false
        this.comprobarAbierto = false
        this.publicoAbierto = false

      })

    }
  }

  clickPublico() {
    this.sonarClick()
    this.arreglaBugDialogo();

    if (!this.dataservice.usadoComodinPublico) {
      this.llamadaAbierto = true
      this.plantadoAbierto = true
      this.comprobarAbierto = true
      this.publicoAbierto = true

      this.dataservice.intervaloDone = true
      this.renderer.setProperty(this.publico2.nativeElement, 'innerHTML', '&#10060;');
      this.renderer.setProperty(this.publico1.nativeElement, 'innerHTML', '&#10060;');
      let dia = this.dialog.open(ComodinPublicoComponent, { panelClass: 'custom-dialog-container' });
      this.dataservice.usadoComodinPublico = true;
      this.dataservice.comodinesUsados++
      dia.afterClosed().subscribe(result => {

        this.llamadaAbierto = false
        this.plantadoAbierto = false
        this.comprobarAbierto = false
        this.publicoAbierto = false
      })
    }

  }

  sonarClick() {
    this.click.nativeElement.play();

  }

  sonarHover() {
    this.hover.nativeElement.play();

  }



  cronometro() {

    // SE CREA EL INTERVALO EN EL SERVICIO DE DATOS, PARA PODER RECOGERLO EN DISTINTAS VENTANAS
    this.dataservice.interval = setInterval(() => {
      if (!this.dataservice.intervaloDone) {

        // SI NO SE HA PAUSADO O LLEGADO A 0, SE QUITA 1 SEGUNDO
        this.contadorCronometro--;
      }

      // SI SE LLEGA A 0
      if (this.contadorCronometro == 0) {

        this.arreglaBugDialogo();


        // SE HACE COMO SI SE HUBIESE FALLADO LA PREGUNTA
        this.dataservice.acertada = false
        this.dataservice.plantado = false
        clearInterval(this.dataservice.interval)

        let dialogref = this.dialog.open(AcertadaFalladaComponent, { panelClass: 'custom-dialog-container', autoFocus: false });
        dialogref.afterClosed().subscribe(result => {

          this.router.navigate(['/inicio']);

        })
      }
    }, 1000)
  }



  desarrolloComodin5050() {
    this.respuestasComodin5050 = []
    this.respuestas = []

    // SE ALMACENAN LAS RESPUESTAS ACTUALES
    this.respuestasComodin5050.push(this.respuesta1)
    this.respuestasComodin5050.push(this.respuesta2)
    this.respuestasComodin5050.push(this.respuesta3)
    this.respuestasComodin5050.push(this.respuesta4)



    for (let entry of this.dataservice.respuestasPosibles) {
      this.respuestas.push(entry)
    }

    // SE OBTIENE EL INDICE DE LA RESPUESTA CORRECTA
    for (var _i = 0; _i < this.respuestas.length; _i++) {

      if (this.respuestas[_i] == this.dataservice.respuestaCorrecta)
        this.indiceCorrecto = _i
    }

    // SE ESCOGE EL SEGUNDO INDICE, EL CUAL DEBE DE SER DIFERENTE AL PRIMERO
    do {

      this.otroIndiceElegido = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

    } while (this.otroIndiceElegido == this.indiceCorrecto)


    // SE HACE LO MISMO CON LOS INDICES 3 Y 4, QUE SERA LAS RESPUESTAS QUE SE QUITARAN
    // CUANDO SE UTILIZE EL COMODIN DEL 50/50
    do {

      this.indice3 = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

    } while (this.indice3 == this.indiceCorrecto || this.indice3 == this.otroIndiceElegido)

    do {

      this.indice4 = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

    } while (this.indice4 == this.indiceCorrecto || this.indice4 == this.otroIndiceElegido || this.indice4 == this.indice3)




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











