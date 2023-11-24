/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { TipoRobot } from 'src/app/domain/tipoRobot';
import { TipoRobotService } from 'src/app/services/tipo-robot.service';

@Component({
  selector: 'app-gestor-frota',
  templateUrl: './gestor-frota.component.html',
  styleUrls: ['./gestor-frota.component.css']
})
export class GestorFrotaComponent implements OnInit {

  constructor(private tipoRobotService: TipoRobotService){}

   ngOnInit(): void {}

}
