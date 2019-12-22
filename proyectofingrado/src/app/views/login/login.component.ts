import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  private acceder: boolean;

  constructor() {
  }

  ngOnInit() {
    this.acceder = false;

  }


  accederAdmin() {
    this.acceder = !this.acceder;
  }

}
