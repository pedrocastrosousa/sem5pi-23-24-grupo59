import { Component } from '@angular/core';
import { response } from 'express';
import { TipoRobot } from 'src/app/domain/tipoRobot';
import { TipoRobotService } from 'src/app/services/tipo-robot.service';

@Component({
  selector: 'app-gestor-frota',
  templateUrl: './gestor-frota.component.html',
  styleUrls: ['./gestor-frota.component.css']
})
export class GestorFrotaComponent {

  constructor(private tipoRobotService: TipoRobotService){}

   ngOnInit(): void {}

   createTipoRobot(designacaoTipoRobot: string, tipoTarefaTipoRobot: string[]):void{
     this.tipoRobotService
       .createTipoRobot({designacaoTipoRobot, tipoTarefaTipoRobot } as TipoRobot).subscribe((response) => {console.log(response)});
   }

}
