import express from 'express';
import { createPlayerController, checkPlayerTimeAndUpdateController, checkPlayerExistsController, getPlayerRecordController, getLeaderboardController } from '../controlles/players.controlles.js';

const router = express.Router();

router.post('/createPlayer/:name', createPlayerController);
router.put('/checkPlayerTimeAndUpdate', checkPlayerTimeAndUpdateController);
router.get('/checkPlayerExists/:name', checkPlayerExistsController);
router.get('/getPlayerRecord/:name', getPlayerRecordController);
router.get('/getLeaderboard', getLeaderboardController);

export default router;  