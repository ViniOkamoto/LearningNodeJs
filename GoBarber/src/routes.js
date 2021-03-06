import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import AvailableController from './app/controllers/AvailableController';

import authMiddleware from './app/middlewares/auth';
import NotifcationController from './app/controllers/NotifcationController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);
routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.get('/provider', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/appointment', AppointmentController.index);
routes.post('/appointment', AppointmentController.store);
routes.delete('/appointment/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notification', NotifcationController.index);
routes.put('/notification/:id', NotifcationController.update);

export default routes;
