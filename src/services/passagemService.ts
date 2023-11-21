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
import { PassagemId } from "../domain/passagem/passagemId";


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
        return Result.fail<IPassagemDTO>(piso2OrError.error);
      } else {
        pisoo2 = piso2OrError.getValue();
      }  

      if (pisoo1.edificio.codigoEdificio.equals(pisoo2.edificio.codigoEdificio)) {
        return Result.fail<IPassagemDTO>("Não podem existir passagens entre pisos do mesmo edificio.");
      }
      const passagemId =  PassagemId.create(passagemDTO.passagemId).getValue();


      const PassagemOrError = await Passagem.create({
        passagemId: passagemId,
        piso1: pisoo1,
        piso2: pisoo2,
        codigoPassagem: passagemDTO.codigoPassagem

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

  private async getPiso(codigoPiso: string): Promise<Result<Piso>> {

    const piso = await this.pisoRepo.findByCodigo(codigoPiso);
    if (piso) {
      return Result.ok<Piso>(piso);
    } else {
      return Result.fail<Piso>("Couldn't find piso by código=" + codigoPiso);
    }
  }


  public async getPassagemEntreEdificioeEdificio2(edificio1: string, edificio2: string): Promise<Result<IPassagemDTO[]>> {
    try {
      
      let passagemListDto: IPassagemDTO[] = [];
      const passagemList: string[] = await this.passagemRepo.findAllByEdificio(edificio1, edificio2);
    
      if (passagemList != null) {
        for (let i = 0; i < passagemList.length; i++) {
          console.log("passagemList[i]", passagemList[i]);
          const passagemResult = await (this.passagemRepo.findByDCodigoPassagem(passagemList[i]));

          passagemListDto.push(PassagemMap.toDTO(passagemResult));

        }
        return Result.ok<IPassagemDTO[]>(passagemListDto);
      }

      return Result.fail<IPassagemDTO[]>("Não existemx passagens para listar.");
    } catch (e) {
      throw e;
    }
  }


  public async updatePassagem(passagemID:string,passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>> {
    try {
      if (!passagemID) {
        return Result.fail<IPassagemDTO>('ID da passagem não fornecido para atualização.');
      }

      const existingPassagem = await this.passagemRepo.findByCodigo(passagemID.toString());

    
      if (existingPassagem != null) {
        if (passagemDTO.piso1) {
          const piso1OrError = await this.getPiso(passagemDTO.piso1);
          existingPassagem.updatePiso1(piso1OrError.getValue());
        }
        if (passagemDTO.piso2) {
          const piso2OrError = await this.getPiso(passagemDTO.piso2);

          existingPassagem.updatePiso2(piso2OrError.getValue());
        }
        if (existingPassagem.piso1.edificio.codigoEdificio.equals(existingPassagem.piso2.edificio.codigoEdificio)) {
          return Result.fail<IPassagemDTO>("Não podem existir passagens entre pisos do mesmo edificio.");
        }
        await this.passagemRepo.save(existingPassagem);
        return Result.ok<IPassagemDTO>(PassagemMap.toDTO(existingPassagem));
      }

      return Result.fail<IPassagemDTO>('Não foi possível encontrar a passagem.');
    } catch (e) {
      return Result.fail<IPassagemDTO>(e.message);
    }
  }

  public async getAllPassagens(): Promise<Result<IPassagemDTO[]>> {
    try {
      const passagemList: Passagem[] = await this.passagemRepo.findAll();
      let passagemListDto: IPassagemDTO[] = [];
      if (passagemList != null) {
        for (let i = 0; i < passagemList.length; i++) {
          passagemListDto.push(PassagemMap.toDTO(passagemList[i]));
        }
        return Result.ok<IPassagemDTO[]>(passagemListDto);
      }

      return Result.fail<IPassagemDTO[]>("Não existem passagens para listar.");
    } catch (e) {
      throw e;
    }
  }

 
  public async deletePassagem(passagemID: string) {
    try {
    await this.passagemRepo.delete(passagemID);
       
          } catch (e) {
      throw e;
    }
}
}




