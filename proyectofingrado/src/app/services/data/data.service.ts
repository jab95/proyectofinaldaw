import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public esInvitado: boolean;
  public emailAdmin: string;
  public usadoComodin50: boolean
  public usadoComodinLLamada: boolean
  public usadoComodinPublico: boolean
  public respuestasPosibles: string[]
  public respuestaCorrecta: string
  public contadorPreguntaActual: number = 0
  public respuestaClickeada: string
  public intervaloDone: boolean = false
  public interval;
  public contadorParaProgreso: number = 0
  public seguroNuevo: number = 0
  public acertada: boolean
  public plantado: boolean = false
  public dineroAcumulado: number = 0
  public dineroSegundoSeguro: number = 0
  public preguntasCargadas: boolean = false
  public llegadoAMillon: boolean = false

  constructor(
  ) { }
}
