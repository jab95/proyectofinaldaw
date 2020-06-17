import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
interface Foo {
  [key: string]: boolean;
}
@Component({
  selector: 'app-menu-juego',
  templateUrl: './menu-juego.component.html',
  styleUrls: ['./menu-juego.component.scss']
})
export class MenuJuegoComponent implements OnInit, AfterViewInit {

  invitado: boolean;
  @ViewChild('btnAdmin', { static: false }) btnAdmin: ElementRef;
  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;
  @ViewChild('volumen', { static: false }) volumen: ElementRef;
  keysPressed: Foo = {};

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keysPressed[event.key] = true;
    console.log(event.key)
    if (this.keysPressed['Alt'] && event.key == '1') {
      this.router.navigateByUrl('/juego');
    }
    if (this.keysPressed['Alt'] && event.key == '2') {
      this.AccederAdministracion()
    }
    if (this.keysPressed['Alt'] && event.key == '3') {
      this.router.navigateByUrl('/rankings');
    }
    if (this.keysPressed['Alt'] && event.key == '4') {
      this.router.navigateByUrl('/herramientas');
    }
    if (this.keysPressed['Alt'] && event.key == '5') {
      this.router.navigateByUrl('/acerca');
    }
    if (this.keysPressed['Alt'] && event.key == '6') {
      this.router.navigateByUrl('/login');
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


  constructor(public dataservice: DataService,
    private toastr: ToastrService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.CambiaEstiloBtnAdmin();

  }

  // SE CAMBIA EL ESTILO DEL BOTON SEGUN SI ES ADMINISTRADOR O NO
  CambiaEstiloBtnAdmin() {

    this.invitado = localStorage.getItem('invitado') == "true" ? true : false;

  }

  sonarClick() {
    this.click.nativeElement.play();

  }

  sonarHover() {
    this.hover.nativeElement.play();

  }

  AccederAdministracion() {
    this.sonarClick();

    //SI ES INVITADO NO SE PUEDE ACCEDER A LA PANTALLA DE ADMINISTRACION
    // SE MOSTRARIA UN MENSAJE DE ALERTA
    if (this.invitado) {
      this.toastr.error('Debes de ser administrador para entrar', 'No tienes permiso', {
        positionClass: 'toast-top-center',

      });
    } else {

      //EN CASO CONTRARIO, SE DIRIGE HACIA LA VENTANA DE ADMINISTACION
      this.router.navigateByUrl('/administracion');

    }
  }




}
