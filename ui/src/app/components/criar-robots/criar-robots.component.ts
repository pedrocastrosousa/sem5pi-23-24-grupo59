import { Component, OnInit } from '@angular/core';
import { Robot } from 'src/app/domain/robot';
import { TipoRobot } from 'src/app/domain/tipoRobot';
import { RobotService } from 'src/app/services/robot.service';
import { TipoRobotService } from 'src/app/services/tipo-robot.service';

@Component({
  selector: 'app-criar-robots',
  templateUrl: './criar-robots.component.html',
  styleUrls: ['./criar-robots.component.css']
})
export class CriarRobotsComponent implements OnInit {
  codigoRobot: string = '';
  nicknameRobot: string = '';
  descricaoRobot: string = '';
  selectedTipoRobot: number | null = null;
  tipoRobots: TipoRobot[] = [];
  numeroSerieRobot: string = '';
  estadoRobot: string = '';

  constructor(private robotService: RobotService, private tipoRobotService: TipoRobotService) { }

  ngOnInit(): void {
    this.listarTipoRobots();
  }

  onSubmit(): void {
    if (this.codigoRobot && this.nicknameRobot && this.descricaoRobot&& this.numeroSerieRobot && this.selectedTipoRobot !== null && this.selectedTipoRobot !== undefined ) {
      const selectedTipoRobot = this.tipoRobots.find(tipoRobot => tipoRobot.designacaoTipoRobot === String(this.selectedTipoRobot));
      if (selectedTipoRobot) {
        console.log('selectedTipoRobot:', this.codigoRobot, this.nicknameRobot, this.descricaoRobot, selectedTipoRobot.designacaoTipoRobot, this.numeroSerieRobot);
        this.createRobot(this.codigoRobot, this.nicknameRobot, this.descricaoRobot, selectedTipoRobot.designacaoTipoRobot, this.numeroSerieRobot);
      } else {
        console.error('Tipo de Robot não encontrado.');
      }
    } else {
      console.error('Por favor, preencha todos os campos.');
    }
  }

  createRobot(codigoRobot: string, nicknameRobot: string, descricaoRobot: string, tipoRobot: string, numeroSerieRobot: string): void {
    this.robotService.createRobot({
      codigoRobot,
      nicknameRobot,
      descricaoRobot,
      tipoRobot,
      numeroSerieRobot
        } as Robot).subscribe((response) => {
    
      // Limpar os campos após a criação bem-sucedida, se necessário
      this.codigoRobot = '';
      this.nicknameRobot = '';
      this.descricaoRobot = '';
      this.selectedTipoRobot = null;
      this.numeroSerieRobot = '';
    });
  }

  listarTipoRobots(): void {
    console.log('listarTipoRobots');
    this.tipoRobotService.getAllTipoRobots().subscribe(
      tipoRobots => {
        this.tipoRobots = tipoRobots;
        console.log('Tipo de Robots:', this.tipoRobots);
      },
      error => {
        console.error('Error fetching Tipo de Robots:', error);
      }
    );
  }

}
