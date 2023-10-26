import { Service, Inject } from 'typedi';
import config from "../../config";
import { IElevadorDTO } from '../dto/IElevadorDTO';
import { Elevador } from '../domain/elevador/elevador';

import { ElevadorMap } from '../mappers/ElevadorMap';
import { Result } from "../core/logic/Result";
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

@Service()
export default class ElevadorService implements IElevadorService {
  constructor(
    @Inject(config.repos.elevador.name) private elevadorRepo: IElevadorRepo,
    @Inject(config.repos.piso.name) private pisoRepo: IPisoRepo,
    @Inject(config.repos.edificio.name) private edificioRepo: IEdificioRepo
  ) { }

  public async createElevador(elevadorDTO: IElevadorDTO): Promise<Result<IElevadorDTO>> {
    try {
      
      const numeroSerie = await NumeroSerieElevador.create(elevadorDTO.numeroSerie).getValue();
      const marca = await MarcaElevador.create(elevadorDTO.marca).getValue();
      const modelo = await ModeloElevador.create(elevadorDTO.modelo).getValue();
      const descricao = await DescricaoElevador.create(elevadorDTO.descricao).getValue();
      const edificioOrError = await this.getEdificio(elevadorDTO.edificio);
      let edificio: Edificio;
      let pisos: Piso[];
      console.log('linha 37 service');

      if (edificioOrError.isFailure) {
        return Result.fail<IElevadorDTO>(edificioOrError.error);
      } else {
        edificio = edificioOrError.getValue();
      }
      const pisosOrError = await this.getPisos(elevadorDTO.pisos);


      if (pisosOrError.isFailure) {
        return Result.fail<IElevadorDTO>(pisosOrError.error);
      } else {

        pisos = pisosOrError.getValue();
      }
      console.log(pisosOrError);

      const ElevadorOrError = Elevador.create({
        edificio: edificio,
        pisos: pisos,
        numeroSerie: numeroSerie,
        marca: marca,
        modelo: modelo,
        descricao: descricao,
      });
      console.log(ElevadorOrError);
   
    

      if (ElevadorOrError.isFailure) {
        return Result.fail<IElevadorDTO>(ElevadorOrError.errorValue());
      }

      const ElevadorResult = ElevadorOrError.getValue();


      await this.elevadorRepo.save(ElevadorResult);
      console.log('service after save');

      const ElevadorDTOResult = ElevadorMap.toDTO(ElevadorResult) as IElevadorDTO;
      return Result.ok<IElevadorDTO>(ElevadorDTOResult)


    } catch (e) {
      throw e;
    }

  }


  private async getEdificio(edificioId: string): Promise<Result<Edificio>> {

    const edificio = await this.edificioRepo.findByDomainId(edificioId);
    const found = !!edificio;

    if (found) {
      return Result.ok<Edificio>(edificio);
    } else {
      return Result.fail<Edificio>("Não foi possivel encontrar o edificio pelo nome" + edificioId);
    }
  }

  private async getPisos(pisoIds: string[]): Promise<Result<Piso[]>> {
    const pisosList: Piso[] = [];

    for (let i = 0; i < pisoIds.length; i++) {
      const pisoFound = await this.pisoRepo.findByDomainId(pisoIds[i]);
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

      return Result.fail<IElevadorDTO[]>("Não existem Elevadors para listar.");
    } catch (e) {
      throw e;
    }
  }

  /*

  public async updateElevador(ElevadorID: string, ElevadorDTO: IElevadorDTO): Promise < Result < IElevadorDTO >> {
  try {
    /*
    if (!ElevadorID) {
      return Result.fail<IElevadorDTO>('ID do edifício não fornecido para atualização.');
    }

    const existingElevador = await this.ElevadorRepo.findById(ElevadorID);

    if (existingElevador != null) {
      if (ElevadorDTO.nome) {
        existingElevador.updateNome(await NomeElevador.create(ElevadorDTO.nome).getValue());
      }

      if (ElevadorDTO.dimensoes) {
        existingElevador.updateDimensoes(
          await DimensaoPiso.create(ElevadorDTO.dimensoes.comprimento, ElevadorDTO.dimensoes.largura).getValue()
        );
      }
      

    if(ElevadorDTO.descricao) {
  existingElevador.updateDescricao(await DescricaoElevador.create(ElevadorDTO.descricao).getValue());
}

await this.ElevadorRepo.save(existingElevador);
return Result.ok<IElevadorDTO>(ElevadorMap.toDTO(existingElevador));
      }


return Result.fail<IElevadorDTO>('Não foi possível encontrar o edifício.');
    } catch (e) {
  return Result.fail<IElevadorDTO>(e.message);
}
  }

  /*

  private async getEdificio(edificioId: string): Promise<Result<Edificio>> {

    const edificio = await this.edificioRepo.findByDomainId(edificioId);
    const found = !!edificio;

    if (found) {
      return Result.ok<Edificio>(edificio);
    } else {
      return Result.fail<Edificio>("Não foi possivel encontrar o edificio pelo nome" + edificioId);
    }
  }


}
*/

}