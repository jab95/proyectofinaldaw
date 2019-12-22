import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { PantallaJuegoComponent } from './views/pantalla-juego/pantalla-juego.component';
import { PuntuacionesComponent } from './views/puntuaciones/puntuaciones.component';
import { HerramientasComponent } from './views/herramientas/herramientas.component';
import { AboutComponent } from './views/about/about.component';
import { AdministracionComponent } from './views/administracion/administracion.component';

import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PantallaJuegoComponent,
    PuntuacionesComponent,
    HerramientasComponent,
    AboutComponent,
    AdministracionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
