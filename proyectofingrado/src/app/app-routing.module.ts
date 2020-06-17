import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { PantallaJuegoComponent } from './views/pantalla-juego/pantalla-juego.component';
import { PuntuacionesComponent } from './views/puntuaciones/puntuaciones.component';
import { AboutComponent } from './views/about/about.component';
import { AdministracionComponent } from './views/administracion/administracion.component';
import { HerramientasComponent } from './views/herramientas/herramientas.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'rankings', component: PuntuacionesComponent },
  { path: 'acerca', component: AboutComponent },
  { path: 'juego', component: PantallaJuegoComponent },
  { path: 'administracion', component: AdministracionComponent },
  { path: 'herramientas', component: HerramientasComponent },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
