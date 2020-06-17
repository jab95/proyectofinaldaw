import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy, Renderer2, HostListener } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { DataService } from 'src/app/services/data/data.service';
interface Foo {
  [key: string]: boolean;
}
@Component({
  selector: 'app-comodin-llamada',
  templateUrl: './comodin-llamada.component.html',
  styleUrls: ['./comodin-llamada.component.scss']
})
export class ComodinLLamadaComponent implements OnInit, AfterViewInit {

  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;
  llamando: boolean = true

  valores: number[] = []
  respuestas: string[] = []
  indiceCorrecto: number
  otroIndiceElegido: number
  valorIndiceCorrecto: number
  indicePalabraEscogida: number
  palabraEscogida: string
  indicesElegidos: number[] = []
  keysPressed: Foo = {};

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keysPressed[event.key] = true;
    if (this.keysPressed['Alt'] && event.key == 'Enter') {
      this.aceptarComodin();
    }

  }
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent2(event: KeyboardEvent) {
    delete this.keysPressed[event.key];

  }
  constructor(
    private dialogRef: MatDialogRef<ComodinLLamadaComponent>,
    private dataservice: DataService,
  ) {
    dialogRef.disableClose = true;

    // SE COLOCA UN TEMPORIZADOR DE 3 SEGUNDOS PARA DAR MAS REALISMO A LA LLAMADA
    setTimeout(() => {

      this.llamando = false
      this.escogerPalabras()
    }, 3000);

  }

  ngOnInit() {


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
  }


  //EL METODO PARA ESCOGER 2 INDICES POSIBLES, SIENDO 1 EL CORRECTO
  escogerPalabras() {

    //SE RECOGEN LAS RESPUESTAS DE LA PREGUNTA ACTUAL
    for (let entry of this.dataservice.respuestasPosibles) {
      this.respuestas.push(entry)
    }

    //SE COMPRUEBAN LAS RESPUESTAS, SI SE DA CON LA RESPUESTA CORRECTA, SE GUARDA EL INDICE
    // DE LA RESPUESTA
    for (var _i = 0; _i < this.respuestas.length; _i++) {

      if (this.respuestas[_i] == this.dataservice.respuestaCorrecta)
        this.indiceCorrecto = _i
    }
    this.indicesElegidos.push(this.indiceCorrecto)

    //SE ESCOGE OTRO INDICE DE RESPUESTA DIFERENTE AL INDICE DE LA RESPUESTA CORRECTA
    do {

      this.otroIndiceElegido = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

    } while (this.otroIndiceElegido == this.indiceCorrecto)
    this.indicesElegidos.push(this.otroIndiceElegido)

    //SE ESCOGE LA RESPUESTA DE ENTRE LAS 2 OBTENIDAS, 
    // TENIENDO UN 50% DE PROBABILIDADES DE QUE TE SALGA LA RESPUESTA CORRECTA
    this.indicePalabraEscogida = Math.floor(Math.random() * 2);
    this.palabraEscogida = this.respuestas[this.indicesElegidos[this.indicePalabraEscogida]]

  }

  aceptarComodin() {

    this.dataservice.intervaloDone = false
    this.click.nativeElement.play();
    this.dialogRef.close();

  }

  sonarHover() {
    this.hover.nativeElement.play();

  }
}
