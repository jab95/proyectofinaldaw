import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() name: string
  desactivado: boolean;

  constructor(public dataservice: DataService) { }



  ngOnInit() {
    this.desactivado = this.dataservice.esInvitado;
  }

  btnDesac() {
  }



}
