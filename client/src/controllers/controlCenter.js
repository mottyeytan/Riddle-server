import { userOption, riddlesDetails, updateRiddleOptions, AskForRiddleID, difficultyChoice } from '../utils/userInputs.js';
import { mainMenu } from '../menus/mainMenu.js';
import { difficultyMenu } from '../menus/difficulty.js';
import { createRiddlesApi, updateRiddlesApi, deleteRiddlesApi, readRiddlesAPi } from '../api/riddles.api.js';
import { startGame } from '../game.js';
import { createPlayerApi, checkPlayerExistsApi, getPlayerRecordApi, checkPlayerTimeAndUpdateApi } from '../api/player.api.js';
import { nicePrintRiddles, printLeaderboard } from '../utils/NicePrint.js';
import { MainLoginMenu } from '../menus/login.js';

export async function gameControl(){

    await MainLoginMenu();


    
    await mainMenu();
    const option = await userOption();

    switch(option){
        case '1':
            await difficultyMenu();
            const difficulty = await difficultyChoice(); 
            startGame(difficulty);
            break;
        case '2':
            await createRiddlesApi();
            break;
        case '3':
            await nicePrintRiddles();
            break;
        case '4':
             await updateRiddlesApi();
            break;
        case '5':
             await deleteRiddlesApi();
            break;
        case '6':
             await printLeaderboard();
             break;
        case '7':
            return;
    }
}

