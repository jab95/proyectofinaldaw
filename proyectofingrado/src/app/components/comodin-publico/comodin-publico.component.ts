import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy, HostListener } from '@angular/core';
import * as CanvasJS from '../../../assets/canvasjs.min';
import { MatDialogRef } from "@angular/material";
import { DataService } from 'src/app/services/data/data.service';
interface Foo {
  [key: string]: boolean;
}
@Component({
  selector: 'app-comodin-publico',
  templateUrl: './comodin-publico.component.html',
  styleUrls: ['./comodin-publico.component.scss']
})
export class ComodinPublicoComponent implements OnInit, AfterViewInit {


  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;

  valores: number[] = []
  respuestas: string[] = []
  indiceCorrecto: number
  otroIndiceElegido: number
  indice3: number
  indice4: number
  valorIndiceCorrecto: number
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
    private dialogRef: MatDialogRef<ComodinPublicoComponent>,
    private dataservice: DataService,
  ) {
    dialogRef.disableClose = true;
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

  ngOnInit() {

    this.rellenaValores();

    //SE MUESTRA EL GRAFICO CON LOS VALORES OBTENIDOS Y LAS RESPUESTAS
    let chart = new CanvasJS.Chart("chartContainer", {
      title: {
        text: "Comodín del público"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: this.valores[0], label: "A" },
          { y: this.valores[1], label: "B" },
          { y: this.valores[2], label: "C" },
          { y: this.valores[3], label: "D" }
        ]
      }]
    });

    chart.render();


  }


  rellenaValores() {

    //SE ALMACENAN LAS RESPUESTAS ACTUALES
    for (let entry of this.dataservice.respuestasPosibles) {
      this.respuestas.push(entry)
    }

    //SE ELIJE EL INDICE CORRECTO DE ENTRE TODAS
    for (var _i = 0; _i < this.respuestas.length; _i++) {

      if (this.respuestas[_i] == this.dataservice.respuestaCorrecta)
        this.indiceCorrecto = _i
    }

    //SE ESCOGE OTRO INDICE DIFERENTE AL CORRECTO DE ENTRE 0 Y 3 
    do {

      this.otroIndiceElegido = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

    } while (this.otroIndiceElegido == this.indiceCorrecto)

    //SE ESCOGE OTRO INDICE DIFERENTE AL CORRECTO DE ENTRE 0 Y 3 
    do {

      this.indice3 = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

    } while (this.indice3 == this.indiceCorrecto || this.indice3 == this.otroIndiceElegido)


    //SE ESCOGE OTRO INDICE DIFERENTE AL CORRECTO DE ENTRE 0 Y 3 
    do {

      this.indice4 = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

    } while (this.indice4 == this.indiceCorrecto || this.indice4 == this.otroIndiceElegido || this.indice4 == this.indice3)

    // SE ESCOGE EL VALOR DEL GRAFICO PARA LA RESPUESTA CORRECTA DE ENTRE 80 Y 55
    this.valorIndiceCorrecto = Math.floor(Math.random() * (80 - 55 + 1)) + 55;
    this.valores[this.indiceCorrecto] = this.valorIndiceCorrecto

    // SE ESCOGE EL VALOR DEL GRAFICO PARA LA SEGUNDA RESPUESTA ELEGIDA DE ENTRE 80 Y 55
    // PUEDE QUE ESTE VALOR DE ESTA RESPUESTA SEA MAYOR A LA RESPUESTA CORRECTA
    // ASI ES AMS ENTRETENIDO YA QUE LA RESPUESTA CON LAS VALOR PUEDE NO SER LA CORRECTA
    this.valores[this.otroIndiceElegido] = Math.floor(Math.random() * (80 - 55 + 1)) + 55;

    // SE ESCOGE EL VALOR DEL GRAFICO PARA LAS OTRAS 2 RESPUESTAS DE ENTRE 45 Y 15
    this.valores[this.indice3] = Math.floor(Math.random() * (45 - 15 + 1)) + 15;
    this.valores[this.indice4] = Math.floor(Math.random() * (45 - 15 + 1)) + 15;

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
