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
import { PassagemMap } from "../mappers/PassagemMap";


@Service()
export default class PassagemService implements IPassagemService {
  constructor(
    @Inject(config.repos.passagem.name) private passagemRepo: IPassagemRepo,
    @Inject(config.repos.piso.name) private pisoRepo: IPisoRepo,
   
  ) { }

  public async createPassagem(passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>> {
    try {

    let pisoo1: Piso;

    const piso1OrError = await this.getPiso(passagemDTO.piso1);
      if (piso1OrError.isFailure) {
        return Result.fail<IPassagemDTO>(piso1OrError.error);
     
      } else {
        pisoo1 = piso1OrError.getValue();
      }

    let pisoo2: Piso;
    const piso2OrError = await this.getPiso(passagemDTO.piso2);
    if (piso2OrError.isFailure) {
      return Result.fail<IPassagemDTO>(piso1OrError.error);
    } else {
      pisoo2 = piso2OrError.getValue();
    }

   
      const PassagemOrError = await Passagem.create({
       piso1: pisoo1,
       piso2: pisoo2
      });

      if (PassagemOrError.isFailure) {
        return Result.fail<IPassagemDTO>(PassagemOrError.errorValue());
      }

      const passagemResult = PassagemOrError.getValue();

      await this.passagemRepo.save(passagemResult);

      const passagemDTOResult = PassagemMap.toDTO(passagemResult) as IPassagemDTO;
      return Result.ok<IPassagemDTO>(passagemDTOResult)
    } catch (e) {
      throw e;
    }
  }


  private async getPiso (pisoId: string): Promise<Result<Piso>> {

    const piso = await this.pisoRepo.findByDomainId( pisoId );

    if (piso) {
      return Result.ok<Piso>(piso);
    } else {
      return Result.fail<Piso>("Couldn't find piso by id=" + pisoId);
    }
  }
}
