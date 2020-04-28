import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { DataService } from 'src/app/services/data/data.service';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
  selector: 'app-muestra-saldo',
  templateUrl: './muestra-saldo.component.html',
  styleUrls: ['./muestra-saldo.component.scss']
})
export class MuestraSaldoComponent implements OnInit, AfterViewInit {



  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;
  @ViewChild('pregunta1', { static: false }) pregunta1: ElementRef;
  @ViewChild('pregunta2', { static: false }) pregunta2: ElementRef;
  @ViewChild('pregunta3', { static: false }) pregunta3: ElementRef;
  @ViewChild('pregunta4', { static: false }) pregunta4: ElementRef;
  @ViewChild('pregunta5', { static: false }) pregunta5: ElementRef;
  @ViewChild('pregunta6', { static: false }) pregunta6: ElementRef;
  @ViewChild('pregunta7', { static: false }) pregunta7: ElementRef;
  @ViewChild('pregunta8', { static: false }) pregunta8: ElementRef;
  @ViewChild('pregunta9', { static: false }) pregunta9: ElementRef;
  @ViewChild('pregunta10', { static: false }) pregunta10: ElementRef;
  @ViewChild('pregunta11', { static: false }) pregunta11: ElementRef;
  @ViewChild('pregunta12', { static: false }) pregunta12: ElementRef;
  preguntas: ElementRef[] = []

  constructor(
    private dialogRef: MatDialogRef<MuestraSaldoComponent>,
    private dataservice: DataService,
  ) {
    dialogRef.disableClose = true;

  }

  ngOnInit() {
    registerLocaleData(es);


  }

  ngAfterViewInit(): void {
    this.hover.nativeElement.volume = "0.2";

    this.preguntas.push(this.pregunta1)
    this.preguntas.push(this.pregunta2)
    this.preguntas.push(this.pregunta3)
    this.preguntas.push(this.pregunta4)
    this.preguntas.push(this.pregunta5)
    this.preguntas.push(this.pregunta6)
    this.preguntas.push(this.pregunta7)
    this.preguntas.push(this.pregunta8)
    this.preguntas.push(this.pregunta9)
    this.preguntas.push(this.pregunta10)
    this.preguntas.push(this.pregunta11)
    this.preguntas.push(this.pregunta12)

    if (this.dataservice.seguroNuevo != 0) {

      for (let index = 0; index < this.preguntas.length; index++) {
        if (this.preguntas[index].nativeElement.children[0].id == "pregunta" + this.dataservice.seguroNuevo) {
          this.preguntas[index].nativeElement.style.background = "rgb(91, 98, 141)"
          this.dataservice.dineroSegundoSeguro = parseInt(this.preguntas[this.dataservice.seguroNuevo - 1].nativeElement.children[0].innerHTML)
        }
      }
    }

    for (let index = 0; index < this.preguntas.length; index++) {

      if (this.preguntas[index].nativeElement.children[0].id == "pregunta" + (this.dataservice.contadorPreguntaActual + 1)) {
        this.preguntas[index].nativeElement.style.background = "rgb(221, 221, 221)"
        this.dataservice.dineroAcumulado = parseInt(this.preguntas[index].nativeElement.children[0].innerHTML)
      }
    }
  }


  aceptarComodin() {

    // this.dataservice.intervaloDone = false
    this.click.nativeElement.play();
    this.dialogRef.close();

  }

  sonarHover() {
    this.hover.nativeElement.play();

  }

}
