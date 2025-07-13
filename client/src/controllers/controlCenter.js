import { userOption, riddlesDetails, updateRiddleOptions, AskForRiddleID, difficultyChoice } from '../utils/userInputs.js';
import { mainMenu } from '../menus/mainMenu.js';
import { difficultyMenu } from '../menus/difficulty.js';
import { createRiddlesApi, updateRiddlesApi, deleteRiddlesApi, readRiddlesAPi } from '../api/riddles.api.js';
import { startGame } from '../game.js';
import { createPlayerApi, checkPlayerExistsApi, getPlayerRecordApi, checkPlayerTimeAndUpdateApi } from '../api/player.api.js';
import { nicePrintRiddles } from '../utils/NicePrint.js';

export async function gameControl(){
    mainMenu();
    const option = userOption();

    switch(option){
        case '1':
            difficultyMenu();
            const difficulty = difficultyChoice(); 
            startGame(difficulty);
            break;
        case '2':
            createRiddlesApi();
            break;
        case '3':
            nicePrintRiddles();
            break;
        case '4':
            updateRiddlesApi();
            break;
        case '5':
            deleteRiddlesApi();
            break;
        case '6':
            return;
        case '7':
            return;
    }
}

gameControl();