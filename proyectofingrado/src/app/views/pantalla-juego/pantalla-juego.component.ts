import { Component, OnInit, ViewChild, Renderer2, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
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

  preguntas: Pregunta[] = []
  preguntasElegidas: Pregunta[] = []
  respuestasAcertadasTodasLasPreguntas: string[] = []
  respuestas1TodasLasPreguntas: string[] = []
  respuestas2TodasLasPreguntas: string[] = []
  respuestas3TodasLasPreguntas: string[] = []
  respuestas4TodasLasPreguntas: string[] = []
  titulosTodasLasPreguntas: string[] = []
  contador2: number = 0
  contadorCronometro: number = 35
  continuaInterval: boolean = false;
  valores: number[] = []
  respuestas: string[] = []
  indiceCorrecto: number
  otroIndiceElegido: number
  indice3: number
  indice4: number
  valorIndiceCorrecto: number
  respuestasComodin5050: ElementRef[] = []

  constructor(private elRef: ElementRef,
    private renderer: Renderer2,
    public dialog: MatDialog,
    public dataservice: DataService,
    private router: Router,
    private preguntasService: PreguntasService,
    // private dialogRef: MatDialogRef<CargandoComponent>,

  ) {


  }

  ngOnInit() {
    let dialogo = this.dialog.open(CargandoComponent, { panelClass: 'custom-dialog-container' });


    this.getPreguntasNivel1();
    this.getPreguntasNivel2();
    this.getPreguntasNivel3(dialogo);

    // dialogo.close()
  }

  ngAfterViewInit(): void {
    this.hover.nativeElement.volume = "0.2";
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



      preguntas = preguntas.sort(function () { return Math.random() - 0.5 })

      for (let index = 0; index < 4; index++) {

        this.preguntasElegidas.push(preguntas[index])

      }

      for (let index = 0; index < 4; index++) {
        this.respuestasAcertadasTodasLasPreguntas.push(this.preguntasElegidas[index].respuestaCorrecta)
        this.respuestas1TodasLasPreguntas.push(this.preguntasElegidas[index].respuestas[0])
        this.respuestas2TodasLasPreguntas.push(this.preguntasElegidas[index].respuestas[1])
        this.respuestas3TodasLasPreguntas.push(this.preguntasElegidas[index].respuestas[2])
        this.respuestas4TodasLasPreguntas.push(this.preguntasElegidas[index].respuestas[3])
        this.titulosTodasLasPreguntas.push(this.preguntasElegidas[index].pregunta)

      }

      this.RellenaDatosPrimeraVez();

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

      dialogo.close()
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

    this.renderer.setProperty(this.tituloPregunta.nativeElement, 'innerHTML', this.preguntasElegidas[0].pregunta);
    this.renderer.setProperty(this.respuesta1.nativeElement, 'innerHTML', this.preguntasElegidas[0].respuestas[0]);
    this.renderer.setProperty(this.respuesta2.nativeElement, 'innerHTML', this.preguntasElegidas[0].respuestas[1]);
    this.renderer.setProperty(this.respuesta3.nativeElement, 'innerHTML', this.preguntasElegidas[0].respuestas[2]);
    this.renderer.setProperty(this.respuesta4.nativeElement, 'innerHTML', this.preguntasElegidas[0].respuestas[3]);
  }


  clickRespuesta(event: any) {
    this.sonarClick()
    if (event.target.style.background != "rgb(221, 221, 221)") {

      this.dataservice.respuestaClickeada = event.target.innerHTML;

      this.DesclickeaRespuesta();

      this.renderer.setStyle(event.target, 'background', 'rgb(198, 216, 239)');
    }
  }

  ComprobarRespuesta() {
    this.sonarClick()
    clearInterval(this.dataservice.interval)

    if (this.dataservice.respuestaClickeada == this.respuestasAcertadasTodasLasPreguntas[this.dataservice.contadorPreguntaActual]) {

      this.dataservice.acertada = true
      this.dataservice.plantado = false


      let dialogref = this.dialog.open(AcertadaFalladaComponent, { panelClass: 'custom-dialog-container' });
      dialogref.afterClosed().subscribe(result => {

        if (this.dataservice.contadorPreguntaActual == 3) {

          let dialogref = this.dialog.open(ColocaSeguroComponent, { panelClass: 'custom-dialog-container' });
          dialogref.afterClosed().subscribe(result => {

            this.muestraDialogoDinero();

          })

        } else
          this.muestraDialogoDinero();

      })

    } else {

      this.dataservice.acertada = false
      this.dataservice.plantado = false

      let dialogref = this.dialog.open(AcertadaFalladaComponent, { panelClass: 'custom-dialog-container' });
      dialogref.afterClosed().subscribe(result => {

        this.dataservice.usadoComodin50 = false
        this.dataservice.usadoComodinLLamada = false
        this.dataservice.usadoComodinPublico = false
        this.dataservice.respuestasPosibles = []
        this.dataservice.contadorPreguntaActual = 0
        this.dataservice.intervaloDone = false
        this.dataservice.contadorParaProgreso = 0
        this.dataservice.seguroNuevo = 0
        this.dataservice.llegadoAMillon = false

        this.router.navigate(['/inicio']);

      })

    }

  }

  muestraDialogoDinero() {
    let dialogref = this.dialog.open(MuestraSaldoComponent, { panelClass: 'custom-dialog-container' });

    dialogref.afterClosed().subscribe(result => {

      if (this.dataservice.contadorPreguntaActual == 11) {

        this.dataservice.llegadoAMillon = true

        let dialogref = this.dialog.open(AcertadaFalladaComponent, { panelClass: 'custom-dialog-container' });
        dialogref.afterClosed().subscribe(result => {

          this.dataservice.usadoComodin50 = false
          this.dataservice.usadoComodinLLamada = false
          this.dataservice.usadoComodinPublico = false
          this.dataservice.respuestasPosibles = []
          this.dataservice.contadorPreguntaActual = 0
          this.dataservice.intervaloDone = false
          this.dataservice.contadorParaProgreso = 0
          this.dataservice.seguroNuevo = 0
          this.dataservice.llegadoAMillon = false

          this.router.navigate(['/inicio']);

        })

      } else {

        this.renderer.setStyle(this.respuestasComodin5050[this.indice3].nativeElement, 'background', "none")
        this.renderer.setStyle(this.respuestasComodin5050[this.indice4].nativeElement, 'background', "none")

        this.dataservice.contadorPreguntaActual++;
        this.dataservice.contadorParaProgreso += 8.6;

        this.renderer.setStyle(this.barraProgreso.nativeElement, 'width', this.dataservice.contadorParaProgreso + "%")
        this.renderer.setProperty(this.tituloPregunta.nativeElement, 'innerHTML', this.titulosTodasLasPreguntas[this.dataservice.contadorPreguntaActual]);
        this.renderer.setProperty(this.respuesta1.nativeElement, 'innerHTML', this.respuestas1TodasLasPreguntas[this.dataservice.contadorPreguntaActual]);
        this.renderer.setProperty(this.respuesta2.nativeElement, 'innerHTML', this.respuestas2TodasLasPreguntas[this.dataservice.contadorPreguntaActual]);
        this.renderer.setProperty(this.respuesta3.nativeElement, 'innerHTML', this.respuestas3TodasLasPreguntas[this.dataservice.contadorPreguntaActual]);
        this.renderer.setProperty(this.respuesta4.nativeElement, 'innerHTML', this.respuestas4TodasLasPreguntas[this.dataservice.contadorPreguntaActual]);

        this.dataservice.respuestasPosibles = this.preguntasElegidas[this.dataservice.contadorPreguntaActual].respuestas
        this.dataservice.respuestaCorrecta = this.preguntasElegidas[this.dataservice.contadorPreguntaActual].respuestaCorrecta

        this.DesclickeaRespuesta();
        this.desarrolloComodin5050();
        this.contadorCronometro = 35
        this.cronometro()
      }

    });

  }

  Plantarse() {
    this.sonarClick()

    this.dataservice.plantado = true
    this.dataservice.acertada = false
    clearInterval(this.dataservice.interval)

    let dialogref = this.dialog.open(AcertadaFalladaComponent, { panelClass: 'custom-dialog-container' });
    dialogref.afterClosed().subscribe(result => {

      this.dataservice.usadoComodin50 = false
      this.dataservice.usadoComodinLLamada = false
      this.dataservice.usadoComodinPublico = false
      this.dataservice.respuestasPosibles = []
      this.dataservice.contadorPreguntaActual = 0
      this.dataservice.intervaloDone = false
      this.dataservice.contadorParaProgreso = 0
      this.dataservice.seguroNuevo = 0
      this.dataservice.llegadoAMillon = false

      this.router.navigate(['/inicio']);

    })

  }


  DesclickeaRespuesta() {

    this.btnRespuesta.forEach((btn) => {
      if (this.renderer) {
        if (btn.nativeElement.style.background != "rgb(221, 221, 221)")
          this.renderer.setStyle(btn.nativeElement, 'background', 'none');
      }
    });
  }

  click5050(event: any) {
    // event.target.innerHTML = "&#10060;";
    this.sonarClick()

    if (!this.dataservice.usadoComodin50) {
      this.renderer.setProperty(this.cincuenta1.nativeElement, 'innerHTML', '&#10060;');
      this.renderer.setProperty(this.cincuenta2.nativeElement, 'innerHTML', '&#10060;');
      this.renderer.setStyle(this.respuestasComodin5050[this.indice3].nativeElement, 'background', "#dddddd")
      this.renderer.setStyle(this.respuestasComodin5050[this.indice4].nativeElement, 'background', "#dddddd")

      this.dataservice.usadoComodin50 = true;
    }

  }

  clickLLamada() {
    this.sonarClick()

    if (!this.dataservice.usadoComodinLLamada) {
      this.dataservice.intervaloDone = true
      this.renderer.setProperty(this.llamada1.nativeElement, 'innerHTML', '&#10060;');
      this.renderer.setProperty(this.llamada2.nativeElement, 'innerHTML', '&#10060;');
      this.dialog.open(ComodinLLamadaComponent, { panelClass: 'custom-dialog-container' });
      this.dataservice.usadoComodinLLamada = true;
    }
  }

  clickPublico() {
    this.sonarClick()

    if (!this.dataservice.usadoComodinPublico) {
      this.dataservice.intervaloDone = true
      this.renderer.setProperty(this.publico2.nativeElement, 'innerHTML', '&#10060;');
      this.renderer.setProperty(this.publico1.nativeElement, 'innerHTML', '&#10060;');
      this.dialog.open(ComodinPublicoComponent, { panelClass: 'custom-dialog-container' });
      this.dataservice.usadoComodinPublico = true;
    }

  }

  sonarClick() {
    this.click.nativeElement.play();

  }

  sonarHover() {
    this.hover.nativeElement.play();

  }



  cronometro() {
    this.dataservice.interval = setInterval(() => {
      if (!this.dataservice.intervaloDone) {
        this.contadorCronometro--;
      }
      if (this.contadorCronometro == 0) {

        this.dataservice.acertada = false
        this.dataservice.plantado = false
        clearInterval(this.dataservice.interval)

        let dialogref = this.dialog.open(AcertadaFalladaComponent, { panelClass: 'custom-dialog-container' });
        dialogref.afterClosed().subscribe(result => {



          this.dataservice.usadoComodin50 = false
          this.dataservice.usadoComodinLLamada = false
          this.dataservice.usadoComodinPublico = false
          this.dataservice.respuestasPosibles = []
          this.dataservice.contadorPreguntaActual = 0
          this.dataservice.intervaloDone = false
          this.dataservice.contadorParaProgreso = 0
          this.dataservice.seguroNuevo = 0
          this.dataservice.llegadoAMillon = false

          this.router.navigate(['/inicio']);



        })
      }
    }, 1000)
  }



  desarrolloComodin5050() {
    this.respuestasComodin5050 = []
    this.respuestas = []

    this.respuestasComodin5050.push(this.respuesta1)
    this.respuestasComodin5050.push(this.respuesta2)
    this.respuestasComodin5050.push(this.respuesta3)
    this.respuestasComodin5050.push(this.respuesta4)



    for (let entry of this.dataservice.respuestasPosibles) {
      this.respuestas.push(entry)
    }

    for (var _i = 0; _i < this.respuestas.length; _i++) {

      if (this.respuestas[_i] == this.dataservice.respuestaCorrecta)
        this.indiceCorrecto = _i
    }

    do {

      this.otroIndiceElegido = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

    } while (this.otroIndiceElegido == this.indiceCorrecto)

    do {

      this.indice3 = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

    } while (this.indice3 == this.indiceCorrecto || this.indice3 == this.otroIndiceElegido)

    do {

      this.indice4 = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

    } while (this.indice4 == this.indiceCorrecto || this.indice4 == this.otroIndiceElegido || this.indice4 == this.indice3)




  }




}











