import { Service, Inject } from 'typedi';
import config from '../../config';
import IEdificioDTO from '../dto/IEdificioDTO';
import { Edificio } from '../domain/edificio/edificio';
import IEdificioRepo from '../services/IRepos/IEdificioRepo';
import IEdificioService from './IServices/IEdificioService';
import { Result } from '../core/logic/Result';
import { EdificioMap } from '../mappers/EdificioMap';
import { DescricaoEdificio } from '../domain/edificio/descricaoEdificio';
import { NomeEdificio } from '../domain/edificio/nomeEdificio';
import { DimensaoMaximaPisos } from '../domain/edificio/dimensaoMaximaPisos';
import { forEach } from 'lodash';
import { CodigoEdificio } from '../domain/edificio/codigoEdificio';

@Service()
export default class EdificioService implements IEdificioService {
  constructor(@Inject(config.repos.edificio.name) private edificioRepo: IEdificioRepo) {}

  public async findAll(): Promise<Result<IEdificioDTO[]>> {
    try {
      const edificios = await this.edificioRepo.findAll();
      if (edificios === null) {
        return Result.fail<IEdificioDTO[]>('Edificio not found');
      }

      const edificioDTOResult: IEdificioDTO[] = edificios.map(edificio => EdificioMap.toDTO(edificio));

      return Result.ok<IEdificioDTO[]>(edificioDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getEdificio(codigoEdificio: string): Promise<Result<IEdificioDTO>> {
    try {
      const edificio = await this.edificioRepo.findByCodigo(codigoEdificio);

      if (edificio === null) {
        return Result.fail<IEdificioDTO>('Edificio not found');
      } else {
        const edificioDTOResult = EdificioMap.toDTO(edificio) as IEdificioDTO;
        return Result.ok<IEdificioDTO>(edificioDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async createEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>> {
    try {
      const currentEdificio = await this.edificioRepo.findByCodigo(edificioDTO.codigoEdificio);
      if (currentEdificio) {
        return Result.fail<IEdificioDTO>('Ja existe um edificio com o codigo inserido!');
      }

      const codigoEdificio = CodigoEdificio.create(edificioDTO.codigoEdificio).getValue();
      const descricaoEdificio = DescricaoEdificio.create(edificioDTO.descricaoEdificio).getValue();
      const nomeEdificio = NomeEdificio.create(edificioDTO.nomeEdificio).getValue();
      const dimensaoMaximaPisos = DimensaoMaximaPisos.create(edificioDTO.dimensaoMaximaPisos).getValue();

      const edificioOrError = Edificio.create({
        codigoEdificio: codigoEdificio,
        descricaoEdificio: descricaoEdificio,
        nomeEdificio: nomeEdificio,
        dimensaoMaximaPisos: dimensaoMaximaPisos,
      });
      if (edificioOrError.isFailure) {
        return Result.fail<IEdificioDTO>(edificioOrError.errorValue());
      }

      const edificioResult = edificioOrError.getValue();

      await this.edificioRepo.save(edificioResult);

      const edificioDTOResult = EdificioMap.toDTO(edificioResult) as IEdificioDTO;
      return Result.ok<IEdificioDTO>(edificioDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updateEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>> {
    try {
      const edificio = await this.edificioRepo.findByCodigo(edificioDTO.codigoEdificio);
      if (edificio === null) {
        return Result.fail<IEdificioDTO>('Edificio not found');
      } else {
        edificio.descricaoEdificio = DescricaoEdificio.create(edificioDTO.descricaoEdificio).getValue();
        edificio.nomeEdificio = NomeEdificio.create(edificioDTO.nomeEdificio).getValue();
        edificio.dimensaoMaximaPisos = DimensaoMaximaPisos.create(edificioDTO.dimensaoMaximaPisos).getValue();
        await this.edificioRepo.save(edificio);
        const edificioDTOResult = EdificioMap.toDTO(edificio) as IEdificioDTO;
        return Result.ok<IEdificioDTO>(edificioDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async delete(codigoEdificio: string) {
    try {
      await this.edificioRepo.delete(codigoEdificio);
    } catch (e) {
      throw e;
    }
  }
}
