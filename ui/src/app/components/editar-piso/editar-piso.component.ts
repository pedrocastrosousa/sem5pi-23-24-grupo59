import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Piso } from 'src/app/domain/pisos';
import { PisoService } from 'src/app/services/piso.service';

@Component({
  selector: 'app-editar-piso',
  templateUrl: './editar-piso.component.html',
  styleUrls: ['./editar-piso.component.css']
})
export class EditarPisoComponent implements OnInit {
  pisos: Piso[] = [];
  selectedPiso: Piso | null = null;
  nome: string = '';
  descricao: string = '';
  constructor( private pisoService: PisoService, private fb: FormBuilder) { }

  piso: Piso = {
    nome: '',
    descricao: '',
    edificio: '',
    codigoPiso: ''
  };

  ngOnInit(): void {
    this.listarPisos();
  }

  listarPisos(): void {
    this.pisoService.getAllPisos().subscribe(
      pisos => {
        this.pisos = pisos;
        console.log('Pisos:', this.pisos);
      },
      error => {
        console.error('Error fetching pisos:', error);
      },
    );
  }
  selectPiso(): void {
    
    if (this.selectedPiso) {
      this.piso = { ...this.selectedPiso };
    }
    console.log('Piso selecionado:', this.piso);

  }

  updatePiso(): void {
    if (this.selectedPiso) {
      console.log('Piso selecionado:', this.selectedPiso);
      const pisoAtualizado: Partial<Piso> = {};
      pisoAtualizado.nome = this.piso.nome;
      pisoAtualizado.descricao = this.piso.descricao;
      console.log('Piso atualizado:', pisoAtualizado);
      this.pisoService.updatePiso(this.selectedPiso.codigoPiso, pisoAtualizado).subscribe(
        response => {
          if (response) {
            console.log('Piso updated:', response);
            this.listarPisos();
          } else {
            console.error('Failed to update Piso.');
          }
          this.clearForm();
        },
        error => {
          console.error('Error updating Piso:', error);
        },
      )
    }
  
  }

  clearForm(): void {
    this.selectedPiso = null;
    this.piso = {
      nome: '',
    descricao: '',
    edificio: '',
    codigoPiso: ''
    };
  }

}
