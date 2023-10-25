import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import edificio from './routes/edificioRoute';
import tipoRobot from './routes/tipoRobotRoute';
import piso from './routes/pisoRoute';

export default () => {
  const app = Router();

  auth(app);
  user(app);
  role(app);
  edificio(app);
  piso(app);
  return app;
};
