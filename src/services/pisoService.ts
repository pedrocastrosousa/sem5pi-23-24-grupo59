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
import e from "express";
import { CodigoEdificio } from "../domain/edificio/codigoEdificio";
import IEdificioDTO from "../dto/IEdificioDTO";
import { EdificioMap } from "../mappers/EdificioMap";
import IPassagemRepo from "./IRepos/IPassagemRepo";


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
        codigoPiso: pisoDTO.codigoPiso
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

  public async updatePiso(pisoID: string,pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>> {

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
}
