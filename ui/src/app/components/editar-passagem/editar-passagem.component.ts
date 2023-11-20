import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { error } from 'console';
import { Passagem } from 'src/app/domain/passagem';
import { Piso } from 'src/app/domain/pisos';
import { PassagemService } from 'src/app/services/passagem.service';
import { PisoService } from 'src/app/services/piso.service';

@Component({
  selector: 'app-editar-passagem',
  templateUrl: './editar-passagem.component.html',
  styleUrls: ['./editar-passagem.component.css']
})
export class EditarPassagemComponent implements OnInit {
  passagens: Passagem[] = [];
  selectedPassagem: Passagem | null = null;
  piso1: string = '';
  piso2: string = '';
  selectedPiso1: number | null = null;
  selectedPiso2: number | null = null;
  pisos: Piso[] = [];
  constructor(private passagemService: PassagemService, private fb: FormBuilder, private pisoService: PisoService) {
  }

  passagem: Passagem = {
    passagemId: '',
    piso1: '',
    piso2: '',
    codigoPassagem: ''
  };
  ngOnInit(): void {
    this.getPassagens();
    this.listarPisos();
  }

  getPassagens(): void {
    this.passagemService.listPassagens().subscribe(
      passagens => {
        this.passagens = passagens
      },
      error => {
        console.error('Error fetching Passagens:', error)
      }
    );
  }

  selectPassagem(): void {
    if (this.selectedPassagem) {
      this.passagem = { ...this.selectedPassagem };
    }
  }

  updatePassagem(): void {
    if (this.selectedPassagem) {
      console.log(this.passagem)
      const selectedPiso1 = this.pisos.find(piso1 => piso1.codigoPiso === String(this.selectedPiso1));
      const selectedPiso2 = this.pisos.find(piso2 => piso2.codigoPiso === String(this.selectedPiso2));

      if (selectedPiso1 && selectedPiso2) {
        this.passagem = {
          passagemId: this.passagem.passagemId,
          piso1:selectedPiso1.codigoPiso,
          piso2:selectedPiso2.codigoPiso,
          codigoPassagem: ''
        };
      this.passagemService.updatePassagem(this.passagem).subscribe(
        response => {
          if (response) {
            console.log('Passagem updated:', response);
            this.getPassagens();
          } else {
            console.error('Failed to update Passagem.');
          }
          this.clearForm();
        },
        error => {
          console.error('Error updating Passagem:', error);
        },
      )
      }
      }
  }

  clearForm(): void {
    this.selectedPassagem = null;
    this.passagem = {
      passagemId: '',
      piso1:'',
      piso2:'',
      codigoPassagem: ''
    };
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
}