import { Component, OnInit } from '@angular/core';
import { Edificio } from 'src/app/domain/edificio';
import { Passagem } from 'src/app/domain/passagem';
import { EdificioService } from 'src/app/services/edificio.service';
import { PassagemService } from 'src/app/services/passagem.service';

@Component({
  selector: 'app-lista-passagem',
  templateUrl: './lista-passagem.component.html',
  styleUrls: ['./lista-passagem.component.css']
})
export class ListaPassagemComponent implements OnInit {
  displayedColumns: string[] = ['passagemId', 'piso1', 'piso2', 'codigoPassagem'];
  passagens: Passagem[] = [];
  selectedEdificio1Id: number | null = null;
  selectedEdificio2Id: number | null = null;
  edificios: Edificio[] = [];
  selectedEdificio1: Edificio | undefined;
  selectedEdificio2: Edificio | undefined;

  constructor(private passagemService: PassagemService, private edificioService: EdificioService) { }

  ngOnInit(): void {
    this.listarEdificios();
  }

  listarPassagens(): void {
    if (this.selectedEdificio1Id && this.selectedEdificio2Id !== null && this.selectedEdificio1Id && this.selectedEdificio2Id !== undefined) {
      this.selectedEdificio1 = this.edificios.find(edificio1 => edificio1.codigoEdificio === String(this.selectedEdificio1Id));
      this.selectedEdificio2 = this.edificios.find(edificio2 => edificio2.codigoEdificio === String(this.selectedEdificio2Id));
  
      if (this.selectedEdificio1 && this.selectedEdificio2) {
        this.passagemService.listPassagensEntreEdificios(this.selectedEdificio1.codigoEdificio, this.selectedEdificio2.codigoEdificio).subscribe(
          passagemList => {
            this.passagens = passagemList;
            for (let i = 0; i < this.passagens.length; i++) {

            console.log('Passagens:', this.passagens[i].codigoPassagem);
            }
          },
          error => {
            console.error('Error fetching passagens:', error);
          },
        );
      }
    }
  }

  listarEdificios(): void {
    this.edificioService.getAllEdificios().subscribe(
      edificios => {
        this.edificios = edificios;
        console.log('Edifícios:', this.edificios);
      },
      error => {
        console.error('Error fetching Edificios:', error);
      },
    );
  }
}