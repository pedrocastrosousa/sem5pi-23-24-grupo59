import { Service, Inject } from 'typedi';
import config from '../../config';
import { IElevadorDTO } from '../dto/IElevadorDTO';
import { Elevador } from '../domain/elevador/elevador';

import { ElevadorMap } from '../mappers/ElevadorMap';
import { Result } from '../core/logic/Result';
import IPisoRepo from './IRepos/IPisoRepo';
import IEdificioRepo from './IRepos/IEdificioRepo';
import { NumeroSerieElevador } from '../domain/elevador/numeroSerieElevador';
import { MarcaElevador } from '../domain/elevador/marcaElevador';
import { ModeloElevador } from '../domain/elevador/modeloElevador';
import { DescricaoElevador } from '../domain/elevador/descricaoElevador';
import { Edificio } from '../domain/edificio/edificio';
import { Piso } from '../domain/piso/piso';
import IElevadorService from './IServices/IElevadoreService';
import IElevadorRepo from './IRepos/IElevadorRepo';
import { NumeroIdentificativo } from '../domain/elevador/numeroIdentificativo';

@Service()
export default class ElevadorService implements IElevadorService {
  constructor(
    @Inject(config.repos.elevador.name) private elevadorRepo: IElevadorRepo,
    @Inject(config.repos.piso.name) private pisoRepo: IPisoRepo,
    @Inject(config.repos.edificio.name) private edificioRepo: IEdificioRepo,
  ) {}

