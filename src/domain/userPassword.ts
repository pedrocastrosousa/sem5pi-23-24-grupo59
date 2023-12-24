import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import * as bcrypt from 'bcrypt-nodejs';

interface UserPasswordProps {
  value: string;
  hashed?: boolean;
}
 
export class UserPassword extends ValueObject<UserPasswordProps> {
 
  get value(): string {
    return this.props.value;
  }
 
  private constructor(props) {
    super(props)
  }
 
  /**
 * @method comparePassword
 * @desc Compares as plain-text and hashed password.
 */
 
  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string;
    if (this.isAlreadyHashed()) {
      hashed = this.props.value;
      return this.bcryptCompare(plainTextPassword, hashed);
    } else {
      return this.props.value === plainTextPassword;
    }
  }
 
  private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainText, hashed, (err, compareResult) => {
        if (err) return resolve(false);
        return resolve(compareResult);
      })
    })
  }
 
  public isAlreadyHashed(): boolean {
    return this.props.hashed;
  }
 
  private hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, null, null, (err, hash) => {
        if (err) return reject(err);
        resolve(hash)
      })
    })
  }
 
  public getHashedValue(): Promise<string> {
    return new Promise((resolve) => {
      if (this.isAlreadyHashed()) {
        return resolve(this.props.value);
      } else {
        return resolve(this.hashPassword(this.props.value))
      }
    })
  }
 
  public static isValidPassword(value: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{10,}$/;
    return passwordRegex.test(value);
  }
 
  public static isAppropriateLength(value: string): boolean {
    return value.length >= 10;
  }
 
  public static create(props: UserPasswordProps): Result<UserPassword> {
    const propsResult = Guard.againstNullOrUndefined(props.value, 'password');
 
    if (!propsResult.succeeded) {
      return Result.fail<UserPassword>(propsResult.message);
    } else {
 
      if (!props.hashed) {
        if (!this.isValidPassword(props.value)) {
          return Result.fail<UserPassword>('Password deverá ter pelo menos 10 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caracter especial.');
        }
      }
 
      return Result.ok<UserPassword>(new UserPassword({
        value: props.value,
        hashed: !!props.hashed === true
      }));
    }
  }
}