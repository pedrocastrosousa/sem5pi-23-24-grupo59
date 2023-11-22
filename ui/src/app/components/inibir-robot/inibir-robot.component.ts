import { Component, OnInit } from '@angular/core';
import { get } from 'lodash';
import { Robot } from 'src/app/domain/robot';
import { RobotService } from 'src/app/services/robot.service';

@Component({
  selector: 'app-inibir-robot',
  templateUrl: './inibir-robot.component.html',
  styleUrls: ['./inibir-robot.component.css']
})
export class InibirRobotComponent implements OnInit {

  robots: Robot[] = [];
  selectedRobot: Robot | null = null;

  robot: Robot = {
   codigoRobot: '',
   nicknameRobot: '',
    tipoRobot: '',
    descricaoRobot: '',
    numeroSerieRobot: '',
    estadoRobot: '',
  };
  constructor(private robotService: RobotService) { }


  ngOnInit(): void {
    this.getRobots();
  }

  getRobots(): void {
    this.robotService.getAllRobots().subscribe(
      robots => {
        this.robots = robots
      },
      error => {
        console.error('Error fetching Robots:', error)
      }
    );
  }

  selectRobot(): void {
    if (this.selectedRobot) {
      this.robot = { ...this.selectedRobot };
    }
  }

  inibirRobot(): void {
   
    if(this.selectedRobot){
      this.robotService.inibirRobot(this.selectedRobot).subscribe(
        () => {
          this.getRobots();
        },
        error => {
          console.error('Error a inibir Robot:', error);
        }
      );
    }
  }
}