  public async createElevador(elevadorDTO: IElevadorDTO): Promise<Result<IElevadorDTO>> {
    try {

      const numeroSerie = await NumeroSerieElevador.create(elevadorDTO.numeroSerie).getValue();
      const marca = await MarcaElevador.create(elevadorDTO.marca).getValue();
      const modelo = await ModeloElevador.create(elevadorDTO.modelo).getValue();
      const descricao = await DescricaoElevador.create(elevadorDTO.descricao).getValue();

      const edificioOrError = await this.getEdificio(elevadorDTO.edificio);
      if (edificioOrError.isFailure) {
        return Result.fail<IElevadorDTO>("Erro no edificio introduzido: " + edificioOrError.error);
      }
      const edificio: Edificio = edificioOrError.getValue();

      const pisosOrError = await this.getPisos(elevadorDTO.pisos);
      if (pisosOrError.isFailure) {
        return Result.fail<IElevadorDTO>("Erro nos pisos introduzidoss: " + pisosOrError.error);
      }
      const pisos: Piso[] = pisosOrError.getValue();

      let numIdenti: string;
      try {
        numIdenti = await this.proxNumIdentificativoValido(edificio.codigoEdificio.toString());
      } catch (e) {
        return Result.fail<IElevadorDTO>("Erro ao gerar o número identificativo do elevador do edificio " + edificio.codigoEdificio + ". Erro: " + e.message);
      }
      const numeroIdentificativo = NumeroIdentificativo.create(numIdenti).getValue();

      const ElevadorOrError = Elevador.create({
        numeroIdentificativo: numeroIdentificativo,
        edificio: edificio,
        pisos: pisos,
        numeroSerie: numeroSerie,
        marca: marca,
        modelo: modelo,
        descricao: descricao,
      });

      if (ElevadorOrError.isFailure) {
        return Result.fail<IElevadorDTO>("Erro ao criar o elevador: " + ElevadorOrError.errorValue());
      }

      const ElevadorResult = ElevadorOrError.getValue();

      await this.elevadorRepo.save(ElevadorResult);

      const ElevadorDTOResult = ElevadorMap.toDTO(ElevadorResult) as IElevadorDTO;
      return Result.ok<IElevadorDTO>(ElevadorDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updateElevador(numIdentificativo: string, elevadorDTO: IElevadorDTO): Promise<Result<IElevadorDTO>> {
    try {

      if (!numIdentificativo) {
        return Result.fail<IElevadorDTO>('Número de série do elevador não fornecido para atualização.');
      }

      const existingElevador = await this.elevadorRepo.findByNumeroIdentificativo(numIdentificativo); //PODE PRECISAR DE TOSTRING

      if (existingElevador != null) {

        if (elevadorDTO.marca && elevadorDTO.modelo) {
          existingElevador.updateMarcaEModelo(elevadorDTO.marca, elevadorDTO.modelo);
        }
        else if (elevadorDTO.marca || elevadorDTO.modelo){
          return Result.fail<IElevadorDTO>('Para fazer alterações na marca ou no modelo, ambos devem ser especificados.');
        }

        if (elevadorDTO.pisos) {
          const pisosOrError = await this.getPisos(elevadorDTO.pisos);
          if (pisosOrError.isFailure) {
            return Result.fail<IElevadorDTO>(pisosOrError.error);
          } else {
            existingElevador.updatePisos(pisosOrError.getValue());
          }
        }

        if (elevadorDTO.numeroSerie){
          existingElevador.updateNumeroSerie(elevadorDTO.numeroSerie);
        }

        if (elevadorDTO.descricao){
          existingElevador.updateDescricao(elevadorDTO.descricao);
        }

        await this.elevadorRepo.save(existingElevador);
        return Result.ok<IElevadorDTO>(ElevadorMap.toDTO(existingElevador));
      }

      return Result.fail<IElevadorDTO>('Não foi possível encontrar o elevador.');

    } catch (e) {
      return Result.fail<IElevadorDTO>(e.message);
    }
  }

  public async deleteElevador(numeroIdentificativo: string) {
    try {
      const result = await this.elevadorRepo.delete(numeroIdentificativo);
      if (result == 0) {
        return Result.fail<string>("Não foi possivel encontrar o Elevador com o número identificativo " + numeroIdentificativo);
      } else if (result == 1) {
        return Result.ok<string>("Elevador eliminado com sucesso!");
      } else {
        return Result.fail<string>("Erro a eliminar o Elevador com o número identificativo " + numeroIdentificativo + ". Verifique a base de dados.");
      }
    } catch (e) {
      return Result.ok<string>("Erro a eliminar o Elevador. Erro: " + e.message);
    }
  }


  private async getEdificio(codigoEdificio: string): Promise<Result<Edificio>> {

    const edificio = await this.edificioRepo.findByCodigo(codigoEdificio);
    const found = !!edificio;

    if (found) {
      return Result.ok<Edificio>(edificio);
    } else {
      return Result.fail<Edificio>("Não foi possivel encontrar o edificio pelo nome" + codigoEdificio);
    }
  }

  private async getPisos(pisoIds: string[]): Promise<Result<Piso[]>> {
    const pisosList: Piso[] = [];

    for (let i = 0; i < pisoIds.length; i++) {
      const pisoFound = await this.pisoRepo.findByCodigo(pisoIds[i]);
      pisosList.push(pisoFound);
    }
    if (pisosList != null) {
      return Result.ok<Piso[]>(pisosList);
    } else {
      return null;
    }
  }

  public async getElevadores(): Promise<Result<IElevadorDTO[]>> {
    try {
      const ElevadorList: Elevador[] = await this.elevadorRepo.findAll();
      let ElevadorListDto: IElevadorDTO[] = [];
      if (ElevadorList != null) {
        for (let i = 0; i < ElevadorList.length; i++) {
          ElevadorListDto.push(ElevadorMap.toDTO(ElevadorList[i]));
        }
        return Result.ok<IElevadorDTO[]>(ElevadorListDto);
      }

      return Result.fail<IElevadorDTO[]>('Não existem Elevadores para listar.');
    } catch (e) {
      throw e;
    }
  }

  private async proxNumIdentificativoValido(codEdificio: string) : Promise<string> {
    const lastNumIdentificativo = await this.elevadorRepo.getLastNumeroIdentificativoOfGivenEdificio(codEdificio);
    try {
      if (lastNumIdentificativo) {
        const ultimoNum = parseInt(lastNumIdentificativo.slice(codEdificio.length));
        const proxNumIdentificativo = codEdificio + (ultimoNum + 1);
        return proxNumIdentificativo.toString();
      } else {
        //QUANDO É O PRIMEIRO ELEVADOR A SER INTRODUZIDO NO EDIFICIO
        return codEdificio + "1";
      }
    } catch (e) {
      throw e;
    }

  }

}
