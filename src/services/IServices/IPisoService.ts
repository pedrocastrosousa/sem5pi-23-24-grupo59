import { Result } from "../../core/logic/Result";
import { IPisoDTO } from "../../dto/IPisoDTO";

export default interface IPisoService  {
    createPiso(pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>>;
    updatePiso(pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>>;
   // getPiso (pisoId: string): Promise<Result<IPisoDTO>>;
}
