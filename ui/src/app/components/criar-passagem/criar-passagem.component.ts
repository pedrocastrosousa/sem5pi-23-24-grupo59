import { Component, OnInit } from '@angular/core';
import { Edificio } from 'src/app/domain/edificio';
import { Passagem } from 'src/app/domain/passagem';
import { Piso } from 'src/app/domain/pisos';
import { EdificioService } from 'src/app/services/edificio.service';
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

  edificios: Edificio[] = [];
  edificio1: string = '';
  edificio2: string = '';
  selectedEdificio1: number | null = null;
  selectedEdificio2: number | null = null;

  constructor(private pisoService: PisoService, private passagemService: PassagemService, private edificioService: EdificioService) {}

  ngOnInit(): void {
    this.listarEdificios();
    this.listarPisos();
    
  }

  onSubmit(): void {
    
    if (this.passagemId && this.selectedPiso1 && this.selectedPiso2 !== null && this.selectedPiso1 && this.selectedPiso2 !== undefined) {
      const selectedPiso1 = this.pisos.find(piso1 => piso1.codigoPiso === String(this.selectedPiso1));
      const selectedPiso2 = this.pisos.find(piso2 => piso2.codigoPiso === String(this.selectedPiso2));
    if(selectedPiso1?.edificio===selectedPiso2?.edificio){
         alert('Ocorreu um erro!');}
      if (selectedPiso1 && selectedPiso2) {
        this.createPassagem(this.passagemId, selectedPiso1.codigoPiso, selectedPiso2.codigoPiso);
      } else {
        console.error('Passagens não encontrados.');
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

  listarEdificios(): void {
    this.edificioService.getAllEdificios().subscribe(
      edificios => {
        this.edificios = edificios;
        console.log('Edificios:', this.edificios);
      },
      error => {
        console.error('Error fetching edificios:', error);
      },
    );
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
  // listarPisos1(): void {
  //   const edificioSelecionado1 = this.edificios.find(edificio => edificio.codigoEdificio === String(this.selectedEdificio1));
  //   if(edificioSelecionado1)
  //   this.pisoService.getPisosEdificio(edificioSelecionado1.codigoEdificio).subscribe(
  //     pisos => {
  //       this.pisos = pisos;
  //       console.log('Pisos:', this.pisos);
  //     },
  //     error => {
  //       console.error('Error fetching pisos:', error);
  //     },
  //   );
  
  // }
  // listarPisos2(): void {
  //   const edificioSelecionado2 = this.edificios.find(edificio => edificio.codigoEdificio === String(this.selectedEdificio2));
  //   if(edificioSelecionado2)
  //   this.pisoService.getPisosEdificio(edificioSelecionado2.codigoEdificio).subscribe(
  //     pisos => {
  //       this.pisos = pisos;
  //       console.log('Pisos:', this.pisos);
  //     },
  //     error => {
  //       console.error('Error fetching pisos:', error);
  //     },
  //   );
  // }

  onPisoChange(): void {
    // Adicione qualquer lógica adicional que você deseja executar quando o edifício for alterado
    console.log('Piso1 selecionado:', this.selectedPiso1);
    console.log('Piso2 selecionado:', this.selectedPiso2);
  }
}
