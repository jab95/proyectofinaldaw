import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import * as CanvasJS from '../../../assets/canvasjs.min';
import { MatDialogRef } from "@angular/material";
import { DataService } from 'src/app/services/data/data.service';

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


  constructor(
    private dialogRef: MatDialogRef<ComodinPublicoComponent>,
    private dataservice: DataService,
  ) {
    dialogRef.disableClose = true;
  }

  ngAfterViewInit(): void {
    this.hover.nativeElement.volume = "0.2";
  }

  ngOnInit() {

    this.rellenaValores();

    let chart = new CanvasJS.Chart("chartContainer", {
      title: {
        text: "Comodín del público"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: this.valores[0], label: this.dataservice.respuestasPosibles[0] },
          { y: this.valores[1], label: this.dataservice.respuestasPosibles[1] },
          { y: this.valores[2], label: this.dataservice.respuestasPosibles[2] },
          { y: this.valores[3], label: this.dataservice.respuestasPosibles[3] }
        ]
      }]
    });

    chart.render();


  }


  rellenaValores() {

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

    this.valorIndiceCorrecto = Math.floor(Math.random() * (80 - 55 + 1)) + 55;


    this.valores[this.indiceCorrecto] = this.valorIndiceCorrecto
    this.valores[this.otroIndiceElegido] = Math.floor(Math.random() * (80 - 55 + 1)) + 55;
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
