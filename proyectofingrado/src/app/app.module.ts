import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MenuLoginComponent } from './menu/menu-login/menu-login.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormRegistroComponent } from './components/form-registro/form-registro.component';
import { MenuJuegoComponent } from './menu/menu-juego/menu-juego.component';

//firebase

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PreguntasService } from './services/preguntas.service';

//toast

import { ToastrModule } from 'ngx-toastr';
import { Comodin50Component } from './components/comodin50/comodin50.component';
import { ComodinPublicoComponent } from './components/comodin-publico/comodin-publico.component';
import { ComodinLLamadaComponent } from './components/comodin-llamada/comodin-llamada.component';
import { MuestraSaldoComponent } from './components/muestra-saldo/muestra-saldo.component';
import { ColocaSeguroComponent } from './components/coloca-seguro/coloca-seguro.component';
import { AcertadaFalladaComponent } from './components/acertada-fallada/acertada-fallada.component';
import { AddRankingComponent } from './components/add-ranking/add-ranking.component';
import { CargandoComponent } from './components/cargando/cargando.component';
import { ModificaPreguntaComponent } from './components/modifica-pregunta/modifica-pregunta.component';

//I keep the new line
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PantallaJuegoComponent,
    PuntuacionesComponent,
    HerramientasComponent,
    AboutComponent,
    AdministracionComponent,
    MenuLoginComponent,
    FormLoginComponent,
    FormRegistroComponent,
    MenuJuegoComponent,
    Comodin50Component,
    ComodinPublicoComponent,
    ComodinLLamadaComponent,
    MuestraSaldoComponent,
    ColocaSeguroComponent,
    AcertadaFalladaComponent,
    AddRankingComponent,
    CargandoComponent,
    ModificaPreguntaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }, PreguntasService],
  bootstrap: [AppComponent],

  //PARA LOS COMPONENTES QUE SE ABREN EN PAGINA MODAL
  entryComponents: [FormLoginComponent, FormRegistroComponent, Comodin50Component,
    ComodinLLamadaComponent, ComodinPublicoComponent, MuestraSaldoComponent,
    ColocaSeguroComponent, AcertadaFalladaComponent, AddRankingComponent, CargandoComponent, ModificaPreguntaComponent]
})
export class AppModule {
}
