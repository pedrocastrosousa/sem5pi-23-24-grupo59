import { Service, Inject } from 'typedi';
import config from "../../config";
import { Sala } from '../domain/sala/sala';
import { ISalaDTO } from '../dto/ISalaDTO';
import ISalaRepo from './IRepos/ISalaRepo';
import ISalaService from './IServices/ISalaService';
import { SalaMap } from '../mappers/SalaMap';

import { Result } from "../core/logic/Result";
import { CategoriaSala } from '../domain/sala/categoriaSala';
import { DimensaoSala } from '../domain/sala/dimensaoSala';
import { DescricaoSala } from '../domain/sala/descricaoSala';
import { NomeSala } from '../domain/sala/nomeSala';
import IPisoRepo from './IRepos/IPisoRepo';
import { Piso } from '../domain/piso/piso';

@Service()
export default class SalaService implements ISalaService {
  constructor(
    @Inject(config.repos.sala.name) private salaRepo: ISalaRepo,
    @Inject(config.repos.piso.name) private pisoRepo: IPisoRepo,
  ) { }

  public async createSala(salaDTO: ISalaDTO): Promise<Result<ISalaDTO>> {
    try {
      const name = NomeSala.create( salaDTO.nomeSala ).getValue();
      const categoria = CategoriaSala.create( salaDTO.categoriaSala ).getValue();
      const dimensao = DimensaoSala.create( salaDTO.dimensaoSala.x1, salaDTO.dimensaoSala.y1, salaDTO.dimensaoSala.x2, salaDTO.dimensaoSala.y2 ).getValue();
      const descricao = DescricaoSala.create( salaDTO.descricaoSala ).getValue();

      const piso = await this.pisoRepo.findByCodigo(salaDTO.piso);
      if (piso === null) {
        return Result.fail<ISalaDTO>('Não foi possível encontrar o piso inserido.');
      }

      const salaOrError = Sala.create({
        nomeSala: name,
        categoriaSala: categoria,
        dimensaoSala: dimensao,
        descricaoSala: descricao,
        piso: piso
      });

      if (salaOrError.isFailure) {
        return Result.fail<ISalaDTO>(salaOrError.errorValue());
      }

      const salaResult = salaOrError.getValue();
      await this.salaRepo.save(salaResult);

      const salaDTOResult = SalaMap.toDTO(salaResult) as ISalaDTO;

      return Result.ok<ISalaDTO>(salaDTOResult)
    } catch (e) {
      throw e;
    }
  }
}
