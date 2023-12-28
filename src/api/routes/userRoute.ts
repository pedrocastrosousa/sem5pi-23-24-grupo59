import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import AuthService from '../../services/userService';
import { IUserDTO } from '../../dto/IUserDTO';

import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');

var user_controller = require('../../controllers/userController');

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
        telefone: Joi.number().optional(),
        numeroContribuinte: Joi.number().optional(),
        estado: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body )

      try {
        const authServiceInstance = Container.get(AuthService);
        const userOrError = await authServiceInstance.SignUp(req.body as IUserDTO);

        if (userOrError.isFailure) {
          logger.debug(userOrError.errorValue())
          return res.status(401).send(userOrError.errorValue());
        }
    
        const {userDTO, token} = userOrError.getValue();

        return res.status(201).json({ userDTO, token });
      } catch (e) {
        //logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-In endpoint with body: %o', req.body)
      try {
        const { email, password } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const result = await authServiceInstance.SignIn(email, password);
        
        if( result.isFailure )
          return res.json().status(403);

        const { userDTO, token } = result.getValue();
        return res.json({ userDTO, token }).status(200);

      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  route.post('/logout', middlewares.isAuth, (req: Request, res: Response, next: NextFunction) => {
    
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });


  route.post(
    '/delete',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-In endpoint with body: %o', req.body)
      try {
        const { email } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const result = await authServiceInstance.DeleteUser(email);
        
        if( result.isFailure )
          return res.json().status(403);

        return res.json().status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  app.use('/users', route);

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, user_controller.getMe);


  route.get(
    '/listarPendentes',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      try {
        const authServiceInstance = Container.get(AuthService);
        const result = await authServiceInstance.getPendentes();
        console.log("result", result);
  
        if (result.isFailure) {
          return res.status(403).json(); // Ajuste a resposta HTTP aqui, se necessário
        }
  
        const users = result.getValue();
        return res.json(users);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );

  route.get(
    '/:email',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      try {
        const authServiceInstance = Container.get(AuthService);
        const result = await authServiceInstance.getUser(req.params.email);
        console.log("result", result);
  
        if (result.isFailure) {
          return res.status(403).json(); // Ajuste a resposta HTTP aqui, se necessário
        }
  
        const users = result.getValue();
        return res.json(users);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );
  route.patch(
    '/aprovar/:email',
    celebrate({
      body: Joi.object({
                
      }),
      params: Joi.object({ 
          email: Joi.string().required()
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-In endpoint with body: %o', req.body)
      try {
        const { email } = req.body;
        const authServiceInstance = Container.get(AuthService);
        
        const result = await authServiceInstance.aprovarUser(req.params.email);
        
        if( result.isFailure )
          return res.json().status(403);

        return res.json().status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  route.patch(
    '/recusar/:email',
    celebrate({
      body: Joi.object({
                
      }),
      params: Joi.object({ 
          email: Joi.string().required()
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-In endpoint with body: %o', req.body)
      try {
        const { email } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const result = await authServiceInstance.recusarUser(req.params.email);
        
        if( result.isFailure )
          return res.json().status(403);

        return res.json().status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );
};
