import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Ranking } from 'src/app/models/rankig';
import { RankingsService } from 'src/app/services/rankings/rankings.service';
import { map } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { CargandoComponent } from 'src/app/components/cargando/cargando.component';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-puntuaciones',
  templateUrl: './puntuaciones.component.html',
  styleUrls: ['./puntuaciones.component.scss']
})
export class PuntuacionesComponent implements OnInit, AfterViewInit {



  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;
  rankingsObtenidos: Ranking[] = []
  rankings: Ranking[] = []

  constructor(private rankingService: RankingsService,
    public dialog: MatDialog,

  ) { }

  ngAfterViewInit(): void {
    this.hover.nativeElement.volume = "0.2";
  }


  sonarClick() {
    this.click.nativeElement.play();

  }

  sonarHover() {
    this.hover.nativeElement.play();

  }

  ngOnInit() {

    let dialogo = this.dialog.open(CargandoComponent, { panelClass: 'custom-dialog-container' });

    registerLocaleData(es);
    this.getPuntuaciones(dialogo);

  }



  getPuntuaciones(dialogo: MatDialogRef<CargandoComponent>) {
    this.rankingService.getRankings().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(customers => {

      dialogo.close()

      this.rankingsObtenidos = customers;

      if (this.rankingsObtenidos.length > 11) {

        for (let index = 0; index < 11; index++) {
          this.rankings[index] = this.rankingsObtenidos[index]

        }
      } else {
        this.rankings = this.rankingsObtenidos;

      }

      this.rankings.sort(function (a, b) {
        return b.dineroAcumulado - a.dineroAcumulado
      })

    });
  }


}
