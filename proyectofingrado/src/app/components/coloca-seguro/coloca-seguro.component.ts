import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { DataService } from 'src/app/services/data/data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
interface Foo {
  [key: string]: boolean;
}
@Component({
  selector: 'app-coloca-seguro',
  templateUrl: './coloca-seguro.component.html',
  styleUrls: ['./coloca-seguro.component.scss']
})
export class ColocaSeguroComponent implements OnInit, AfterViewInit {



  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;
  seguroForm: FormGroup;
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
    private dialogRef: MatDialogRef<ColocaSeguroComponent>,
    private dataservice: DataService,
    private toastr: ToastrService,
  ) {
    dialogRef.disableClose = true;

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
  }

  ngOnInit() {
    this.seguroForm = new FormGroup({
      seguro: new FormControl(''),
    });
  }


  aceptarComodin() {
    this.click.nativeElement.play();
    // this.dataservice.intervaloDone = false

    //SE COMPRUEBA LOS ERRORES AL INTENTAR COLOCAR EL SEGURO
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

        //SE GUARDA EL VALOR DEL SEGURO EN UNA VARIABLE DEL SERVICIO DE DATOS
        this.dataservice.seguroNuevo = this.seguroForm.get('seguro').value
        this.dialogRef.close();
      }
    }

  }

  sonarHover() {
    this.hover.nativeElement.play();

  }

}
