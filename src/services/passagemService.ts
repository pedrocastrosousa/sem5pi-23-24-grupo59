import { Inject, Service } from "typedi";
import IPassagemService from "./IServices/IPassagemService";
import config from "../../config";
import { IPassagemDTO } from "../dto/IPassagemDTO";
import IPassagemRepo from "./IRepos/IPassagemRepo";
import { Result } from "../core/logic/Result";
import { Passagem } from "../domain/passagem/passagem";
import { CoordenadaPiso1 } from "../domain/passagem/coordenadaPiso1";
import { CoordenadaPiso2 } from "../domain/passagem/coordenadaPiso2";
import IPisoRepo from "./IRepos/IPisoRepo";
import { Piso } from "../domain/piso/piso";
import { PassagemId } from "../domain/passagem/passagemId";
import { PassagemMap } from "../mappers/PassagemMap";


@Service()
export default class PassagemService implements IPassagemService {
  constructor(
    @Inject(config.repos.passagem.name) private passagemRepo: IPassagemRepo,
    @Inject(config.repos.piso.name) private pisoRepo : IPisoRepo,

  ) { }

  public async createPassagem(passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>> {
    try {

     
    let piso1: Piso;
    const piso1OrError = await this.getPiso(passagemDTO.coordenadasPiso1.piso);
      if (piso1OrError.isFailure) {
        return Result.fail<IPassagemDTO>(piso1OrError.errorValue());
     
      } else {
        piso1 = piso1OrError.getValue();
      }

    let piso2: Piso;
    const piso2OrError = await this.getPiso(passagemDTO.coordenadasPiso2.piso);
    if (piso2OrError.isFailure) {
      return Result.fail<IPassagemDTO>(piso1OrError.errorValue());
    } else {
      piso2 = piso2OrError.getValue();
    }
     const coordenadaPiso1 = await CoordenadaPiso1.create(passagemDTO.coordenadasPiso1.x, passagemDTO.coordenadasPiso1.y , piso1).getValue();
     const coordenadaPiso2 = await CoordenadaPiso2.create(passagemDTO.coordenadasPiso2.x, passagemDTO.coordenadasPiso2.y , piso2 ).getValue();
     
      const PassagemOrError = await Passagem.create({
        id: passagemDTO.id.toString(),
        coordenadaPiso1: coordenadaPiso1,
        coordenadaPiso2: coordenadaPiso2,
      });

      if (PassagemOrError.isFailure) {
        return Result.fail<IPassagemDTO>(PassagemOrError.errorValue());
      }

      const PassagemResult = PassagemOrError.getValue();

      await this.passagemRepo.save(PassagemResult);

      const PassagemDTOResult = PassagemMap.toDTO(PassagemResult) as IPassagemDTO;
      return Result.ok<IPassagemDTO>(PassagemDTOResult)
    } catch (e) {
      throw e;
    }
  }


  private async getPiso (pisoId: string): Promise<Result<Piso>> {

    const piso = await this.pisoRepo.findByDomainId( pisoId );
    const found = !!piso;

    if (found) {
      return Result.ok<Piso>(piso);
    } else {
      return Result.fail<Piso>("Couldn't find piso by id=" + pisoId);
    }
  }
}
