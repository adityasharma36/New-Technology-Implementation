
import express from 'express'
import { createComplainDocumentController, getComplainDocumentController, searchComplainController, updateComplainController } from '../controllers/eSearch.controller';

const eRoute = express.Router();


eRoute.get('/complain',getComplainDocumentController)

eRoute.post('/complain',createComplainDocumentController)

eRoute.post('/complains',searchComplainController);

eRoute.post('/complain/update',updateComplainController);


export default eRoute;