import * as THREE from "three";
import Ground from "./ground.js";
import Wall from "./wall.js";


/*
 * parameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3
 * }
 */

export default class Maze {
    constructor(parameters) {
        console.log('MAZE', parameters);

        this.onLoad = function (description) {


            // Store the maze's map and size
            this.map = description.map;

            this.size = description.size;

            // Store the player's initial position and direction
            this.initialPosition = this.cellToCartesian(description.initialPosition);
            this.initialDirection = description.initialDirection;

            // Store the maze's exit location
            this.exitLocation = this.cellToCartesian(description.exitLocation);

            // Create a group of objects
            this.object = new THREE.Group();

            // Create the ground
            this.ground = new Ground({ textureUrl: description.groundTextureUrl, size: description.size });
            this.object.add(this.ground.object);

            // Create a wall
            this.wall = new Wall({ textureUrl: description.wallTextureUrl });

            // Store the elevator's initial position and direction
            this.elevatorPosition = this.cellToCartesian(description.mapa.elevadores.posicao);
            this.elevatorDirection = description.mapa.elevadores.direcao;

            // Build the maze
            let wallObject;
            for (let i = 0; i <= description.size.width; i++) { // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
                for (let j = 0; j <= description.size.height; j++) { // In order to represent the southmost walls, the map height is one row greater than the actual maze height
                    /*
                     * description.map[][] | North wall | West wall
                     * --------------------+------------+-----------
                     *          0          |     No     |     No
                     *          1          |     No     |    Yes
                     *          2          |    Yes     |     No
                     *          3          |    Yes     |    Yes
                     */
                    if (description.map[j][i] == 2 || description.map[j][i] == 3) {
                        wallObject = this.wall.object.clone();
                        wallObject.scale.set(1.0, 4.0, 1.0);
                        wallObject.position.set(i - description.size.width / 2.0 + 0.5, 2, j - description.size.height / 2.0);
                        this.object.add(wallObject);
                    }
                    if (description.map[j][i] == 1 || description.map[j][i] == 3) {
                        wallObject = this.wall.object.clone();
                        wallObject.scale.set(1.0, 4.0, 1.0);
                        wallObject.rotateY(Math.PI / 2.0);
                        wallObject.position.set(i - description.size.width / 2.0, 2, j - description.size.height / 2.0 + 0.5);
                        this.object.add(wallObject);
                    }
                }
            }

            this.object.scale.set(this.scale.x, this.scale.y, this.scale.z);
            this.loaded = true;

        }


        this.onProgress = function (data, xhr) {
            console.log("Progresso: " + (100.0 * xhr.loaded / xhr.total).toFixed(0) + "%");
        }

        this.onError = function (url, error) {
            console.error("Erro ao carregar recurso " + url + " (" + error + ").");
        }

        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }

        this.loaded = false;

