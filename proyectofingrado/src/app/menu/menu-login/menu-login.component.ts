import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormLoginComponent } from 'src/app/components/form-login/form-login.component';
import { FormRegistroComponent } from 'src/app/components/form-registro/form-registro.component';
import { DataService } from '../../services/data/data.service';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';

interface Foo {
  [key: string]: boolean;
}


@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  styleUrls: ['./menu-login.component.scss', '../../app.component.scss']
})


export class MenuLoginComponent implements OnInit, AfterViewInit {


  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;
  @ViewChild('volumen', { static: false }) volumen: ElementRef;
  key: string
  keysPressed: Foo = {};
  loginAbierto: boolean = false
  regAbierto: boolean = false




  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keysPressed[event.key] = true;
    if (this.keysPressed['Alt'] && event.key == '1') {
      this.accederInvitado()
    }
    if (this.keysPressed['Alt'] && event.key == '2' && !this.loginAbierto) {
      this.login()
    }
    if (this.keysPressed['Alt'] && event.key == '3' && !this.regAbierto) {
      this.registrar()
    }
  }
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent2(event: KeyboardEvent) {
    delete this.keysPressed[event.key];

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
    this.volumen.nativeElement.volume = this.dataservice.volumenMusica;

  }


  accedeAdmin: boolean;

  constructor(
    public dialog: MatDialog,
    public dataservice: DataService,
    public renderer: Renderer2,
    private elementRef: ElementRef,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.accedeAdmin = false;

    //POR DEFECTO AL ABRIR ESTA VENTANA, SE COLOCA COMO INVITADO PARA EVITAR PROBLEMAS CON URLS
    localStorage.setItem('invitado', "true")

  }


  sonarClick() {
    this.click.nativeElement.play();

  }

  sonarHover() {
    this.hover.nativeElement.play();

  }


  accederInvitado() {
    this.sonarClick();
    // this.dataservice.esInvitado = true;

    // SE GUARDA EN LOCALSTORAGE SI ES INVITADO O NO
    localStorage.setItem('invitado', "true")
    this.router.navigateByUrl('/inicio');


  }

  accederAdmin() {

    this.accedeAdmin = !this.accedeAdmin;
    this.sonarClick();
  }

  login() {
    this.loginAbierto = true
    this.arreglaBugDialogo();
    this.sonarClick();
    let login = this.dialog.open(FormLoginComponent, { panelClass: 'custom-dialog-container' });
    login.afterClosed().subscribe(result => {

      this.loginAbierto = false

    })
  }

  registrar() {
    this.regAbierto = true
    this.arreglaBugDialogo();
    this.sonarClick();
    let reg = this.dialog.open(FormRegistroComponent, { panelClass: 'custom-dialog-container' });
    reg.afterClosed().subscribe(result => {

      this.regAbierto = false

    })
  }


  //ARREGLA BUF CUANDO SE ABRE EL DIALOGO LA PANTALLA SE VE EN BLANCO

  arreglaBugDialogo() {

    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }





}
