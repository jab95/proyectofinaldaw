import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public esInvitado: boolean;
  public emailAdmin: string;

  constructor(
  ) { }
}
