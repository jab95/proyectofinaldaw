import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { DataService } from 'src/app/services/data/data.service';

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

  constructor(
    private dialogRef: MatDialogRef<ComodinLLamadaComponent>,
    private dataservice: DataService,
  ) {
    dialogRef.disableClose = true;
    setTimeout(() => {
      this.llamando = false
      this.escogerPalabras()
    }, 3000);

  }

  ngOnInit() {


  }
  ngAfterViewInit(): void {
    this.hover.nativeElement.volume = "0.2";
  }


  escogerPalabras() {

    for (let entry of this.dataservice.respuestasPosibles) {
      this.respuestas.push(entry)
    }

    for (var _i = 0; _i < this.respuestas.length; _i++) {

      if (this.respuestas[_i] == this.dataservice.respuestaCorrecta)
        this.indiceCorrecto = _i
    }
    this.indicesElegidos.push(this.indiceCorrecto)

    do {

      this.otroIndiceElegido = Math.floor(Math.random() * (3 - 0 + 1)) + 0;

    } while (this.otroIndiceElegido == this.indiceCorrecto)
    this.indicesElegidos.push(this.otroIndiceElegido)

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
