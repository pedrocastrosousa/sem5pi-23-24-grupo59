import { Component, OnInit } from '@angular/core';
import { Edificio } from 'src/app/domain/edificio';
import { EdificioService } from 'src/app/services/edificio.service';

@Component({
  selector: 'app-criar-edificio',
  templateUrl: './criar-edificio.component.html',
  styleUrls: ['./criar-edificio.component.css'],
})
export class CriarEdificioComponent implements OnInit {
  constructor(private edificioService: EdificioService) {}

  codigoEdificio: string = '';
  descricaoEdificio: string = '';
  nomeEdificio: string = '';
  comprimento: number = 0;
  largura: number = 0;

  ngOnInit(): void {}

  createEdificio(): void {
    this.edificioService
      .createEdificio(this.codigoEdificio, this.descricaoEdificio, this.nomeEdificio, this.comprimento, this.largura)
      .subscribe(response => {
        console.log(response);
      });
  }
}
