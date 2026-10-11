import express from 'express';
import noteController from '../controllers/userController.js';

const router = express.Router();

router.get('/', noteController.getNotes);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote); // Ruta agregada para editar
router.delete('/:id', noteController.deleteNote);

export default router;