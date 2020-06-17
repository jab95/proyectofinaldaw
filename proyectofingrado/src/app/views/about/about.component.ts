import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { Router } from '@angular/router';
interface Foo {
  [key: string]: boolean;
}
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {



  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;
  @ViewChild('volumen', { static: false }) volumen: ElementRef;
  keysPressed: Foo = {};

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keysPressed[event.key] = true;
    console.log(event.key)
    if (this.keysPressed['Alt'] && event.key == '6') {
      this.router.navigateByUrl('/inicio');
    }

  }
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent2(event: KeyboardEvent) {
    delete this.keysPressed[event.key];

  }


  constructor(private dataservice: DataService,
    private router: Router,

  ) { }
  ngAfterViewInit(): void {
    this.volumen.nativeElement.volume = this.dataservice.volumenMusica;

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

  ngOnInit() {
  }

  sonarClick() {
    this.click.nativeElement.play();

  }

  sonarHover() {
    this.hover.nativeElement.play();

  }


}
