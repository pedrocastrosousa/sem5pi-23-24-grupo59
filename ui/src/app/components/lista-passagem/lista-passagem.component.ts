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
  displayedColumns: string[] = ['passagemId', 'piso1', 'piso2','codigoPassagem' ];
  passagens: Passagem[] = [];
  selectedEdificio1Id: number | null = null;
  selectedEdificio2Id: number | null = null;
  edificios: Edificio[] = [];

  constructor(private passagemService: PassagemService, private edificioService: EdificioService) {}
 
  ngOnInit(): void {
    this.listarEdificios();
    
    if (this.selectedEdificio1Id && this.selectedEdificio2Id !== null && this.selectedEdificio1Id && this.selectedEdificio2Id!== undefined) {
    const selectedEdificio1 = this.edificios.find(edificio1 => edificio1.codigoEdificio === String(this.selectedEdificio1Id));
    const selectedEdificio2 = this.edificios.find(edificio2 => edificio2.codigoEdificio === String(this.selectedEdificio2Id));

    if (selectedEdificio1 && selectedEdificio2) {
    this.passagemService.listPassagensEntreEdificios(selectedEdificio1.codigoEdificio, selectedEdificio2.codigoEdificio).subscribe(
      passagemList => {
        this.passagens = passagemList;
      },
      error => {
        console.error('Error fetching buildings:', error);
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
