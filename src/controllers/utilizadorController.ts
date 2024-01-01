import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IUserController from "./IControllers/IUserController";
import IUserService from '../services/IServices/IUserService';

import { Result } from '../core/logic/Result';
import { IUserDTO } from '../dto/IUserDTO';

@Service()
export default class UserController
  implements IUserController {
  constructor(@Inject(config.services.user.name) private userServiceInstance: IUserService) {}

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = (await this.userServiceInstance.updateUser(req.body as IUserDTO)) as Result<
      IUserDTO
      >;

      if (userOrError.isFailure) {
        return res.status(404).send();
      }

      const userDTO = userOrError.getValue();
      return res.status(201).json(userDTO);
    } catch (e) {
      return next(e);
    }
  }
}