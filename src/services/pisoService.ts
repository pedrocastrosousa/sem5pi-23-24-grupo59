import { Inject, Service } from "typedi";
import config from "../../config";
import { Piso } from "../domain/piso/piso";
import { PisoDescricao } from "../domain/piso/pisoDescricao";
import IPisoRepo from "./IRepos/IPisoRepo";
import IPisoService from "./IServices/IPisoService";
import { Result } from "../core/logic/Result";
import { PisoMap } from "../mappers/PisoMap";
import { IPisoDTO } from "../dto/IPisoDTO";
import { Edificio } from "../domain/edificio/edificio";
import IEdificioRepo from "./IRepos/IEdificioRepo";
import IEdificioDTO from "../dto/IEdificioDTO";
import { EdificioMap } from "../mappers/EdificioMap";
import IPassagemRepo from "./IRepos/IPassagemRepo";
import IMapaDTO from "../dto/IMapaDTO";
import { toFinite } from "lodash";
import fetch from 'node-fetch';

@Service()
export default class PisoService implements IPisoService {
  constructor(
    @Inject(config.repos.piso.name) private pisoRepo: IPisoRepo,
    @Inject(config.repos.edificio.name) private edificioRepo: IEdificioRepo,
    @Inject(config.repos.passagem.name) private passagemRepo: IPassagemRepo,

  ) { }


