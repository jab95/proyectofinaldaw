import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from "@angular/material";
import { AuthserviceService } from '../../services/auth/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['../../app.component.scss', './form-login.component.scss']
})
export class FormLoginComponent implements OnInit, AfterViewInit, OnDestroy {
  ngAfterViewInit(): void {
    this.hover.nativeElement.volume = "0.2";
  }

  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;
  loginForm: FormGroup;


  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authenticationService: AuthserviceService,
    public dataservice: DataService,
    private dialogRef: MatDialogRef<FormLoginComponent>) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      password: new FormControl(''),
      email: new FormControl('')
    });
  }

  ngOnDestroy() {
  }




  login(value) {
    this.click.nativeElement.play();
    if (this.loginForm.get('email').value.length == 0 && this.loginForm.get('email').value == '') {
      this.toastr.error('El email es obligatorio', 'Error al iniciar sesión', {
        positionClass: 'toast-top-center',

      });
    } else if (this.loginForm.get('password').value.length == 0 && this.loginForm.get('password').value.length == '') {
      this.toastr.error('La contraseña es obligatoria', 'Error al iniciar sesión', {
        positionClass: 'toast-top-center',

      });
    } else {

      this.authenticationService.doLogin(value)
        .then(res => {

          this.router.navigateByUrl('/home');
          this.dialogRef.close();
          localStorage.setItem('invitado', "false")
          this.dataservice.emailAdmin = this.loginForm.get('email').value;

        }, err => {

          this.toastr.error('El correo introducido o la contraseña no es correcta', 'Error al iniciar admin', {
            positionClass: 'toast-top-center',

          });

        })
    }

  }

  sonarHover() {
    this.hover.nativeElement.play();

  }

}