        // Verificar se a URL é uma string
        if (typeof this.url === 'string') {
            // Se for uma string, carregue o recurso externo
            this.carregarRecurso(this.url);
        } else if (typeof this.url === 'object') {
            // Se for um objeto, processe-o diretamente
            console.log("Objeto passado diretamente:", this.url);
            this.processarObjeto(this.url);
        } else {
            console.error("Tipo de entrada não suportado.");
        }
    }

    carregarRecurso(urlOuObjeto) {
        try {
            if (typeof urlOuObjeto === 'string') {
                // Se for uma string, assumimos que é uma URL
                const response = fetch(urlOuObjeto);
                const data = response.json();
                console.log("Recurso carregado da URL:", data);

                // Faça o que for necessário com os dados carregados
                // ...

            } else if (typeof urlOuObjeto === 'object') {
                // Se for um objeto, assumimos que é o próprio recurso
                console.log("Recurso processado do objeto:", urlOuObjeto);

                // Faça o que for necessário com o objeto
                // ...
            } else {
                console.error("Tipo de entrada não suportado.");
            }
        } catch (error) {
            console.error("Erro ao carregar ou processar o recurso:", error);
        }
    }
    processarObjeto(objeto) {
        this.map = objeto.map;
        console.log('MAPA', objeto.map);
        this.size = objeto.size;
        console.log('SIZE', objeto.size);
        console.log('INITIAL POSITION', objeto.initialPosition);

        this.initialPosition = this.cellToCartesian(objeto.initialPosition );
        this.initialDirection = objeto.initialDirection;
        console.log('INITIAL DIRECTION', this.initialDirection);
        this.exitLocation = this.cellToCartesian(objeto.exitLocation);
        console.log('EXIT LOCATION', this.exitLocation);
        // Create a group of objects
        this.object = new THREE.Group();

        // Create the ground
        this.ground = new Ground({ textureUrl: objeto.groundTextureUrl, size: objeto.size });
        this.object.add(this.ground.object);
        console.log('GROUND', this.ground.object);
        // Create a wall
        this.wall = new Wall({ textureUrl: objeto.wallTextureUrl });

        console.log('ELEVATOR POSITION', objeto.mapa.elevadores.posicao);

        // Store the elevator's initial position and direction
        this.elevatorPosition = this.cellToCartesian(objeto.mapa.elevadores.posicao);
        console.log('ELEVATOR POSITION', this.elevatorPosition);
        this.elevatorDirection = objeto.mapa.elevadores.direcao;

        let wallObject;
        for (let i = 0; i <= objeto.size.width; i++) { // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
            for (let j = 0; j <= objeto.size.height; j++) { // In order to represent the southmost walls, the map height is one row greater than the actual maze height
                /*
                 * description.map[][] | North wall | West wall
                 * --------------------+------------+-----------
                 *          0          |     No     |     No
                 *          1          |     No     |    Yes
                 *          2          |    Yes     |     No
                 *          3          |    Yes     |    Yes
                 */
                if (objeto.map[j][i] == 2 || objeto.map[j][i] == 3) {
                    wallObject = this.wall.object.clone();
                    wallObject.scale.set(1.0, 3.0, 1.0);
                    wallObject.position.set(i - objeto.size.width / 2.0 + 0.5, 0.5, j - objeto.size.height / 2.0);
                    this.object.add(wallObject);
                }
                if (objeto.map[j][i] == 1 || objeto.map[j][i] == 3) {
                    wallObject = this.wall.object.clone();
                    wallObject.scale.set(1.0, 3.0, 1.0);
                    wallObject.rotateY(Math.PI / 2.0);
                    wallObject.position.set(i - objeto.size.width / 2.0, 0.5, j - objeto.size.height / 2.0 + 0.5);
                    this.object.add(wallObject);
                }
            }
        }
        this.loaded = true;
    }
    // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
    cellToCartesian(position) {
        return new THREE.Vector3((position[1] - this.size.width / 2.0 + 0.5) * this.scale.x, 0.0, (position[0] - this.size.height / 2.0 + 0.5) * this.scale.z);
    }

    // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
    cartesianToCell(position) {
        return [Math.floor(position.z / this.scale.z + this.size.height / 2.0), Math.floor(position.x / this.scale.x + this.size.width / 2.0)];
    }

    distanceToWestWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 1 || this.map[indices[0]][indices[1]] == 3) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToEastWall(position) {
        const indices = this.cartesianToCell(position);
        indices[1]++;
        if (this.map[indices[0]][indices[1]] == 1 || this.map[indices[0]][indices[1]] == 3) {
            return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
        }
        return Infinity;
    }

    distanceToNorthWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 2 || this.map[indices[0]][indices[1]] == 3) {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    }

    distanceToSouthWall(position) {
        const indices = this.cartesianToCell(position);
        indices[0]++;
        if (this.map[indices[0]][indices[1]] == 2 || this.map[indices[0]][indices[1]] == 3) {
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }
        return Infinity;
    }

    foundExit(position) {
        return Math.abs(position.x - this.exitLocation.x) < 0.5 * this.scale.x && Math.abs(position.z - this.exitLocation.z) < 0.5 * this.scale.z
    };

    getNumPortas() {
        return this.numPortas;
    }

    distanceToElevator(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 8 || this.map[indices[0]][indices[1]] == 9 || this.map[indices[0]][indices[1]] == 10 || this.map[indices[0]][indices[1]] == 11) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToPorta(position, portasPosition) {
        const indices = this.cartesianToCell(position);
        const portasIndices = this.cartesianToCell(portasPosition);
        if (indices[0] == portasIndices[0] && indices[1] == portasIndices[1]) {
            return position.x - 2 - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }
}