  public async createPiso(pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>> {

    try {

      const descricao = await PisoDescricao.create(pisoDTO.descricao).getValue();
      // const mapa = await PisoMapa.create(pisoDTO.mapa).getValue();

      /*const pisoDocument = await this.pisoRepo.findByNomePiso(pisoDTO.nome);
      const found = !!pisoDocument;
      if (found) {
        return Result.fail<IPisoDTO>("Já existe um piso com o mesmo nome=" + pisoDTO.nome);
      }
      */

      let edificioo: Edificio;
      const edificioOrError = await this.getEdificio(pisoDTO.edificio);
      if (edificioOrError.isFailure) {

        return Result.fail<IPisoDTO>(edificioOrError.error);
      } else {
        edificioo = edificioOrError.getValue();
      }

      const pisoOrError = await Piso.create({
        nome: pisoDTO.nome,
        descricao: descricao,
        edificio: edificioo,
        codigoPiso: pisoDTO.codigoPiso,
        // mapa: mapa
      });

      if (pisoOrError.isFailure) {
        return Result.fail<IPisoDTO>(pisoOrError.errorValue());
      }


      const pisoResult = pisoOrError.getValue();

      await this.pisoRepo.save(pisoResult);

      const pisoDTOResult = PisoMap.toDTO(pisoResult) as IPisoDTO;

      return Result.ok<IPisoDTO>(pisoDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async updatePiso(pisoID: string, pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>> {

    try {
      if (!pisoID) {
        return Result.fail<IPisoDTO>('ID do piso não fornecido para atualização.');
      }

      const piso = await this.pisoRepo.findByCodigo(pisoID.toString());

      if (piso === null) {
        return Result.fail<IPisoDTO>("Piso not found");
      }
      else {

        piso.updateDescricao(await PisoDescricao.create(pisoDTO.descricao).getValue());
        piso.updateNomePiso(pisoDTO.nome);
        await this.pisoRepo.save(piso);

        const pisoDTOResult = PisoMap.toDTO(piso) as IPisoDTO;

        return Result.ok<IPisoDTO>(pisoDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }



  private async getEdificio(edificioCodigo: string): Promise<Result<Edificio>> {

    //const edificio = await this.edificioRepo.findByDomainId(edificioCodigo);
    const edificioExists = await this.edificioRepo.findByCodigo(edificioCodigo);
    const found = !!edificioExists;
    if (found) {
      return Result.ok<Edificio>(edificioExists);
    } else {
      return Result.fail<Edificio>("Couldn't find edificio by id=" + edificioCodigo);
    }
  }

  public async getEdificiosComMinMaxPisos(min: string, max: string): Promise<Result<IEdificioDTO[]>> {
    try {
      let minPiso = parseFloat(min);
      let maxPiso = parseFloat(max);
      let edificioListDto: IEdificioDTO[] = [];
      const edificioList: string[] = await this.pisoRepo.findEdificiosByPisoCountRange(minPiso, maxPiso);

      console.log(edificioList);

      if (edificioList != null) {
        for (let i = 0; i < edificioList.length; i++) {
          const edificioResult = await (this.edificioRepo.findByCodigo(edificioList[i]));
          edificioListDto.push(EdificioMap.toDTO(edificioResult));
        }
        return Result.ok<IEdificioDTO[]>(edificioListDto);
      }
      return Result.fail<IEdificioDTO[]>("Não existem edifícios o min e máx número de pisos.");
    } catch (e) {
      throw e;
    }
  }

  public async getPisosDeEdificioComPassagem(edificio: string): Promise<Result<IPisoDTO[]>> {
    try {

      let pisoListDto: IPisoDTO[] = [];
      const pisoList: string[] = await this.pisoRepo.findPisosComPassagensPorEdificio(edificio);
      console.log(pisoList);
      if (pisoList != null) {
        for (let i = 0; i < pisoList.length; i++) {
          const pisoResult = await (this.pisoRepo.findByCodigo(pisoList[i]));
          pisoListDto.push(PisoMap.toDTO(pisoResult));
        }
        return Result.ok<IPisoDTO[]>(pisoListDto);
      }
      return Result.fail<IPisoDTO[]>("Não existem pisos no edifício.");
    } catch (e) {
      throw e;
    }
  }


  public async getPisosPorEdificio(codigoEdificio: string): Promise<Result<IPisoDTO[]>> {
    try {
      const pisoList: Piso[] = await this.pisoRepo.findAll();
      console.log(pisoList);
      let pisoListDto: IPisoDTO[] = [];
      if (pisoList != null) {
        for (let i = 0; i < pisoList.length; i++) {

          if (pisoList[i].edificio.codigoEdificio.toString() == codigoEdificio) {
            pisoListDto.push(PisoMap.toDTO(pisoList[i]));
          }
        }

        return Result.ok<IPisoDTO[]>(pisoListDto);
      }

      return Result.fail<IPisoDTO[]>("Não existem pisos para listar.");
    } catch (e) {
      throw e;
    }
  }


  public async carregarMapa(file: IMapaDTO): Promise<Result<boolean>> {

    try {
      const edificio = await this.edificioRepo.findByCodigo(file.mapa.codigoEdificio);
      if (edificio === null) {
        return Result.fail<boolean>("Edificio not found");
      }
      const maxLargura = edificio.dimensaoMaximaPisos.props.largura;
      const maxComprimento = edificio.dimensaoMaximaPisos.props.comprimento;
      const tamanhoMapa = file.mapa.tamanho;
      if (file.mapa.tamanho.comprimento !== maxComprimento || file.mapa.tamanho.largura !== maxLargura) {
        return Result.fail<boolean>("Tamanho do piso invalido");
      }

      const jsonString = JSON.stringify(file);
      const piso = await this.pisoRepo.findByCodigo(file.mapa.codigoPiso);

      if (piso === null) {
        return Result.fail<boolean>("Piso not found");
      }
      if (!piso.edificio.codigoEdificio.equals(edificio.codigoEdificio)) {
        return Result.fail<boolean>("Piso não pertece ao edificio");
      }
      piso.mapa = jsonString;

      const pisoPersistence = PisoMap.toPersistence(piso);
      const pisoo = await this.pisoRepo.update({ edificio: file.mapa.codigoEdificio, codigoPiso: file.mapa.codigoPiso }, pisoPersistence);

      if (pisoo === null) {
        return Result.fail<boolean>("Erro ao carregar Mapa")
      }
      return Result.ok<boolean>(true);
    }

    catch (e) {
      throw e;
    }
  }

  public async listarPisos(): Promise<Result<IPisoDTO[]>> {
    try {
      const pisoList: Piso[] = await this.pisoRepo.findAll();
      console.log(pisoList);
      let pisoListDto: IPisoDTO[] = [];
      if (pisoList != null) {
        for (let i = 0; i < pisoList.length; i++) {
          pisoListDto.push(PisoMap.toDTO(pisoList[i]));
        }
        return Result.ok<IPisoDTO[]>(pisoListDto);
      }

      return Result.fail<IPisoDTO[]>("Não existem pisos para listar.");
    } catch (e) {
      throw e;
    }
  }

  public async delete(codigoPiso: string) {
    try {
      await this.pisoRepo.delete(codigoPiso);
    } catch (e) {
      throw e;
    }
  }


  public async getSalasDeMapaDePiso(codigoPiso: string): Promise<Result<string[]>> {
    const mapasPisosResult = await this.pisoRepo.findByCodigo(codigoPiso);
    if (mapasPisosResult === null) {
      return Result.fail<string[]>("O piso com o codigo -> " + codigoPiso + " <- não existe");
    } else {
      const mapasObjetos = JSON.parse(mapasPisosResult.mapa);
      const salas = mapasObjetos.mapa.salas;
      const codigosSalas = salas.map(sala => sala.nomeSala);
      return Result.ok<string[]>(codigosSalas);
    }
  }

  public async getSalasDeTodosOsMapas(): Promise<Result<string[]>> {
    const mapasPisosResult = await this.pisoRepo.findAllMapas();
    if (mapasPisosResult === null) {
      return Result.fail<string[]>("Não existem pisos com mapas");
    } else {
      const mapasObjetos = mapasPisosResult.filter(mapa => mapa !== undefined).map(mapa => JSON.parse(mapa));
      const salas = mapasObjetos.map(mapa => mapa.mapa.salas);
      console.log(salas);
      const todasAsSalas: string[] = salas.flatMap(salaArray => salaArray.map(sala => sala.nomeSala));
      console.log(todasAsSalas);
      return Result.ok<string[]>(todasAsSalas);
    }
  }


  //planeamento
  public async melhorCaminho(origem: string, destino: string): Promise<Result<string>> {
    const requestBody = {
      origem: origem,
      destino: destino
    };

    try {
      const response = await fetch(config.url_planemaneto + '/melhorCaminho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        Result.fail<string>('Erro ao obter melhor caminho');
      }

      const caminhoJSON = await response.json();
      const caminhoString = JSON.stringify(caminhoJSON);
      return Result.ok<string>(caminhoString);
    } catch (error) {
      Result.fail<string>(error);
    }
  }

  public async getSequenciaTarefas(tarefas: string[]): Promise<Result<string>> {

    // Construir o corpo da requisição no formato desejado
    const requestBody = {
      base_robot: "base_robot(base_robot_loc, sala('EdifA', 'EdifA-Piso1', 'A101')).",
      tarefas: tarefas
    };

    console.log(requestBody);
    try {
      const response = await fetch(config.url_planemaneto+'/melhor_sequencia_tarefas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
        
      });

      if (!response.ok) {
        return Result.fail<string>('Erro ao obter sequencia de tarefas');
      }


      const sequenciaJSON = await response.json();
      const sequenciaString = JSON.stringify(sequenciaJSON);
      
      return Result.ok<string>(sequenciaString);
    } catch (error) {
      return Result.fail<string>(error);
    }
  }
  public async obterBaseDeConhecimento(): Promise<Result<string>> {
    try {
      const mapasPisosResult = await this.pisoRepo.findAllMapas();
      const mapasObjetos = mapasPisosResult.filter(mapa => mapa !== undefined).map(mapa => JSON.parse(mapa));
      const factosPisos = await this.criarFactosPisos(mapasObjetos);
      const factosSalas = await this.criarFactosSalas(mapasObjetos);
      const factosMatriz = await this.criarFactosMatriz(mapasObjetos);
      const factosLiga = await this.criarFactosLiga(mapasObjetos);
      const factosElevadores = await this.criarFactosElevadores(mapasObjetos);
      const factosCorredores = await this.criarFactosCorredoress(mapasObjetos);
      const factosTamanhoPisos = await this.criarFactosTamanhoPisos(mapasObjetos);

      let factosProlog = '';
      factosProlog += factosPisos.getValue();
      factosProlog += factosSalas.getValue();
      factosProlog += factosMatriz.getValue();
      factosProlog += factosLiga.getValue();
      factosProlog += factosElevadores.getValue();
      factosProlog += factosCorredores.getValue();
      factosProlog += factosTamanhoPisos.getValue();

      return Result.ok<string>(factosProlog);
    } catch (error) {
      return Result.fail<string>('Erro ao obter base de conhecimento');
    }
  }

  private async criarFactosPisos(mapasPisos: any[]): Promise<Result<string>> {
    try {
      const pisosPorEdificio = new Map<string, string[]>();

      mapasPisos.forEach((mapaObjeto) => {
        const codigoPiso = mapaObjeto.mapa.codigoPiso;
        const codigoEdificio = mapaObjeto.mapa.codigoEdificio;

        if (!pisosPorEdificio.has(codigoEdificio)) {
          pisosPorEdificio.set(codigoEdificio, [codigoPiso]);
        } else {
          const pisos = pisosPorEdificio.get(codigoEdificio);
          if (pisos) {
            pisos.push(codigoPiso);
            pisosPorEdificio.set(codigoEdificio, pisos);
          }
        }
      });
      let factosPisos = '';
      pisosPorEdificio.forEach((pisos, edificio) => {
        factosPisos += `pisos('${edificio}', [${pisos.map(piso => `'${piso}'`).join(', ')}]).\n`;
      });
      return Result.ok<string>(factosPisos);
    } catch (error) {
      return Result.fail<string>('Erro ao criar factos de pisos');
    }
  }

  private async criarFactosElevadores(mapasPisos: any[]): Promise<Result<string>> {
    try {
      const elevadoresPorEdificio = new Map<string, { pisos: string[], x1: number, y1: number }[]>();


      mapasPisos.forEach(mapaObjeto => {
        const codigoEdificio = mapaObjeto.mapa.codigoEdificio;
        const elevador = mapaObjeto.mapa.elevadores;
        const acesso_x1 = elevador.acesso.x1;
        const acesso_y1 = elevador.acesso.y1;
        let pisosServidos: string[] = [];
        const codigoPiso = mapaObjeto.mapa.codigoPiso;
        if (!elevadoresPorEdificio.has(codigoEdificio)) {
          elevadoresPorEdificio.set(codigoEdificio, [{
            pisos: [codigoPiso, ...pisosServidos],
            x1: acesso_x1,
            y1: acesso_y1
          }]);
        } else {
          const elevadoresEdificio = elevadoresPorEdificio.get(codigoEdificio);
          if (elevadoresEdificio) {
            elevadoresEdificio[0].pisos.push(...[codigoPiso, ...pisosServidos]);
            elevadoresPorEdificio.set(codigoEdificio, elevadoresEdificio);
          }
        }
      });

      let factosElevadores = '';

      elevadoresPorEdificio.forEach((elevadores, edificio) => {

        elevadores.forEach(elevador => {
          factosElevadores += `elevador('${edificio}', [${elevador.pisos.map(piso => `'${piso}'`).join(', ')}], ${elevador.x1}, ${elevador.y1}).\n`;
        });
      });
      return Result.ok<string>(factosElevadores);
    } catch (error) {
      return Result.fail<string>('Erro ao criar factos de elevadores');
    }
  }
  private async criarMatriz(data: any): Promise<string[]> {
    const width = data.size.width;
    const height = data.size.height;
    const salas = data.mapa.salas;
    let roomMap = [];
    for (let y = 0; y < height; y++) {
      roomMap[y] = [];
      for (let x = 0; x < width; x++) {
        roomMap[y][x] = 0;
      }
    }

    salas.forEach(sala => {
      const { x1, y1, x2, y2, nomeSala } = {
        x1: sala.dimensaoSala.x1,
        y1: sala.dimensaoSala.y1,
        x2: sala.dimensaoSala.x2,
        y2: sala.dimensaoSala.y2,
        nomeSala: sala.nomeSala
      };

      for (let y = y1 - 1; y < y2; y++) {
        for (let x = x1 - 1; x < x2; x++) {
          roomMap[y][x] = '1';
        }
      }
    });
    return roomMap;
  }



  private async criarFactosMatriz(mapasPisos: any[]): Promise<Result<string>> {
    try {
      console.log(mapasPisos);
      let factosMatriz = '';

      for (const mapaObjeto of mapasPisos) {
        try {
          const matriz = await this.criarMatriz(mapaObjeto);
          const width = mapaObjeto.size.width;
          const height = mapaObjeto.size.height;
          const codigoEdificio = mapaObjeto.mapa.codigoEdificio;
          const codigoPiso = mapaObjeto.mapa.codigoPiso;
          console.log('-------------------');
          console.log('Matriz do piso: ' + codigoPiso);

          this.imprimirMatriz(matriz);
          console.log('-------------------');

          for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
              if (matriz[i][j] == '1') {
                factosMatriz += `m('${codigoEdificio}', '${codigoPiso}', ${j}, ${i}, ${1}).\n`;
              } else {
                factosMatriz += `m('${codigoEdificio}', '${codigoPiso}', ${j}, ${i}, ${0}).\n`;
              }
            }
          }

        } catch (error) {
          console.log(error);
          return Result.fail<string>('Erro ao criar factos da matriz');
        }
      }

      return Result.ok<string>(factosMatriz);
    } catch (error) {
      console.log(error);
      return Result.fail<string>('Erro ao criar factos da matriz');
    }
  }
  imprimirMatriz(matriz) {
    for (let y = 0; y < matriz.length; y++) {
      let row = '';
      for (let x = 0; x < matriz[y].length; x++) {
        row += matriz[y][x] + ' ';
      }
      console.log(row);
    }
  }

  private async criarFactosSalas(mapasPisos: any[]): Promise<Result<string>> {

    try {
      let factosSalas = '';

      mapasPisos.forEach((mapaObjeto) => {
        const codigoPiso = mapaObjeto.mapa.codigoPiso;
        const codigoEdificio = mapaObjeto.mapa.codigoEdificio;
        const salas = mapaObjeto.mapa.salas;

        salas.forEach((sala: any) => {
          const nomeSala = sala.nomeSala;
          const portaX = sala.acesso.x1;
          const portaY = sala.acesso.y1;

          if (portaX && portaY) {
            factosSalas += `sala('${codigoEdificio}', '${codigoPiso}', '${nomeSala}', ${portaX}, ${portaY}).\n`;
          }
        });
      });

      return Result.ok<string>(factosSalas);
    } catch (error) {
      return Result.fail<string>(error);
    }
  }

  private async criarFactosCorredoress(mapasPisos: any[]): Promise<Result<string>> {
    try {

      let factosCorredores = '';

      mapasPisos.forEach((mapaObjeto) => {
        const corredores = mapaObjeto.mapa.passagem;

        corredores.forEach((corredor: any) => {
          const edificio1 = corredor.edificio1;
          const piso1 = corredor.piso1;
          const edificio2 = corredor.edificio2;
          const piso2 = corredor.piso2;
          const x1 = corredor.fromX;
          const y1 = corredor.fromY;
          const x2 = corredor.toX;
          const y2 = corredor.toY;
          if (edificio1 && edificio2) {
            factosCorredores += `corredor('${edificio1}', '${edificio2}',  '${piso1}', ${x1}, ${y1}, '${piso2}', ${x2}, ${y2}).\n`;
          }
        });
      });
      return Result.ok<string>(factosCorredores);
    } catch (error) {
      return Result.fail<string>('Erro ao criar factos dos corredores');
    }
  }

  private async criarFactosLiga(mapasPisos: any[]): Promise<Result<string>> {
    try {

      let factosLiga = '';
      mapasPisos.forEach((mapaObjeto) => {
        const passagens = mapaObjeto.mapa.passagem;

        passagens.forEach((passagem: any) => {
          const edificio1 = passagem.edificio1;
          const edificio2 = passagem.edificio2;
          if (edificio1 && edificio2) {
            factosLiga += `liga('${edificio1}', '${edificio2}').\n`;
          }

        });
      });
      return Result.ok<string>(factosLiga);
    } catch (error) {
      return Result.fail<string>('Erro ao criar factos das ligações');
    }
  }

  private async criarFactosTamanhoPisos(mapasPisos: any[]): Promise<Result<string>> {

    try {

      let factosTamanhoPisos = '';
      mapasPisos.forEach((mapaObjeto) => {
        const codigoPiso = mapaObjeto.mapa.codigoPiso;
        const codigoEdificio = mapaObjeto.mapa.codigoEdificio;
        const width = mapaObjeto.size.width + 1;
        const height = mapaObjeto.size.height + 1;
        factosTamanhoPisos += `tamanhoPiso('${codigoEdificio}', '${codigoPiso}', ${width}, ${height}).\n`;
      });
      return Result.ok<string>(factosTamanhoPisos);
    } catch (error) {
      return Result.fail<string>('Erro ao criar factos do tamanho dos pisos');
    }
  }



}


