import express from 'express';
import {responseSetController} from '../controllers/responseSetController';

const router = express.Router();

router.post('/response-sets', responseSetController.createResponseSet);
router.get('/response-sets', responseSetController.getResponseSet);
router.get('/response-sets/:id', responseSetController.getResponseSetById);
router.put('/response-sets/:id', responseSetController.updateResponseSetById);
router.delete('/response-sets/:id', responseSetController.deleteResponseSetById);

export default router;
