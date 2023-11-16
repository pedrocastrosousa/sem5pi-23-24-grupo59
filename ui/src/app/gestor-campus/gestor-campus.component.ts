import { Component, OnInit } from '@angular/core';
import { EdificioService } from '../edificio.service';
import { Edificio } from '../edificio';

@Component({
  selector: 'app-gestor-campus',
  templateUrl: './gestor-campus.component.html',
  styleUrls: ['./gestor-campus.component.css']
})
export class GestorCampusComponent implements OnInit{

  constructor(private edificioService: EdificioService) { }

  ngOnInit(): void {
  }

  createEdificio(codigoEdificio: string ,nomeEdificio: string): void {
    this.edificioService.createEdificio({ codigoEdificio, nomeEdificio } as Edificio);
  }
}
