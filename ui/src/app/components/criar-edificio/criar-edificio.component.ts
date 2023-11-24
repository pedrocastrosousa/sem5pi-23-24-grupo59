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
  edificio: Edificio = {
    codigoEdificio: '',
    descricaoEdificio: '',
    nomeEdificio: '',
    dimensaoMaximaPisos: {
      comprimento: 0,
      largura: 0,
    },
  };
  ngOnInit(): void {}

  createEdificio(): void {
    console.log(this.edificio)
    this.edificioService.createEdificio(this.edificio).subscribe(response => {
      console.log(response);
    });
  }
}
