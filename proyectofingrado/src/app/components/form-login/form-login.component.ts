import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from "@angular/material";
import { AuthserviceService } from '../../services/auth/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { HostListener } from '@angular/core';


interface Foo {
  [key: string]: boolean;
}
@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['../../app.component.scss', './form-login.component.scss']
})
export class FormLoginComponent implements OnInit, AfterViewInit, OnDestroy {


  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;
  loginForm: FormGroup;
  keysPressed: Foo = {};




  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keysPressed[event.key] = true;
    console.log(event.key)
    if (this.keysPressed['Alt'] && event.key == 'Enter') {
      this.login(this.loginForm.value)
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
    private dialogRef: MatDialogRef<FormLoginComponent>) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      password: new FormControl(''),
      email: new FormControl('')
    });
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

          this.router.navigateByUrl('/inicio');
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

  keyPress(event) {
  }

}
