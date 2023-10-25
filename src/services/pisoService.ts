import { Inject, Service } from "typedi";
import config from "../../config";
import { Piso } from "../domain/piso/piso";
import { PisoNome } from "../domain/piso/pisoNome";
import { PisoDescricao } from "../domain/piso/pisoDescricao";
import IPisoRepo from "./IRepos/IPisoRepo";
import IPisoService from "./IServices/IPisoService";
import { Result } from "../core/logic/Result";
import { PisoMap } from "../mappers/PisoMap";
import { IPisoDTO } from "../dto/IPisoDTO";
import { Edificio } from "../domain/edificio/edificio";
import IEdificioRepo from "./IRepos/IEdificioRepo";
import e from "express";
import { CodigoEdificio } from "../domain/edificio/codigoEdificio";


@Service()
export default class PisoService implements IPisoService {
  constructor(
    @Inject(config.repos.piso.name) private pisoRepo: IPisoRepo,
    @Inject(config.repos.edificio.name) private edificioRepo: IEdificioRepo,

  ) { }

  public async createPiso(pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>> {
    /*
    const edificioOrError = await this.getEdificio(pisoDTO.edificio);
          if (edificioOrError.isFailure) {
            return Result.fail<{pisoDTO: IPisoDTO; token: string}>(edificioOrError.error);
          } else {
            edificio = edificioOrError.getValue();
          }
    */
    try {

      const nome = await PisoNome.create(pisoDTO.nome).getValue();
      const descricao = await PisoDescricao.create(pisoDTO.descricao).getValue();
      let edificio: Edificio;
      console.log('servicopiso 38');
      const edificioOrError = await this.getEdificio(edificio);
      console.log('servicopiso 41');

      if (edificioOrError.isFailure) {
        return Result.fail<IPisoDTO>(edificioOrError.error);

      } else {

        edificioOrError.getValue();
      }
      const pisoOrError = await Piso.create({
        nome: nome,
        descricao: descricao,
        edificio: edificio,
      });

      if (pisoOrError.isFailure) {
        return Result.fail<IPisoDTO>(pisoOrError.errorValue());
      }
      console.log('servico60');

      const pisoResult = pisoOrError.getValue();

      await this.pisoRepo.save(pisoResult);

      const pisoDTOResult = PisoMap.toDTO(pisoResult) as IPisoDTO;
      return Result.ok<IPisoDTO>(pisoDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async updatePiso(pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>> {
    try {
      const piso = await this.pisoRepo.findByDomainId(pisoDTO.id);

      if (piso === null) {
        return Result.fail<IPisoDTO>("Piso not found");
      }
      else {
        console.log('linha 63');
        piso.nome = PisoNome.create(pisoDTO.nome).getValue();
        piso.descricao = PisoDescricao.create(pisoDTO.descricao).getValue();
        await this.pisoRepo.save(piso);
        console.log('piso service 68');

        const pisoDTOResult = PisoMap.toDTO(piso) as IPisoDTO;
        console.log('piso service 71');

        return Result.ok<IPisoDTO>(pisoDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }



  private async getEdificio(edificio: Edificio): Promise<Result<Edificio>> {
    const edificioExists = await this.edificioRepo.findByDomain(edificio);

    if (edificioExists) {
      return Result.ok<Edificio>(edificio);
    } else {
      return Result.fail<Edificio>("Couldn't find edificio by id=" + edificio);
    }
  }
}
