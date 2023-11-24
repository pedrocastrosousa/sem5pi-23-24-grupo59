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
  tipoRobot: TipoRobot = {
    designacaoTipoRobot: '',
    tipoTarefaTipoRobot: [],
  };

  tipoTarefasChanged() {
    if (this.tipoRobot.tipoTarefaTipoRobot.includes('ambas')) {
      this.tipoRobot.tipoTarefaTipoRobot = ['pickupndelivery', 'vigilancia'];
    }
  }

  createTipoRobot(): void {
    this.tipoRobotService.createTipoRobot(this.tipoRobot).subscribe(response => {
      console.log(response);
    });
  }
}
