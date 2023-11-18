import { Component, OnInit } from '@angular/core';
import { Edificio } from 'src/app/domain/edificio';
import { EdificioService } from 'src/app/services/edificio.service';

@Component({
  selector: 'app-listar-edificios',
  templateUrl: './listar-edificios.component.html',
  styleUrls: ['./listar-edificios.component.css'],
})

export class ListaredificiosComponent implements OnInit {
  displayedColumns: string[] = ['codigoEdificio', 'descricaoEdificio', 'nomeEdificio', 'largura', 'comprimento'];
  edificios: Edificio[] = [];

  constructor(private edificioService: EdificioService) {}

  ngOnInit(): void {
    this.edificioService.getAllEdificios().subscribe(
      edificioList => {
        this.edificios = edificioList;
      },
      error => {
        console.error('Error fetching buildings:', error);
      },
    );
  }
}
