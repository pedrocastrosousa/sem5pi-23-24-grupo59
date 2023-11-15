// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '../components/menu/menu.component';
import { AdministradorComponent } from '../components/administrador/administrador.component';
import { UtenteComponent } from '../components/utente/utente.component';
import { GestorFrotaComponent } from '../components/gestor-frota/gestor-frota.component';
import { GestorTarefasComponent } from '../components/gestor-tarefas/gestor-tarefas.component';
import { GestorCampusComponent } from '../components/gestor-campus/gestor-campus.component';

const routes: Routes = [
  { path: '', component: MenuComponent, pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'administrador', component: AdministradorComponent },
  { path: 'utente', component: UtenteComponent },
  { path: 'gestor-frota', component: GestorFrotaComponent },
  { path: 'gestor-tarefas', component: GestorTarefasComponent },
  { path: 'gestor-campus', component: GestorCampusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
