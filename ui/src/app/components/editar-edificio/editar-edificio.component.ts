import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EdificioService } from '../../services/edificio.service';
import { Edificio } from 'src/app/domain/edificio';

@Component({
  selector: 'app-editar-edificio',
  templateUrl: './editar-edificio.component.html',
  styleUrls: ['./editar-edificio.component.css'],
})
export class EditarEdificioComponent implements OnInit {
  edificios: Edificio[] = [];
  selectedEdificio: Edificio | null = null;

  constructor(private edificioService: EdificioService) {}

  edificio: Edificio = {
    codigoEdificio: '',
    descricaoEdificio: '',
    nomeEdificio: '',
    dimensaoMaximaPisos: {
      comprimento: 0,
      largura: 0,
    },
  };

  ngOnInit(): void {
    this.getAllEdificios();
  }

  getAllEdificios(): void {
    this.edificioService.getAllEdificios().subscribe(
      edificios => {
        this.edificios = edificios;
      },
      error => {
        console.error('Error fetching Edificios:', error);
      },
    );
  }

  selectEdificio(): void {
    if (this.selectedEdificio) {
      this.edificio = { ...this.selectedEdificio };
    }
  }

  updateEdificio(): void {
    if (this.selectedEdificio) {

      this.edificioService.updateEdificio(this.edificio).subscribe(
        response => {
          if (response) {
            console.log('Edificio updated:', response);
            this.getAllEdificios();
          } else {
            console.error('Failed to update Edificio.');
          }
          this.clearForm();
        },
        error => {
          console.error('Error updating Edificio:', error);
        },
      );
    }
  }

  clearForm(): void {
    this.selectedEdificio = null;
    this.edificio = {
      codigoEdificio: '',
      descricaoEdificio: '',
      nomeEdificio: '',
      dimensaoMaximaPisos: {
        comprimento: 0,
        largura: 0,
      },
    };
  }
}
