import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { Pregunta } from 'src/app/models/pregunta';
import { map } from 'rxjs/operators';
import { MatDialogRef, MatDialog } from '@angular/material';
import { CargandoComponent } from 'src/app/components/cargando/cargando.component';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent implements OnInit, AfterViewInit {

  headMessage: string;
  selectedRow: Number;
  setClickedRow: Function;
  preguntas: Pregunta[] = []
  titulosTodasLasPreguntas: string[] = []

  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;

  games: [{
    game: string,
    platform: string,
    release: string
  }];
  constructor(private preguntasService: PreguntasService,
    public dialog: MatDialog,

  ) {
    this.headMessage = "PREGUNTAS";

    this.setClickedRow = function (index) {
      this.selectedRow = index;
    }
  };



  ngOnInit() {
    let dialogo = this.dialog.open(CargandoComponent, { panelClass: 'custom-dialog-container' });
    this.getPreguntas();

    this.getPreguntasNivel1();
    this.getPreguntasNivel2();
    this.getPreguntasNivel3(dialogo);
  }


  ngAfterViewInit(): void {
    this.hover.nativeElement.volume = "0.2";
  }

  getPreguntasNivel1() {
    this.preguntasService.getPreguntasNivel(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(preguntas => {



      preguntas = preguntas.sort(function () { return Math.random() - 0.5 })

      for (let index = 0; index < 4; index++) {

        this.titulosTodasLasPreguntas.push(this.preguntas[index].pregunta)

      }


    });
  }

  getPreguntasNivel2() {
    this.preguntasService.getPreguntasNivel(2).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(preguntas => {

      preguntas = preguntas.sort(function () { return Math.random() - 0.5 })


      for (let index = 4; index < 8; index++) {

        this.titulosTodasLasPreguntas.push(this.preguntas[index].pregunta)

      }

    });
  }
  getPreguntasNivel3(dialogo: MatDialogRef<CargandoComponent>) {
    this.preguntasService.getPreguntasNivel(3).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(preguntas => {

      dialogo.close()
      preguntas = preguntas.sort(function () { return Math.random() - 0.5 })



      for (let index = 8; index < 12; index++) {
        this.titulosTodasLasPreguntas.push(this.preguntas[index].pregunta)

      }

    });
  }


  getPreguntas() {
    this.preguntasService.getPreguntas().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(customers => {
      console.log(customers)
      this.preguntas = customers;
    });
  }





}
