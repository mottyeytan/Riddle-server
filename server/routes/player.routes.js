import express from 'express';
import { createPlayerController, checkPlayerTimeAndUpdateController, checkPlayerExistsController, getPlayerRecordController } from '../controlles/players.controlles.js';

const router = express.Router();

router.post('/createPlayer/:name', createPlayerController);
router.put('/checkPlayerTimeAndUpdate', checkPlayerTimeAndUpdateController);
router.get('/checkPlayerExists/:name', checkPlayerExistsController);
router.get('/getPlayerRecord/:name', getPlayerRecordController);

export default router;  