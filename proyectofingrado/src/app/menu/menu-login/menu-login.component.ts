import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormLoginComponent } from 'src/app/components/form-login/form-login.component';
import { FormRegistroComponent } from 'src/app/components/form-registro/form-registro.component';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  styleUrls: ['./menu-login.component.scss', '../../app.component.scss']
})
export class MenuLoginComponent implements OnInit, AfterViewInit {


  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;


  ngAfterViewInit(): void {
    this.hover.nativeElement.volume = "0.2";
  }


  accedeAdmin: boolean;

  constructor(
    public dialog: MatDialog,
    public dataservice: DataService,
  ) {

  }

  ngOnInit() {
    this.accedeAdmin = false;

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
    localStorage.setItem('invitado', "true")


  }

  accederAdmin() {
    this.accedeAdmin = !this.accedeAdmin;
    this.sonarClick();
  }

  login() {

    this.sonarClick();
    this.dialog.open(FormLoginComponent, { panelClass: 'custom-dialog-container' });

  }

  registrar() {

    this.sonarClick();
    this.dialog.open(FormRegistroComponent, { panelClass: 'custom-dialog-container' });

  }





}
