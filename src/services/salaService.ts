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

@Service()
export default class SalaService implements ISalaService {
  constructor(
    @Inject(config.repos.sala.name) private salaRepo: ISalaRepo
  ) { }

  public async createSala(salaDTO: ISalaDTO): Promise<Result<ISalaDTO>> {
    try {

      const categoria = await CategoriaSala.create( salaDTO.categoriaSala ).getValue();
      const dimensao = await DimensaoSala.create( salaDTO.dimensaoSala.x1, salaDTO.dimensaoSala.y1, salaDTO.dimensaoSala.x2, salaDTO.dimensaoSala.y2 ).getValue();
      const descricao = await DescricaoSala.create( salaDTO.descricaoSala ).getValue();

      const salaOrError = await Sala.create({
        categoriaSala: categoria,
        dimensaoSala: dimensao,
        descricaoSala: descricao
      });

      if (salaOrError.isFailure) {
        return Result.fail<ISalaDTO>(salaOrError.errorValue());
      }

      const salaResult = salaOrError.getValue();
      console.log('log3 \n', salaResult);
      await this.salaRepo.save(salaResult);

      const salaDTOResult = SalaMap.toDTO(salaResult) as ISalaDTO;
      
      console.log('log4 \n', salaDTOResult.categoriaSala);

      return Result.ok<ISalaDTO>(salaDTOResult)
    } catch (e) {
      throw e;
    }
  }
}
