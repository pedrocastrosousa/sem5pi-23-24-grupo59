import { Component } from '@angular/core';

@Component({
  selector: 'app-utente',
  templateUrl: './utente.component.html',
  styleUrls: ['./utente.component.css']
})
export class UtenteComponent {
  goToMainMenu() {
    window.location.href = 'app-menu.html';
  }
}
