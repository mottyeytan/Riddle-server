import express from 'express';
import { createPlayerController, checkPlayerTimeAndUpdateController, checkPlayerExistsController, getPlayerRecordController, getLeaderboardController, updateRiddlesPlayedIdsController, getPlayerPlayedRiddlesController } from '../controlles/players.controlles.js';


const router = express.Router();

router.post('/createPlayer/:name', createPlayerController);
router.put('/checkPlayerTimeAndUpdate', checkPlayerTimeAndUpdateController);
router.get('/checkPlayerExists/:name', checkPlayerExistsController);
router.get('/getPlayerRecord/:name', getPlayerRecordController);
router.get('/getLeaderboard', getLeaderboardController);
router.put('/updateRiddlesPlayedIds', updateRiddlesPlayedIdsController);
router.get('/getPlayerPlayedRiddles/:name', getPlayerPlayedRiddlesController);

export default router;  