import { Component, OnInit } from '@angular/core';
import { Edificio } from 'src/app/domain/edificio';
import { Piso } from 'src/app/domain/pisos';
import { EdificioService } from 'src/app/services/edificio.service';
import { PisoService } from 'src/app/services/piso.service';

@Component({
  selector: 'app-criar-piso',
  templateUrl: './criar-piso.component.html',
  styleUrls: ['./criar-piso.component.css']
})
export class CriarPisoComponent implements OnInit {

  nome: string = '';
  descricao: string = '';
  selectedEdificioId: number | null = null;
  edificios: Edificio[] = [];

  constructor(private pisoService: PisoService, private edificioService: EdificioService) {}

  ngOnInit(): void {
    this.listarEdificios();
  }

  onSubmit(): void {
    if (this.nome && this.descricao && this.selectedEdificioId !== null && this.selectedEdificioId !== undefined) {
      const selectedEdificio = this.edificios.find(edif => edif.codigoEdificio === String(this.selectedEdificioId));
      if (selectedEdificio) {
        this.createPiso(this.nome, this.descricao, selectedEdificio.codigoEdificio);
      } else {
        console.error('Edifício não encontrado.');
      }
    } else {
      console.error('Por favor, preencha todos os campos.');
    }
  }


  createPiso(nome: string, descricao: string, edificio: string): void {
    this.pisoService.createPiso({
      nome,
      descricao,
      edificio
    } as Piso).subscribe((response) => {
      console.log(response);
      // Limpar os campos após a criação bem-sucedida, se necessário
      this.nome = '';
      this.descricao = '';
      this.selectedEdificioId = null;
    });
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

  onEdificioChange(): void {
    // Adicione qualquer lógica adicional que você deseja executar quando o edifício for alterado
    console.log('Edifício selecionado:', this.selectedEdificioId);
  }
}