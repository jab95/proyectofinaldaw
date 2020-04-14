import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { ToastrService } from 'ngx-toastr';

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

  ngAfterViewInit(): void {
    this.hover.nativeElement.volume = "0.2";
  }


  constructor(public dataservice: DataService,
    private toastr: ToastrService,

  ) { }

  ngOnInit() {
    this.CambiaEstiloBtnAdmin();

  }

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
    if (this.invitado) {
      this.toastr.error('Debes de ser administrador para entrar', 'No tienes permiso', {
        positionClass: 'toast-top-center',

      });
    }
  }





}
