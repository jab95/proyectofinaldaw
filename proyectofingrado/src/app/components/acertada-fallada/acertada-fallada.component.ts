import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { MatDialogRef, MatDialog } from "@angular/material";
import { DataService } from 'src/app/services/data/data.service';
import { AddRankingComponent } from '../add-ranking/add-ranking.component';
import { Router } from '@angular/router';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
interface Foo {
  [key: string]: boolean;
}
@Component({
  selector: 'app-acertada-fallada',
  templateUrl: './acertada-fallada.component.html',
  styleUrls: ['./acertada-fallada.component.scss']
})
export class AcertadaFalladaComponent implements OnInit, AfterViewInit {



  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;
  @ViewChild('acertadafallida', { static: false }) acertadafallida: ElementRef;
  @ViewChild('llegaacomodin', { static: false }) llegaacomodin: ElementRef;
  @ViewChild('aceptarsalir', { static: false }) aceptarsalir: ElementRef;

  saldoAcumulado: number
  keysPressed: Foo = {};
  guardarAbierto: boolean = false;

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keysPressed[event.key] = true;
    if (this.keysPressed['Alt'] && event.key == 'Enter') {
      this.aceptarComodin();
    }
    if (this.keysPressed['Alt'] && event.key == '1') {
      if (!this.guardarAbierto)
        this.guardarRanking();
    }
  }
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent2(event: KeyboardEvent) {
    delete this.keysPressed[event.key];

  }
  constructor(
    private dialogRef: MatDialogRef<AcertadaFalladaComponent>,
    private dataservice: DataService,
    public dialog: MatDialog,
    private router: Router,

  ) {
    dialogRef.disableClose = true;

  }


  //ESTO COLOCARA EL TEXTO INDICADO EN LA VENTANA DE ACERTADA O FALLADO, SEGUN SI SE HA PLANTADO, 
  //SI HAS LLEGADO AL MILLON, SI HAS ACERTADO O SI HAS FALLADO

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


    if (!this.dataservice.plantado) {
      if (!this.dataservice.llegadoAMillon) {

        this.acertadafallida.nativeElement.innerHTML = this.dataservice.acertada ? "PREGUNTA ACERTADA" : "PREGUNTA FALLADA";

        if (this.dataservice.acertada)
          this.aceptarsalir.nativeElement.innerHTML = "Continuar"
        else
          this.aceptarsalir.nativeElement.innerHTML = "Salir"
      }
      else {
        this.acertadafallida.nativeElement.innerHTML = "¡FELICIDADES!"
        this.aceptarsalir.nativeElement.innerHTML = "Salir"

      }


    } else {
      this.acertadafallida.nativeElement.innerHTML = "TE HAS PLANTADO"
      this.aceptarsalir.nativeElement.innerHTML = "Salir"

    }


  }

  //ESTE METODO ASIGNARA EL DINERO QUE SE HA ACUMULADO 

  ngOnInit() {

    registerLocaleData(es);

    if (!this.dataservice.plantado) {
      //SI SE HA FALLADO LA PREGUNTA
      if (!this.dataservice.acertada) {

        //SI HAS ACUMULADO MENOS DE 1000 EUROS, TE VAS CON 0 
        if (this.dataservice.dineroAcumulado < 1000) {

          //LA VARIABLE SALDOACUMULADO ES LA QUE SE MUESTRA EN EL HTML DEL COMPONENTE
          this.saldoAcumulado = 0
          this.dataservice.dineroAcumulado = 0

          //SI HAS ACUMULADO ENTRE 1000 EUROS Y EL DINERO DEL SEGUNDO SEGURO, TE VAS CON 1000 
        } else if (this.dataservice.dineroAcumulado >= 1000 && this.dataservice.dineroAcumulado < this.dataservice.dineroSegundoSeguro) {
          this.saldoAcumulado = 1000
          this.dataservice.dineroAcumulado = this.saldoAcumulado

          //SI HAS ACUMULADO MAS DEL DINERO DEL SEGUNDO SEGURO, TE VAS CON EL DINERO DEL 2 SEGURO 
        } else if (this.dataservice.dineroAcumulado >= this.dataservice.dineroSegundoSeguro) {
          this.saldoAcumulado = this.dataservice.dineroSegundoSeguro
          this.dataservice.dineroAcumulado = this.saldoAcumulado

        }
      }

      //SI HAS ACERTADO LA PREGUNTA, SE TE ACUMULA EL DINERO QUE HAYAS CONSEGUIDO
    } else {
      this.saldoAcumulado = this.dataservice.dineroAcumulado

    }


  }


  aceptarComodin() {

    this.click.nativeElement.play();
    this.dialogRef.close();

  }


  //SE ABRIRA EL COMPONENTE DE GUARDAR RANKING
  guardarRanking() {
    this.guardarAbierto = true
    let dialogoAñadeRanking = this.dialog.open(AddRankingComponent, { panelClass: 'custom-dialog-container' });
    //QUE OCURRE AL CERRAR EL COMPONENTE
    dialogoAñadeRanking.afterClosed().subscribe(result => {
      this.guardarAbierto = false

      this.dialogRef.close();
      this.router.navigate(['/inicio']);

    })

  }



  sonarHover() {
    this.hover.nativeElement.play();

  }

}
