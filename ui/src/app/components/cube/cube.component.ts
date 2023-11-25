import { AfterViewInit, Component, ElementRef, Input, ViewChild } from
  '@angular/core';
import * as _ from 'lodash';
import * as THREE from "three";
// @ts-ignore
import Orientation from "./robDroneGo/orientation.js";
// @ts-ignore
import RobDroneGO from "./robDroneGo/RobDroneGO.js";
// @ts-ignore
import { merge } from 'lodash';

// @ts-ignore
import { mazeData } from './robDroneGo/default_data.js';
// @ts-ignore
import { mazeDataBackend } from './robDroneGo/default_data.js';

@Component({
  selector: 'app-cube',
  templateUrl: './robDroneGo/RobDroneGO.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent {

  ngOnInit(): void {

    let robotDroneGo: RobDroneGO;
    function initialize() {
      // Create the game
      let parameters = merge({}, mazeData);
      robotDroneGo = new RobDroneGO(
        parameters, // Game parameters
        {}, // General Parameters
        { scale: new THREE.Vector3(1.0, 0.5, 1.0) }, // Maze parameters
        {}, // Player parameters,
        {}, // Porta parameters,
        { ambientLight: { intensity: 0.1 }, pointLight1: { intensity: 50.0, distance: 20.0, position: new THREE.Vector3(-3.5, 10.0, 2.5) }, pointLight2: { intensity: 50.0, distance: 20.0, position: new THREE.Vector3(3.5, 10.0, -2.5) } }, // Lights parameters
        {}, // Fog parameters
        { view: "fixed", multipleViewsViewport: new THREE.Vector4(0.0, 1.0, 0.45, 0.5) }, // Fixed view camera parameters
        { view: "first-person", multipleViewsViewport: new THREE.Vector4(1.0, 1.0, 0.55, 0.5), initialOrientation: new Orientation(0.0, -10.0), initialDistance: 2.0, distanceMin: 1.0, distanceMax: 4.0 }, // First-person view camera parameters
        { view: "third-person", multipleViewsViewport: new THREE.Vector4(0.0, 0.0, 0.55, 0.5), initialOrientation: new Orientation(0.0, -20.0), initialDistance: 2.0, distanceMin: 1.0, distanceMax: 4.0 }, // Third-person view camera parameters
        { view: "top", multipleViewsViewport: new THREE.Vector4(1.0, 0.0, 0.45, 0.5), initialOrientation: new Orientation(0.0, -90.0), initialDistance: 4.0, distanceMin: 1.0, distanceMax: 16.0 }, // Top view camera parameters
        { view: "mini-map", multipleViewsViewport: new THREE.Vector4(0.99, 0.02, 0.3, 0.3), initialOrientation: new Orientation(180.0, -90.0), initialZoom: 0.64 } // Mini-msp view camera parameters
      );
    }
    function animate() {
      requestAnimationFrame(animate);
      // Update the game
      robotDroneGo.update();
    }

    async function changeBuilding() {
      var selectedBuilding = (document.getElementById("edificio") as HTMLInputElement)?.value;
      var selectedFloor = (document.getElementById("piso") as HTMLInputElement)?.value;

      // Construir o URL com base nos valores selecionados
      const pisosUrl = `http://localhost:4000/api/pisos/listarPisosEdificio/${selectedBuilding}`;


      try {
        // Obter dados dos pisos do edifício
        const pisosResponse = await fetch(pisosUrl);
        const pisosData = await pisosResponse.json();

        // Atualizar dropdown de pisos com base nos dados obtidos
        const pisoDropdown = document.getElementById('piso') as HTMLSelectElement;
        pisoDropdown.innerHTML = ""; // Limpar as opções existentes

        let selectedFloorData;

        if (Array.isArray(pisosData)) {
          pisosData.forEach(floor => {
            const option = document.createElement('option');
            option.value = floor.nome;
            option.textContent = floor.nome;
            pisoDropdown.appendChild(option);

            if (floor.nome === selectedFloor) {
              selectedFloorData = floor.mapa;
            }
          });


          mazeDataBackend.url = selectedFloorData;
          
          mazeDataBackend.isString = true;

          const jsonObject = JSON.parse(mazeDataBackend.url);
           mazeDataBackend.url = jsonObject;
          robotDroneGo.changeMaze(mazeDataBackend.url, new THREE.Vector3(1.0, 1.0, 1.0),  {});

        } else {
          console.error("A resposta da API não está na estrutura esperada.");
        }

      } catch (error) {
        console.error("Erro ao obter a lista de pisos:", error);

      }
    }

    // Initialize the game
    window.onload = async function () {
      try {
        const response = await fetch('http://localhost:4000/api/edificios');
        const buildingData = await response.json();

        console.log(buildingData);

        // Populate the "Edificio" dropdown dinamicamente
        const edificioDropdown = document.getElementById('edificio');

        if (Array.isArray(buildingData) && buildingData.length > 0) {
          buildingData.forEach(building => {
            const option = document.createElement('option');
            option.value = building.codigoEdificio; // Assuming each building object has a 'name' property
            option.textContent = building.codigoEdificio;
            if (edificioDropdown) {
              edificioDropdown.appendChild(option);
            }
          });

          // Assuming your "Piso" dropdown has an id of 'piso'
          const pisoDropdown = document.getElementById('piso') as HTMLSelectElement | null;
          if (buildingData[0].floors && Array.isArray(buildingData[0].floors)) {
            buildingData[0].floors.forEach((floor: { nome: string }) => {
              const option = document.createElement('option');
              option.value = floor.nome;
              option.textContent = floor.nome;
              if (pisoDropdown) {
                pisoDropdown.appendChild(option);
              }
            });
          }
          // Adicionar event listeners para os dropdowns
          const edificioElement = document.getElementById("edificio");
          const pisoElement = document.getElementById("piso");
          if (edificioElement && pisoElement) {
            edificioElement.addEventListener("change", changeBuilding);
            pisoElement.addEventListener("change", changeBuilding);
          }

          // Inicializar o jogo
          initialize();
          animate();
        } else {
          console.error("A resposta da API não está na estrutura esperada.");
        }
      } catch (error) {
        console.error("Erro ao obter a lista de edifícios:", error);
      }
    };

  }
}
