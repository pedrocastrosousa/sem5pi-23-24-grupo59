import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IUserDTO} from "../dto/IUserDTO";

import { User } from "../domain/user";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { UserEmail } from "../domain/userEmail";
import { UserPassword } from "../domain/userPassword";

import RoleRepo from "../repos/roleRepo";
import { Telefone } from '../domain/telefone';
import { UserEstado } from '../domain/userEstado';

export class UserMap extends Mapper<User> {

  public static toDTO( user: User): IUserDTO {
    return {
      //id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.value,
      password: "",
      role: user.role.name.toString(),
      telefone: user.telefone.props.numero,
      numeroContribuinte: user.numeroContribuinte.props.numero,
      estado: user.estado,
    } as IUserDTO;
  }

  public static async toDomain (raw: any): Promise<User> {
    const userEmailOrError = UserEmail.create(raw.email);
    const userPasswordOrError = UserPassword.create({value: raw.password, hashed: true});
    const telefoneOrError = Telefone.create(raw.telefone);
    const numeroContribuinteOrError = Telefone.create(raw.numeroContribuinte);
    const repo = Container.get(RoleRepo);
    const role = await repo.findByName(raw.role);

    const userOrError = User.create({
      firstName: raw.firstName,
      lastName: raw.lastName,
      email: userEmailOrError.getValue(),
      password: userPasswordOrError.getValue(),
      role: role,
      telefone: telefoneOrError.getValue(),
      numeroContribuinte: numeroContribuinteOrError.getValue(),
      estado: raw.estado,
    }, new UniqueEntityID(raw.domainId))

    userOrError.isFailure ? console.log(userOrError.error) : '';
    
    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toPersistence (user: User): any {
    const a = {
      domainId: user.id.toString(),
      email: user.email.value,
      password: user.password.value,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role.name,
      telefone: user.telefone.props.numero,
      numeroContribuinte: user.numeroContribuinte.props.numero,
      estado: user.estado,
    }
    return a;
  }
}