import { Repo } from "../../core/infra/Repo";
import { Sala } from "../../domain/sala/sala"

export default interface IRoleRepo extends Repo<Sala> {
  save(sala: Sala): Promise<Sala>;
  findById (id: string): Promise<Sala>;
  findAll() : Promise<Array<Sala>>;

  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}