// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '../components/menu/menu.component';
import { AdministradorComponent } from '../components/administrador/administrador.component';
import { UtenteComponent } from '../components/utente/utente.component';
import { GestorFrotaComponent } from '../components/gestor-frota/gestor-frota.component';
import { GestorTarefasComponent } from '../components/gestor-tarefas/gestor-tarefas.component';
import { GestorCampusComponent } from '../components/gestor-campus/gestor-campus.component';
import { CriarEdificioComponent } from '../components/criar-edificio/criar-edificio.component';
import { ListaredificiosComponent } from '../components/listar-edificios/listar-edificios.component';
import { ListarRobotsComponent } from '../components/listar-robots/listar-robots.component';
import { CriarTipoRobotComponent } from '../components/criar-tipo-robot/criar-tipo-robot.component';
import { EditarEdificioComponent } from '../components/editar-edificio/editar-edificio.component';
import { CriarPisoComponent } from '../components/criar-piso/criar-piso.component';
import { CriarPassagemComponent } from '../components/criar-passagem/criar-passagem.component';
import { EditarPassagemComponent } from '../components/editar-passagem/editar-passagem.component';
import { ListaPassagemComponent } from '../components/lista-passagem/lista-passagem.component';
import { DeleteEdificioComponent } from '../components/delete-edificio/delete-edificio.component';
import { CriarSalaComponent } from '../components/criar-sala/criar-sala.component';
import { CriarElevadorComponent } from '../components/criar-elevador/criar-elevador.component';
import { CriarRobotsComponent } from '../components/criar-robots/criar-robots.component';
import { InibirRobotComponent } from '../components/inibir-robot/inibir-robot.component';
import {
  ListarEdificiosMaxMinComponent
} from "../components/listar-edificios-max-min/listar-edificios-max-min.component";
const routes: Routes = [
  { path: '', component: MenuComponent, pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'administrador', component: AdministradorComponent },
  { path: 'utente', component: UtenteComponent },
  { path: 'gestor-frota', component: GestorFrotaComponent },
  { path: 'gestor-tarefas', component: GestorTarefasComponent },
  { path: 'gestor-campus', component: GestorCampusComponent },
  { path: 'criar-edificio', component: CriarEdificioComponent },
  { path: 'listar-edificios', component: ListaredificiosComponent },
  { path: 'listar-robots', component: ListarRobotsComponent },
  { path: 'criar-tipo-robot', component: CriarTipoRobotComponent },
  { path: 'editar-edificio', component: EditarEdificioComponent },
  { path: 'criar-piso', component: CriarPisoComponent },
  { path: 'criar-passagem', component: CriarPassagemComponent },
  { path: 'editar-passagem', component: EditarPassagemComponent },
  { path: 'lista-passagem', component: ListaPassagemComponent },
  { path: 'delete-edificio', component: DeleteEdificioComponent },
  { path: 'criar-elevador', component: CriarElevadorComponent },
  { path: 'criar-sala', component: CriarSalaComponent },
  { path: 'criar-robots', component: CriarRobotsComponent },
  { path: 'inibir-robot', component: InibirRobotComponent },
  { path: 'listar-edificios-max-min', component: ListarEdificiosMaxMinComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
