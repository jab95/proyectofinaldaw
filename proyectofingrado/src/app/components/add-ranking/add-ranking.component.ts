import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from "@angular/material";
import { AuthserviceService } from '../../services/auth/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { RankingsService } from 'src/app/services/rankings/rankings.service';
import { AcertadaFalladaComponent } from '../acertada-fallada/acertada-fallada.component';
interface Foo {
  [key: string]: boolean;
}
@Component({
  selector: 'app-add-ranking',
  templateUrl: './add-ranking.component.html',
  styleUrls: ['./add-ranking.component.scss']
})
export class AddRankingComponent implements OnInit, AfterViewInit {

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

  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;
  rankingForm: FormGroup;
  keysPressed: Foo = {};
  guardarAbierto: boolean = false;

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keysPressed[event.key] = true;
    if (this.keysPressed['Alt'] && event.key == 'Enter') {
      this.addPuntuacion(this.rankingForm.value);
    }

  }
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent2(event: KeyboardEvent) {
    delete this.keysPressed[event.key];

  }

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authenticationService: AuthserviceService,
    public dataservice: DataService,
    public rankingService: RankingsService,
    private dialogRef: MatDialogRef<AddRankingComponent>,
  ) {

    this.rankingForm = new FormGroup({
      usuario: new FormControl(''),
      dineroAcumulado: new FormControl(''),
      comodinesUsados: new FormControl(''),
    });
    dialogRef.disableClose = true;

  }

  ngOnInit() {



  }

  addPuntuacion(value) {
    this.click.nativeElement.play();

    // SE COLOCA EL DINERO ACUMULADO EN EL CAMPO DINERO DEL FORMULARIO
    this.rankingForm.value.dineroAcumulado = this.dataservice.dineroAcumulado;
    this.rankingForm.value.comodinesUsados = this.dataservice.comodinesUsados;

    //COMPRUEBA QUE NO HAYA ERRORES EN EL NOMBRE DE USUARIO
    if (this.rankingForm.get('usuario').value.length == 0 && this.rankingForm.get('usuario').value == '') {
      this.toastr.error('Debe escribir su nombre de usuario', 'Error al añadir puntuación', {
        positionClass: 'toast-top-center',

      });
    } else if (this.rankingForm.get('usuario').value.length > 13) {
      this.toastr.error('El nombre de usuario debe de ser menor a 13 caracteres', 'Error al añadir puntuación', {
        positionClass: 'toast-top-center',

      });
    } else {

      //LLAMA AL SERVICIO DE RANKING PARA GUARDARLO
      this.rankingService.createRanking(value)
        .then(res => {

          this.dialogRef.close();

        })

    }



  }

  sonarHover() {
    this.hover.nativeElement.play();

  }
}
