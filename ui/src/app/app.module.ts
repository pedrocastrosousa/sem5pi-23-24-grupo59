// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AuthService } from './auth.service';
import { AdminService } from './admin.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AdministradorComponent } from './administrador/administrador.component';
import { UtenteComponent } from './utente/utente.component';
import { GestorCampusComponent } from './gestor-campus/gestor-campus.component';
import { GestorFrotaComponent } from './gestor-frota/gestor-frota.component';
import { GestorTarefasComponent } from './gestor-tarefas/gestor-tarefas.component'; 

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AdministradorComponent,
    UtenteComponent,
    GestorCampusComponent,
    GestorFrotaComponent,
    GestorTarefasComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, CommonModule, RouterModule],
  providers: [AuthService, AdminService],
  bootstrap: [AppComponent],
})
export class AppModule { }
