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
import { FormsModule } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { EdificioService } from '../services/edificio.service';
import { TipoRobotService } from '../services/tipo-robot.service';
import { CriarEdificioComponent } from '../components/criar-edificio/criar-edificio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListaredificiosComponent } from '../components/listar-edificios/listar-edificios.component';
import { MatTableModule } from '@angular/material/table';
import { ListarRobotsComponent } from '../components/listar-robots/listar-robots.component';
import { RobotService } from '../services/robot.service';
import { CriarTipoRobotComponent } from '../components/criar-tipo-robot/criar-tipo-robot.component';
import { EditarEdificioComponent } from '../components/editar-edificio/editar-edificio.component';
import { ReactiveFormsModule } from '@angular/forms'; // Import the ReactiveFormsModule
import { CriarPisoComponent } from '../components/criar-piso/criar-piso.component';
import { PisoService } from '../services/piso.service';
import { CriarPassagemComponent } from '../components/criar-passagem/criar-passagem.component';
import { PassagemService } from '../services/passagem.service';
import { EditarPassagemComponent } from '../components/editar-passagem/editar-passagem.component';
import { ListaPassagemComponent } from '../components/lista-passagem/lista-passagem.component';
import { DeleteEdificioComponent } from '../components/delete-edificio/delete-edificio.component';
import { CriarRobotsComponent } from '../components/criar-robots/criar-robots.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AdministradorComponent,
    UtenteComponent,
    GestorCampusComponent,
    GestorFrotaComponent,
    GestorTarefasComponent,
    CriarEdificioComponent,
    ListaredificiosComponent,
    ListarRobotsComponent,
    CriarTipoRobotComponent,
    EditarEdificioComponent,
    CriarPisoComponent,
    CriarPassagemComponent, 
    EditarPassagemComponent,
    ListaPassagemComponent,
    DeleteEdificioComponent,
    CriarRobotsComponent
  ],
  imports: [
    MatTableModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [RobotService, AuthService, MessageService, EdificioService, TipoRobotService, PisoService, PassagemService],
  bootstrap: [AppComponent],
})
export class AppModule {}
