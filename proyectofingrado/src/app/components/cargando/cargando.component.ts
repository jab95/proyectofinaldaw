import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.scss']
})
export class CargandoComponent implements OnInit {


  constructor(
    private dialogRef: MatDialogRef<CargandoComponent>,
    private dataservice: DataService,
  ) {
    dialogRef.disableClose = true;


  }
  ngOnInit() {
  }

}
