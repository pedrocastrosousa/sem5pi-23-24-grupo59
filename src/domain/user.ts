import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { UserId } from "./userId";
import { UserEmail } from "./userEmail";
import { Role } from "../domain/role";
import { UserPassword } from "./userPassword";
import { Guard } from "../core/logic/Guard";
import { Telefone } from "./telefone";
import { NumeroContribuinte } from "./numeroContribuinte";
import { UserEstado } from "./userEstado";


interface UserProps {
  firstName: string;
  lastName: string;
  email: UserEmail;
  telefone: Telefone;
  password: UserPassword;
  role: Role;
  numeroContribuinte?: NumeroContribuinte;
  estado: UserEstado;
}
 
export class User extends AggregateRoot<UserProps> {
  get id (): UniqueEntityID {
    return this._id;
  }
 
  get userId (): UserId {
    return UserId.caller(this.id)
  }
 
  get email (): UserEmail {
    return this.props.email;
  }
 
  get firstName (): string {
    return this.props.firstName
  }
 
  get lastName (): string {
    return this.props.lastName;
  }
 
  get password (): UserPassword {
    return this.props.password;
  }
 
  get role (): Role {
    return this.props.role;
  }
 
  set role (value: Role) {
      this.props.role = value;
  }
 
  get telefone (): Telefone {
    return this.props.telefone;
  }
 
  get numeroContribuinte (): NumeroContribuinte | undefined {
    return this.props.numeroContribuinte;
  }
 
  get estado (): UserEstado {
    return this.props.estado;
  }

 
  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }
 
  public static create (props: UserProps, id?: UniqueEntityID): Result<User> {
 
    const guardedProps = [
      { argument: props.firstName, argumentName: 'firstName' },
      { argument: props.lastName, argumentName: 'lastName' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.role, argumentName: 'role' },
      {argument: props.telefone, argumentName: 'telefone'},
     {argument: props.numeroContribuinte, argumentName: 'numeroContribuinte'},
      {argument: props.estado, argumentName: 'estado'},
    ];
 
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
 
    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message)
    }    
    else {
      const user = new User({
        ...props
      }, id);
 
      return Result.ok<User>(user);
    }
  }

  updateEstado(estado: UserEstado): void {
    if (estado) {
        this.props.estado = estado;
    }
  }

}