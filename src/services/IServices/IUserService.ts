import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserService {
  SignUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO; token: string }>>;
  SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO; token: string }>>;
  DeleteUser(email: string, password: string): Promise<Result<void>>;
  getPendentes(): Promise<Result<IUserDTO[]>>;
  aprovarUser(email: string): Promise<Result<IUserDTO>>;
  recusarUser(email: string): Promise<Result<IUserDTO>>;
  getUtentes(): Promise<Result<IUserDTO[]>>;
  updateUser(userDTO: IUserDTO): Promise<Result<IUserDTO>>;
}
