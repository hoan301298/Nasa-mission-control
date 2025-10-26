import { Router } from 'express';
import { httpGetAllPlanets } from './planets.controller.js';
const planetsRouter = Router();

planetsRouter.get('/', httpGetAllPlanets);

export default planetsRouter;