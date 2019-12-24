import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormLoginComponent } from 'src/app/components/form-login/form-login.component';
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


  acceder: boolean;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
    this.acceder = false;

  }


  sonarClick() {
    this.click.nativeElement.play();

  }

  sonarHover() {
    this.hover.nativeElement.play();

  }


  accederAdmin() {
    this.acceder = !this.acceder;
    this.sonarClick();
  }

  login(): void {

    this.sonarClick();
    this.dialog.open(FormLoginComponent, { panelClass: 'custom-dialog-container' });

  }





}
