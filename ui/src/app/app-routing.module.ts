// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { UtenteComponent } from './utente/utente.component';
import { GestorFrotaComponent } from './gestor-frota/gestor-frota.component';
import { GestorTarefasComponent } from './gestor-tarefas/gestor-tarefas.component';
import { GestorCampusComponent } from './gestor-campus/gestor-campus.component';

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
export class AppRoutingModule { }
