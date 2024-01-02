import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import edificio from './routes/edificioRoute';
import tipoRobot from './routes/tipoRobotRoute';
import piso from './routes/pisoRoute';
import sala from './routes/salaRoute';
import passagem from './routes/passagemRoute';
import elevador from './routes/elevadorRoute';
import robot from './routes/robotRoute';
import planeamentoRoute from './routes/planeamentoRoute';

export default () => {
  const app = Router();

  auth(app);
  user(app);
  role(app);
  edificio(app);
  piso(app);
	sala(app);
  tipoRobot(app);
  passagem(app);
  elevador(app);
  robot(app);
  planeamentoRoute(app);
  return app;
};
