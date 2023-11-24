import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Edificio } from 'src/app/domain/edificio';
import { Piso } from 'src/app/domain/pisos';
import { EdificioService } from 'src/app/services/edificio.service';
import { ElevadorService } from 'src/app/services/elevador.service';
import { PisoService } from 'src/app/services/piso.service';

@Component({
  selector: 'app-criar-elevador',
  templateUrl: './criar-elevador.component.html',
  styleUrls: ['./criar-elevador.component.css']
})
export class CriarElevadorComponent {

  pisosSelecionados: string[] = [];

  edificios: Edificio[] = [];
  pisos: Piso[] = [];

  constructor(private elevadorService: ElevadorService, private pisoService: PisoService, private edificioService: EdificioService) {

  }

  ngOnInit(): void {
    this.listarEdificios();
  }

  pisoCheckbuttonChange(codigoPiso: string): void {
    if (this.pisosSelecionados.includes(codigoPiso)) {
      this.pisosSelecionados = this.pisosSelecionados.filter(piso => piso !== codigoPiso);
    } else {
      this.pisosSelecionados.push(codigoPiso);
    }
  }

  createElevador(
    edificio: string,
    numeroSerie: string,
    marca: string,
    modelo: string,
    descricao: string,
  ): void{
    this.elevadorService.createElevador({
      edificio,
      pisos: this.pisosSelecionados,
      numeroSerie,
      marca,
      modelo,
      descricao,
    }).subscribe((response) => {
      console.log(response);
    });
    
  }

  listarEdificios(): void {
    this.edificioService.getAllEdificios().subscribe(
      edificios => {
        this.edificios = edificios;
      },
      error => {
        console.log(error);
      }
    );
  }

  getPisosDeEdificio(edificioSelecionado:string): void {
    this.pisoService.getPisosEdificio(edificioSelecionado).subscribe(
      pisos => {
        this.pisos = pisos;
      },
      error => {
        console.log(error);
      }
    );

    console.log(edificioSelecionado);
    
  }

  
}
