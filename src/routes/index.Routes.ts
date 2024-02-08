import express from 'express';
import { indexClass } from '../controllers/index.Controller';

const indexRouter = express.Router();

indexRouter.post('/createIndex', indexClass.createIndex);
indexRouter.delete('/deleteIndex', indexClass.deleteIndex);

export default indexRouter;