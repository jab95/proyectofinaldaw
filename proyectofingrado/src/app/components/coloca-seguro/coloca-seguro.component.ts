import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { DataService } from 'src/app/services/data/data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-coloca-seguro',
  templateUrl: './coloca-seguro.component.html',
  styleUrls: ['./coloca-seguro.component.scss']
})
export class ColocaSeguroComponent implements OnInit, AfterViewInit {



  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;
  seguroForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ColocaSeguroComponent>,
    private dataservice: DataService,
    private toastr: ToastrService,
  ) {
    dialogRef.disableClose = true;

  }
  ngAfterViewInit(): void {
    this.hover.nativeElement.volume = "0.2";
  }

  ngOnInit() {
    this.seguroForm = new FormGroup({
      seguro: new FormControl(''),
    });
  }


  aceptarComodin() {
    this.click.nativeElement.play();
    // this.dataservice.intervaloDone = false
    if (this.seguroForm.get('seguro').value.length == 0 && this.seguroForm.get('seguro').value == '') {

      this.toastr.error('Debe colocar un nuevo nuevo para continuar', 'Error al colocar seguro', {
        positionClass: 'toast-top-center',
      });
    } else {

      if (this.seguroForm.get('seguro').value <= 4 || this.seguroForm.get('seguro').value >= 12) {
        this.toastr.error('El seguro debe colocarse mas arriba de la pregunta 4 y menor a la 12', 'Error al colocar seguro', {
          positionClass: 'toast-top-center',
        });
      } else {
        this.dataservice.seguroNuevo = this.seguroForm.get('seguro').value
        this.dialogRef.close();
      }
    }

  }

  sonarHover() {
    this.hover.nativeElement.play();

  }

}
