// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from '../components/menu/menu.component';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AdministradorComponent } from '../components/administrador/administrador.component';
import { UtenteComponent } from '../components/utente/utente.component';
import { GestorCampusComponent } from '../components/gestor-campus/gestor-campus.component';
import { GestorFrotaComponent } from '../components/gestor-frota/gestor-frota.component';
import { GestorTarefasComponent } from '../components/gestor-tarefas/gestor-tarefas.component';
import { HttpClientModule } from '@angular/common/http';
import { PisosComponent } from '../components/gestor-campus/pisos/pisos.component';
import { PassagensComponent } from '../components/gestor-campus/passagens/passagens.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AdministradorComponent,
    UtenteComponent,
    GestorCampusComponent,
    GestorFrotaComponent,
    GestorTarefasComponent,
    PisosComponent,
    PassagensComponent
  ],
  imports: [BrowserModule, AppRoutingModule, CommonModule, RouterModule, HttpClientModule],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
