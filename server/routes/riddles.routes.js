import express from 'express';
import { getRiddleController, createRiddleController, updateRiddleController, deleteRiddleController } from '../controlles/riddles.controlles.js';

const router = express.Router();

router.get('/getRiddle', getRiddleController);
router.post('/createRiddle', createRiddleController);
router.put('/updateRiddle/:id', updateRiddleController);
router.delete('/deleteRiddle/:id', deleteRiddleController);

export default router;