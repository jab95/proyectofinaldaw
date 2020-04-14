import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog } from "@angular/material";
import { DataService } from 'src/app/services/data/data.service';
import { AddRankingComponent } from '../add-ranking/add-ranking.component';
import { Router } from '@angular/router';

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

  constructor(
    private dialogRef: MatDialogRef<AcertadaFalladaComponent>,
    private dataservice: DataService,
    public dialog: MatDialog,
    private router: Router,

  ) {
    dialogRef.disableClose = true;

  }

  ngAfterViewInit(): void {
    this.hover.nativeElement.volume = "0.2";

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

  ngOnInit() {

    if (!this.dataservice.plantado) {
      if (!this.dataservice.acertada) {
        if (this.dataservice.dineroAcumulado < 1000) {
          this.saldoAcumulado = 0
          this.dataservice.dineroAcumulado = 0

        } else if (this.dataservice.dineroAcumulado >= 1000 && this.dataservice.dineroAcumulado < this.dataservice.dineroSegundoSeguro) {
          this.saldoAcumulado = 1000
          this.dataservice.dineroAcumulado = this.saldoAcumulado

        } else if (this.dataservice.dineroAcumulado >= this.dataservice.dineroSegundoSeguro) {
          this.saldoAcumulado = this.dataservice.dineroSegundoSeguro
          this.dataservice.dineroAcumulado = this.saldoAcumulado

        }
      }
    } else {
      this.saldoAcumulado = this.dataservice.dineroAcumulado

    }


  }


  aceptarComodin() {

    this.click.nativeElement.play();
    this.dialogRef.close();

  }


  guardarRanking() {
    let dialogoAñadeRanking = this.dialog.open(AddRankingComponent, { panelClass: 'custom-dialog-container' });
    dialogoAñadeRanking.afterClosed().subscribe(result => {

      this.dialogRef.close();
      this.router.navigate(['/home']);

    })

  }



  sonarHover() {
    this.hover.nativeElement.play();

  }

}
