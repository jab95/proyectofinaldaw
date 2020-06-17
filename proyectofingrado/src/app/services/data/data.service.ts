import { Injectable } from '@angular/core';
import { Pregunta } from 'src/app/models/pregunta';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // ESTE SERVICIO HACE REFERENCIA A LOS DATOS QUE SE ALMACENAN 
  // POR EJEMPLO PARA PASAR DE UAN VENTANA A OTRA
  // U OTROS DATOS NECESARIOS PARA EL CORRECTO FUNCIONAMIENTO DEL JUEGO
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
  public preguntaAAdministrar: Pregunta = null
  public añadeRegistro: boolean
  public claveAActualizar: string
  public comodinesUsados: number = 0
  public comodin50Habilitado: boolean = true
  public comodinLLamadaHabilitado: boolean = true
  public comodinPublicoHabilitado: boolean = true
  public volumenMusica: number = 1
  public tiempoCronometro: number = 35
  public sonidosExtras: boolean = true

  constructor(
  ) { }
}
