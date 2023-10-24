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


@Service()
export default class PisoService implements IPisoService {
  constructor(
    @Inject(config.repos.piso.name) private pisoRepo: IPisoRepo
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
     

      const pisoOrError = await Piso.create({
        nome: nome,
        descricao: descricao,
        edificio: pisoDTO.edificio,
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
  
    public async updatePiso(pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>> {
      try {
        const piso = await this.pisoRepo.findById(pisoDTO.nome);
  
        if (piso === null) {
          return Result.fail<IPisoDTO>("Piso not found");
        }
        else {
          console.log('linha 63');
          //piso.descricao = pisoDTO.descricao;
          piso.edificio = pisoDTO.edificio;

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
  

}
