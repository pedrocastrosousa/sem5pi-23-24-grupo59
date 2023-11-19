import { Component, OnInit } from '@angular/core';
import {Robot} from '../../domain/robot'
import { RobotService } from 'src/app/services/robot.service';

@Component({
  selector: 'app-listar-robots',
  templateUrl: './listar-robots.component.html',
  styleUrls: ['./listar-robots.component.css'],
})
export class ListarRobotsComponent implements OnInit {
  displayedColumns: string[] = [
    'codigoRobot',
    'nicknameRobot',
    'tipoRobot',
    'numeroserieRobot',
    'descricaoRobot',
    'estadoRobot',
  ];
  robots: Robot[] = [];

  constructor(private robotService: RobotService) {}

  ngOnInit(): void {
    this.robotService.getAllRobots().subscribe(
      robotList => {
        this.robots = robotList;
      },
      error => {
        console.error('Error fetching buildings:', error);
      },
    );
  }
}
