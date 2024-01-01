/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';

export default interface IUserController {
  updateUser(req: Request, res: Response, next: NextFunction);
}
