import { Component, OnInit } from '@angular/core';
import { Edificio } from 'src/app/domain/edificio';
import { Piso } from 'src/app/domain/pisos';
import { EdificioService } from 'src/app/services/edificio.service';
import { PisoService } from 'src/app/services/piso.service';

@Component({
  selector: 'app-listar-pisos-edificio',
  templateUrl: './listar-pisos-edificio.component.html',
  styleUrls: ['./listar-pisos-edificio.component.css']
})
export class ListarPisosEdificioComponent implements OnInit {
  edificios: Edificio[] = [];
  selectedEdificio: Edificio | undefined;
  selectedEdificioId: number | null = null;

  pisos: Piso[] = [];
  displayedColumns: string[] = ['nome', 'descricao', 'edificio', 'codigoPiso'];

  constructor(private pisoService: PisoService , private edificioService: EdificioService) { }

  ngOnInit(): void {
    this.listarEdificios();
  }

  listarPisos(): void {
    if (this.selectedEdificioId  !== null && this.selectedEdificioId !== undefined) {
      this.selectedEdificio = this.edificios.find(edificio1 => edificio1.codigoEdificio === String(this.selectedEdificioId));
  
      if (this.selectedEdificio ) {
        this.pisoService.getPisosEdificio(this.selectedEdificio.codigoEdificio).subscribe(
          pisoList => {
            this.pisos = pisoList;
            for (let i = 0; i < this.pisos.length; i++) {

            console.log('Passagens:', this.pisos[i].codigoPiso);
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
