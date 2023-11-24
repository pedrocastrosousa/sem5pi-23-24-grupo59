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

  designacaoTipoRobot: string = '';
  tipoTarefaTipoRobot: string[] = [];

  tipoTarefasChanged() {
    if (this.tipoTarefaTipoRobot.includes('ambas')) {
      this.tipoTarefaTipoRobot = ['pickupndelivery', 'vigilancia'];
    } else if (this.tipoTarefaTipoRobot.includes('pickupndelivery')) {
      this.tipoTarefaTipoRobot = ['pickupndelivery'];
    } else if (this.tipoTarefaTipoRobot.includes('vigilancia')) {
      this.tipoTarefaTipoRobot = ['vigilancia'];
    }
  }

  createTipoRobot(): void {
    this.tipoRobotService
      .createTipoRobot(
        this.designacaoTipoRobot,
        this.tipoTarefaTipoRobot)
      .subscribe(response => {
        console.log(response);
      });
  }
}
