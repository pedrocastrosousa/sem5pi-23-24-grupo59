import { Component, OnInit } from '@angular/core';
import { Elevador } from 'src/app/domain/elevador';
import { ElevadorService } from 'src/app/services/elevador.service';

@Component({
  selector: 'app-listar-elevadores',
  templateUrl: './listar-elevadores.component.html',
  styleUrls: ['./listar-elevadores.component.css']
})
export class ListarElevadoresComponent implements OnInit{

  displayedColumns: string[] = ['numeroIdentificativo', 'edificio', 'pisos', 'numeroSerie', 'marca', 'modelo', 'descricao'];
  elevadores: Elevador[] = [];

  constructor(private elevadorService: ElevadorService) { }

  ngOnInit(): void {
    this.listarElevadores();
  }

  listarElevadores(): void {
    this.elevadorService.getAllElevadores().subscribe(
      elevadorList => {
        this.elevadores = elevadorList;
      },
      error => {
        console.error('Error fetching elevadores:', error);
      },
    );
  }
}
