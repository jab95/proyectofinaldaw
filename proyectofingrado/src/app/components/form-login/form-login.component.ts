import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['../../app.component.scss', './form-login.component.scss']
})
export class FormLoginComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.hover.nativeElement.volume = "0.2";
  }


  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;

  constructor() { }

  ngOnInit() {
  }


  sonarClick() {
    this.click.nativeElement.play();

  }

  sonarHover() {
    this.hover.nativeElement.play();

  }

}
