import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { DataService } from 'src/app/services/data/data.service';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
interface Foo {
  [key: string]: boolean;
}
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
  keysPressed: Foo = {};
  guardarAbierto: boolean = false;

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
    private dialogRef: MatDialogRef<MuestraSaldoComponent>,
    private dataservice: DataService,
  ) {
    dialogRef.disableClose = true;

  }

  ngOnInit() {

    // //AÑADE LOS PUNTOS A LOS NUMEROS DEL HTML
    // registerLocaleData(es);


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
    // SE ALMACENAN LOS VALORES DEL SALDO DE EL COMPONENTE
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

    //SI YA SE HA ESTABLECIDO EL SEGUNDO SEGURO
    if (this.dataservice.seguroNuevo != 0) {

      // SE ESCOGE EL SALDO/PREGUNTA DEL HTML EN LA CUAL SE A ESTABLECIDO EL SEGUNDO SEGURO
      for (let index = 0; index < this.preguntas.length; index++) {

        // SE OBTIENE EL INDICE DEL SPAN DEL PARRAFO DEL SEGUNDO SEGURO,
        // SE COLOREA SU PARRAFO Y SE OBTIENE EL SALDO 
        if (this.preguntas[index].nativeElement.children[0].id == "pregunta" + this.dataservice.seguroNuevo) {
          this.preguntas[index].nativeElement.style.background = "rgb(91, 98, 141)"
          this.dataservice.dineroSegundoSeguro = parseInt((this.preguntas[this.dataservice.seguroNuevo - 1].nativeElement.children[0].innerHTML).replace(".", "").replace(".", ""))
        }
      }
    }

    // SE OBTIENE EL INDICE DEL SPAN DEL PARRAFO DE LA PREGUTA ACTUAL
    // SE COLOREA SU PARRAFO Y SE OBTIENE EL SALDO 
    for (let index = 0; index < this.preguntas.length; index++) {

      if (this.preguntas[index].nativeElement.children[0].id == "pregunta" + (this.dataservice.contadorPreguntaActual + 1)) {
        this.preguntas[index].nativeElement.style.background = "rgb(221, 221, 221)"
        this.dataservice.dineroAcumulado = parseInt((this.preguntas[index].nativeElement.children[0].innerHTML).replace(".", "").replace(".", ""))
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
