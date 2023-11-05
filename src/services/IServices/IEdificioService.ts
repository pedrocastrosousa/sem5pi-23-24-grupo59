import { Result } from '../../core/logic/Result';
import IEdificioDTO from '../../dto/IEdificioDTO';

export default interface IEdificioService {
  createEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>>;
  updateEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>>;
  getEdificio(codigoEdificio: string): Promise<Result<IEdificioDTO>>;
  findAll(): Promise<Result<IEdificioDTO[]>>;
  delete(codigoEdificio: string);
}
