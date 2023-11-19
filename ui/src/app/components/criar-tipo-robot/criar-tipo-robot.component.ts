import { Component } from '@angular/core';
import { TipoRobot } from 'src/app/domain/tipoRobot';
import { TipoRobotService } from 'src/app/services/tipo-robot.service';

@Component({
  selector: 'app-criar-tipo-robot',
  templateUrl: './criar-tipo-robot.component.html',
  styleUrls: ['./criar-tipo-robot.component.css'],
})
export class CriarTipoRobotComponent {
  constructor(private tipoRobotService: TipoRobotService) {}

  createTipoRobot(designacaoTipoRobot: string, tipoTarefaTipoRobot: string[]): void {
    this.tipoRobotService
      .createTipoRobot({ designacaoTipoRobot, tipoTarefaTipoRobot } as TipoRobot)
      .subscribe(response => {
        console.log(response);
      });
  }
}
