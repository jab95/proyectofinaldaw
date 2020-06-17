import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { Ranking } from 'src/app/models/rankig';
import { RankingsService } from 'src/app/services/rankings/rankings.service';
import { map } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { CargandoComponent } from 'src/app/components/cargando/cargando.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataService } from 'src/app/services/data/data.service';
import { Router } from '@angular/router';
interface Foo {
  [key: string]: boolean;
}
@Component({
  selector: 'app-puntuaciones',
  templateUrl: './puntuaciones.component.html',
  styleUrls: ['./puntuaciones.component.scss']
})
export class PuntuacionesComponent implements OnInit, AfterViewInit {



  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;
  @ViewChild('volumen', { static: false }) volumen: ElementRef;
  keysPressed: Foo = {};

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keysPressed[event.key] = true;
    console.log(event.key)
    if (this.keysPressed['Alt'] && event.key == '6') {
      this.router.navigateByUrl('/inicio');
    }


  }
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent2(event: KeyboardEvent) {
    delete this.keysPressed[event.key];

  }

  rankingsObtenidos: Ranking[] = []
  rankings: Ranking[] = []

  constructor(private rankingService: RankingsService,
    public dialog: MatDialog,
    private dataservice: DataService,
    private router: Router,

  ) { }

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
  }


  sonarClick() {
    this.click.nativeElement.play();

  }

  sonarHover() {
    this.hover.nativeElement.play();

  }

  ngOnInit() {

    // SE ABRE EL DIALOGO DE CARGADO
    let dialogo = this.dialog.open(CargandoComponent, { panelClass: 'custom-dialog-container' });

    // SE INCLUYEN LOS PUNTOS EN LOS VALORES NUMERICOS
    registerLocaleData(es);

    this.getPuntuaciones(dialogo);

  }



  // SE OBTIENEN TODAS LAS PUNTUACIONES
  getPuntuaciones(dialogo: MatDialogRef<CargandoComponent>) {
    this.rankingService.getRankings().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(customers => {

      // SE CIERRA EL DIALOGO DE CARGADO CUANDO SE OBTIENEN LOS RANKINGS
      dialogo.close()

      this.rankingsObtenidos = customers;

      // SE ELIJEN A LOS 11 MEJORES RANKINGS
      if (this.rankingsObtenidos.length > 11) {

        for (let index = 0; index < 11; index++) {
          this.rankings[index] = this.rankingsObtenidos[index]

        }
      } else {
        this.rankings = this.rankingsObtenidos;

      }

      // SE ORDENA DE MAYOR A MENOR PUNTUACION
      this.rankings.sort(function (a, b) {
        return b.dineroAcumulado - a.dineroAcumulado || a.comodinesUsados - b.comodinesUsados
      })

    });
  }


}
