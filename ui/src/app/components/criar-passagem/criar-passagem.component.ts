import { Component, OnInit } from '@angular/core';
import { Passagem } from 'src/app/domain/passagem';
import { Piso } from 'src/app/domain/pisos';
import { PassagemService } from 'src/app/services/passagem.service';
import { PisoService } from 'src/app/services/piso.service';

@Component({
  selector: 'app-criar-passagem',
  templateUrl: './criar-passagem.component.html',
  styleUrls: ['./criar-passagem.component.css']
})
export class CriarPassagemComponent implements OnInit{

  passagemId: string = '';
  piso1: string = '';
  piso2: string = '';
  selectedPiso1: number | null = null;
  selectedPiso2: number | null = null;
  pisos: Piso[] = [];

  constructor(private pisoService: PisoService, private passagemService: PassagemService) {}

  ngOnInit(): void {
    this.listarPisos();
  }

  onSubmit(): void {
    if (this.passagemId && this.selectedPiso1 && this.selectedPiso2 !== null && this.selectedPiso1 && this.selectedPiso2 !== undefined) {
      const selectedPiso1 = this.pisos.find(piso1 => piso1.codigoPiso === String(this.selectedPiso1));
      const selectedPiso2 = this.pisos.find(piso2 => piso2.codigoPiso === String(this.selectedPiso2));

      if (selectedPiso1 && selectedPiso2) {
        this.createPassagem(this.passagemId, selectedPiso1.codigoPiso, selectedPiso2.codigoPiso);
      } else {
        console.error('Pisos não encontrados.');
      }
    } else {
      console.error('Por favor, preencha todos os campos.');
    }
  }


  createPassagem(passagemId:string, piso1: string, piso2: string): void {
    this.passagemService.createPassagem({
      passagemId,
      piso1,
      piso2
    } as Passagem).subscribe((response) => {
      console.log(response);
      // Limpar os campos após a criação bem-sucedida, se necessário
      this.passagemId = '';
      this.selectedPiso1 = null;
      this.selectedPiso2 = null;
    });
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

  onPisoChange(): void {
    // Adicione qualquer lógica adicional que você deseja executar quando o edifício for alterado
    console.log('Piso1 selecionado:', this.selectedPiso1);
    console.log('Piso2 selecionado:', this.selectedPiso2);
  }
}