/* eslint-disable prettier/prettier */

import { Component, OnInit } from '@angular/core';
import { Edificio } from 'src/app/domain/edificio';
import { EdificioService } from 'src/app/services/edificio.service';

@Component({
  selector: 'app-criar-edificio',
  templateUrl: './criar-edificio.component.html',
  styleUrls: ['./criar-edificio.component.css']
})

export class CriarEdificioComponent implements OnInit {
  
  constructor(private edificioService: EdificioService){}

  ngOnInit(): void {}

  createEdificio(
    codigoEdificio: string,
    descricaoEdificio: string,
    nomeEdificio: string,
    comprimento: number,
    largura: number,
  ): void {
    this.edificioService.createEdificio({
      codigoEdificio,
      descricaoEdificio,
      nomeEdificio,
      dimensaoMaximaPisos: {
        comprimento,
        largura,
    }} as Edificio).subscribe((response) => {console.log(response)});
  }
}
