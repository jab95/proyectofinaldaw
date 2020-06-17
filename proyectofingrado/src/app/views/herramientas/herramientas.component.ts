import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, HostListener } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { Router } from '@angular/router';
interface Foo {
  [key: string]: boolean;
}
@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.scss']
})
export class HerramientasComponent implements OnInit, AfterViewInit {


  @ViewChild('click', { static: false }) click: ElementRef;
  @ViewChild('hover', { static: false }) hover: ElementRef;
  @ViewChild('comodinLLamada', { static: false }) comodinLLamada: ElementRef;
  @ViewChild('comodinPublico', { static: false }) comodinPublico: ElementRef;
  @ViewChild('comodin50', { static: false }) comodin50: ElementRef;
  @ViewChild('color1', { static: false }) color1: ElementRef;
  @ViewChild('color2', { static: false }) color2: ElementRef;
  @ViewChild('color3', { static: false }) color3: ElementRef;
  @ViewChild('tiempo1', { static: false }) tiempo1: ElementRef;
  @ViewChild('tiempo2', { static: false }) tiempo2: ElementRef;
  @ViewChild('tiempo3', { static: false }) tiempo3: ElementRef;
  @ViewChild('rangoVolumen', { static: false }) rangoVolumen: ElementRef;
  @ViewChild('volumen', { static: false }) volumen: ElementRef;
  @ViewChild('sonidosExtras', { static: false }) sonidosExtras: ElementRef;
  keysPressed: Foo = {};

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keysPressed[event.key] = true;
    console.log(event.key)
    if (this.keysPressed['Alt'] && event.key == 'l') {
      this.comodinLLamada.nativeElement.checked = !this.comodinLLamada.nativeElement.checked
    }
    if (this.keysPressed['Alt'] && event.key == 'p') {
      // SI NO, SE ELIGE EL VALOR QUE ESTA EN LA SESION
      this.comodinPublico.nativeElement.checked = !this.comodinPublico.nativeElement.checked
    }
    if (this.keysPressed['Alt'] && event.key == '5') {
      this.comodin50.nativeElement.checked = !this.comodin50.nativeElement.checked
    }
    if (this.keysPressed['Alt'] && event.key == 'm') {
      if (this.volumen.nativeElement.volume == 0) {
        this.cambiaVolumen(1)
      }
      else
        this.cambiaVolumen(0)
    }
    if (this.keysPressed['Alt'] && event.key == 's') {
      this.sonidosExtras.nativeElement.checked = !this.sonidosExtras.nativeElement.checked
    }
    if (this.keysPressed['Alt'] && event.key == '1') {
      this.tiempo1.nativeElement.checked = true
    }
    if (this.keysPressed['Alt'] && event.key == '2') {
      this.tiempo2.nativeElement.checked = true
    }
    if (this.keysPressed['Alt'] && event.key == '3') {
      this.tiempo3.nativeElement.checked = true
    }
    if (this.keysPressed['Alt'] && event.key == 'g') {
      this.guardarCambios()
    }
    if (this.keysPressed['Alt'] && event.key == '6') {
      this.router.navigateByUrl('/inicio');
    }
  }
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent2(event: KeyboardEvent) {
    delete this.keysPressed[event.key];

  }

  constructor(public dataservice: DataService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
  ) { }


  ngAfterViewInit(): void {
    this.estableceSonidosExtras();

    // PONE LOS VALORES POR DEFECTO, SI NO EXISTE EL VALOR EN LA SESION, SE PONEN EN EL ESTADO POR DEFECTO
    // SI NO, SE ELIGE EL VALOR QUE ESTA EN LA SESION
    this.comodinLLamada.nativeElement.checked = this.dataservice.comodinLLamadaHabilitado
    this.comodinPublico.nativeElement.checked = this.dataservice.comodinPublicoHabilitado
    this.comodin50.nativeElement.checked = this.dataservice.comodin50Habilitado
    this.tiempo1.nativeElement.checked = this.dataservice.tiempoCronometro == 15 ? true : false
    this.tiempo2.nativeElement.checked = this.dataservice.tiempoCronometro == 25 ? true : false
    this.tiempo3.nativeElement.checked = this.dataservice.tiempoCronometro == 35 ? true : false
    this.rangoVolumen.nativeElement.value = this.dataservice.volumenMusica * 100
    this.volumen.nativeElement.volume = this.dataservice.volumenMusica;
    this.sonidosExtras.nativeElement.checked = this.dataservice.sonidosExtras

  }

  ngOnInit() {


  }

  guardarCambios() {
    this.sonarClick();

    // SE GUARDAN LOS ESTADOS DE LOS AJUSTES EN EL SERVICIO DE DATOS

    this.dataservice.comodin50Habilitado = this.comodin50.nativeElement.checked ? true : false
    this.dataservice.comodinLLamadaHabilitado = this.comodinLLamada.nativeElement.checked ? true : false
    this.dataservice.comodinPublicoHabilitado = this.comodinPublico.nativeElement.checked ? true : false
    this.dataservice.volumenMusica = this.rangoVolumen.nativeElement.value / 100

    if (this.tiempo1.nativeElement.checked)
      this.dataservice.tiempoCronometro = 15
    else if (this.tiempo2.nativeElement.checked)
      this.dataservice.tiempoCronometro = 25
    else if (this.tiempo3.nativeElement.checked)
      this.dataservice.tiempoCronometro = 35

    this.dataservice.sonidosExtras = this.sonidosExtras.nativeElement.checked ? true : false
    this.estableceSonidosExtras();

  }

  estableceSonidosExtras() {
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

  sonarClick() {
    this.click.nativeElement.play();

  }

  sonarHover() {
    this.hover.nativeElement.play();

  }

  cambiaVolumen(event) {

    // SE CAMBIA EL VOLUMEN CUANDO SE CAMBIA EL RANGE, EN UN VALOR ENTRE 0 Y 1
    if (event != 0 && event != 1) {
      this.volumen.nativeElement.volume = parseFloat((event.target.value / 100).toString())
      console.log(this.volumen.nativeElement.volume)
    } else if (event == 0) {
      this.volumen.nativeElement.volume = 0
      this.rangoVolumen.nativeElement.value = 0
    } else if (event == 1) {
      this.volumen.nativeElement.volume = 1
      this.rangoVolumen.nativeElement.value = 100
    }
  }



}
