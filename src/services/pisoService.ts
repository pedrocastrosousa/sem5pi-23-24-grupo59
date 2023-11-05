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
import IEdificioDTO from "../dto/IEdificioDTO";
import { EdificioMap } from "../mappers/EdificioMap";
import IPassagemRepo from "./IRepos/IPassagemRepo";
import IMapaDTO from "../dto/IMapaDTO";


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
      // const mapa = await PisoMapa.create(pisoDTO.mapa).getValue();

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
        codigoPiso: pisoDTO.codigoPiso,
        // mapa: mapa
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

  public async updatePiso(pisoID: string, pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>> {

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


  public async getPisosPorEdificio(codigoEdificio: string): Promise<Result<IPisoDTO[]>> {
    try {
      const pisoList: Piso[] = await this.pisoRepo.findAll();
      console.log(pisoList);
      let pisoListDto: IPisoDTO[] = [];
      if (pisoList != null) {
        for (let i = 0; i < pisoList.length; i++) {

          if (pisoList[i].edificio.codigoEdificio.toString() == codigoEdificio) {
            pisoListDto.push(PisoMap.toDTO(pisoList[i]));
          }
        }

        return Result.ok<IPisoDTO[]>(pisoListDto);
      }

      return Result.fail<IPisoDTO[]>("Não existem pisos para listar.");
    } catch (e) {
      throw e;
    }
  }


  public async carregarMapa(file: IMapaDTO): Promise<Result<boolean>> {

    try {

      const edificio = await this.edificioRepo.findByCodigo(file.codigoEdificio);
      if (edificio === null) {
        return Result.fail<boolean>("Edificio not found");
      }


      const maxLargura = edificio.dimensaoMaximaPisos.props.largura;
      const maxComprimento = edificio.dimensaoMaximaPisos.props.comprimento;
      const tamanhoMapa = file.tamanho;
      if (tamanhoMapa.comprimento > maxComprimento || tamanhoMapa.largura > maxLargura) {
        return Result.fail<boolean>("Tamanho do piso invalido");
      }

      const jsonString = JSON.stringify(file);

      const piso = await this.pisoRepo.findByCodigo(file.codigoPiso);

      if (piso === null) {
        return Result.fail<boolean>("Piso not found");
      }
      if (!piso.edificio.codigoEdificio.equals(edificio.codigoEdificio)) {
        return Result.fail<boolean>("Piso não pertece ao edificio");
      }
      piso.mapa = jsonString;

      const pisoPersistence = PisoMap.toPersistence(piso);
      const pisoo = await this.pisoRepo.update({ edificio: file.codigoEdificio, codigoPiso: file.codigoPiso }, pisoPersistence);

      if (pisoo === null) {
        return Result.fail<boolean>("Erro ao carregar Mapa")
      }
      return Result.ok<boolean>(true);
    }

    catch (e) {
      throw e;
    }
  }

  public async listarPisos(): Promise<Result<IPisoDTO[]>> {
    try {
      const pisoList: Piso[] = await this.pisoRepo.findAll();
      console.log(pisoList);
      let pisoListDto: IPisoDTO[] = [];
      if (pisoList != null) {
        for (let i = 0; i < pisoList.length; i++) {
          pisoListDto.push(PisoMap.toDTO(pisoList[i]));
        }
        return Result.ok<IPisoDTO[]>(pisoListDto);
      }

      return Result.fail<IPisoDTO[]>("Não existem pisos para listar.");
    } catch (e) {
      throw e;
    }
  }

  public async delete(codigoPiso: string) {
    try {
      await this.pisoRepo.delete(codigoPiso);
    } catch (e) {
      throw e;
    }
  }
}


