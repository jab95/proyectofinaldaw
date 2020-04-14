import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from "@angular/material";
import { AuthserviceService } from '../../services/auth/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { RankingsService } from 'src/app/services/rankings/rankings.service';
import { AcertadaFalladaComponent } from '../acertada-fallada/acertada-fallada.component';

@Component({
  selector: 'app-add-ranking',
  templateUrl: './add-ranking.component.html',
  styleUrls: ['./add-ranking.component.scss']
})
export class AddRankingComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    this.hover.nativeElement.volume = "0.2";
  }

  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;
  rankingForm: FormGroup;


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
    });

  }

  ngOnInit() {



  }

  addPuntuacion(value) {
    this.click.nativeElement.play();

    this.rankingForm.value.dineroAcumulado = this.dataservice.dineroAcumulado;

    if (this.rankingForm.get('usuario').value.length == 0 && this.rankingForm.get('usuario').value == '') {
      this.toastr.error('Debe escribir su nombre de usuario', 'Error al añadir puntuación', {
        positionClass: 'toast-top-center',

      });
    } else {

      this.rankingService.createRanking(value)
        .then(res => {

          this.dialogRef.close();

        })

      // this.authenticationService.doLogin(value)
      //   .then(res => {

      //     this.router.navigateByUrl('/home');
      //     this.dialogRef.close();
      //     localStorage.setItem('invitado', "false")
      //     this.dataservice.emailAdmin = this.loginForm.get('email').value;

      //   }, err => {

      //     this.toastr.error('El correo introducido o la contraseña no es correcta', 'Error al iniciar admin', {
      //       positionClass: 'toast-top-center',

      //     });

      //   })
    }



  }

  sonarHover() {
    this.hover.nativeElement.play();

  }
}
