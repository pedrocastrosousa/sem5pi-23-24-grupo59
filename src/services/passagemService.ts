import { Inject, Service } from "typedi";
import IPassagemService from "./IServices/IPassagemService";
import config from "../../config";
import { IPassagemDTO } from "../dto/IPassagemDTO";
import IPassagemRepo from "./IRepos/IPassagemRepo";
import { Result } from "../core/logic/Result";
import { Passagem } from "../domain/passagem/passagem";
import IPisoRepo from "./IRepos/IPisoRepo";
import { Piso } from "../domain/piso/piso";
import { PassagemMap } from "../mappers/PassagemMap";
import e from "express";


@Service()
export default class PassagemService implements IPassagemService {
  constructor(
    @Inject(config.repos.passagem.name) private passagemRepo: IPassagemRepo,
    @Inject(config.repos.piso.name) private pisoRepo: IPisoRepo,

  ) { }


  // Função genérica para comparar dois atributos de objetos diferentes

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


      if (pisoo1.edificio.id.equals(pisoo2.edificio.id)) {
        return Result.fail<IPassagemDTO>("Não podem existir passagens entre pisos do mesmo edificio.");
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
      return Result.ok<IPassagemDTO>(passagemDTOResult);
    } catch (e) {
      throw e;
    }
  }

  private async getPiso(pisoId: string): Promise<Result<Piso>> {

    const piso = await this.pisoRepo.findByDomainId(pisoId);

    if (piso) {
      return Result.ok<Piso>(piso);
    } else {
      return Result.fail<Piso>("Couldn't find piso by id=" + pisoId);
    }
  }


  public async getPassagemEntreEdificioeEdificio2(edificio1: string, edificio2: string): Promise<Result<IPassagemDTO[]>> {
    try {
      console.log(edificio1);
      //let edificioo1 = parseFloat(edificio1);
      console.log(edificio2);
     // let edificioo2 = parseFloat(edificio2);
      let passagemListDto: IPassagemDTO[] = [];
      const passagemList: string[] = await this.passagemRepo.findAllByEdificio(edificio1, edificio2);
      console.log(passagemList);
      if (passagemList != null) {
        for (let i = 0; i < passagemList.length; i++) {
          const passagemResult = await (this.passagemRepo.findById(passagemList[i]));
          console.log(passagemResult);

          passagemListDto.push(PassagemMap.toDTO(passagemResult));
          console.log(passagemListDto);

        }
        return Result.ok<IPassagemDTO[]>(passagemListDto);
      }

      return Result.fail<IPassagemDTO[]>("Não existemx passagens para listar.");
    } catch (e) {
      throw e;
    }
  }


  public async updatePassagem(passagemID: string, passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>> {
    try {
      if (!passagemID) {
        return Result.fail<IPassagemDTO>('ID da passagem não fornecido para atualização.');
      }

      const existingPassagem = await this.passagemRepo.findByDomainId(passagemID);


      if (existingPassagem != null) {
        if (passagemDTO.piso1) {
          const piso1OrError = await this.getPiso(passagemDTO.piso1);

          existingPassagem.updatePiso1(piso1OrError.getValue());
        }
        if (passagemDTO.piso1) {
          const piso2OrError = await this.getPiso(passagemDTO.piso1);

          existingPassagem.updatePiso2(piso2OrError.getValue());
        }

        console.log(existingPassagem);
        await this.passagemRepo.save(existingPassagem);
        return Result.ok<IPassagemDTO>(PassagemMap.toDTO(existingPassagem));
      }

      return Result.fail<IPassagemDTO>('Não foi possível encontrar a passagem.');
    } catch (e) {
      return Result.fail<IPassagemDTO>(e.message);
    }
  }
}




