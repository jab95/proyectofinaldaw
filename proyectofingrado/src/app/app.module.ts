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
// import { MenuJuegoComponent } from './menu/menu-juego/menu-juego.component';

//firebase

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

//toast

import { ToastrModule } from 'ngx-toastr';

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
    // MenuJuegoComponent
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
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,// imports firebase/storage only needed for storage features
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FormLoginComponent, FormRegistroComponent]
})
export class AppModule { }
