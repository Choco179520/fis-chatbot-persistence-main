import express from 'express';
import { documentController } from '../controllers/documentController';

const router = express.Router();

router.post('/documents',documentController.createDocument)
router.get('/documents/:id', documentController.getDocumentById);
router.get('/documents', documentController.getAllDocuments);
router.get('/documents/by-title/:title', documentController.getDocumentByTitle);
router.put('/documents/:id', documentController.updateDocumentById);
router.delete('/documents/:id', documentController.deleteDocumentById);

export default router;
