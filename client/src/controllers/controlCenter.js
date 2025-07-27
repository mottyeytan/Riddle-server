import { userOption, riddlesDetails, updateRiddleOptions, AskForRiddleID, difficultyChoice } from '../utils/userInputs.js';
import { mainMenu } from '../menus/mainMenu.js';
import { difficultyMenu } from '../menus/difficulty.js';
import { createRiddlesApi, updateRiddlesApi, deleteRiddlesApi, readRiddlesAPi } from '../api/riddles.api.js';
import { startGame } from '../game.js';
import { createPlayerApi, checkPlayerExistsApi, getPlayerRecordApi, checkPlayerTimeAndUpdateApi } from '../api/player.api.js';
import { nicePrintRiddles, printLeaderboard } from '../utils/NicePrint.js';
import { MainLoginMenu } from '../menus/login.js';
import { isLoggedIn } from '../utils/tokenManager.js';
import chalk from 'chalk';
import { getToken, removeToken } from '../utils/tokenManager.js';
import jwt from 'jsonwebtoken';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function gameControl(){
    const loggedIn = await isLoggedIn();
    if(!loggedIn){

        await MainLoginMenu();
    }else{
        const token = await getToken();
        console.clear();
        console.log(chalk.gray("--------------------------------"))
        console.log(chalk.green.bold("you are logged in as: " + jwt.decode(token.token).role))
        console.log(chalk.gray("--------------------------------"))
        console.log(chalk.blue.bold("to go back to login menue press 1, to logout press 2, to continue press 3"))
        const backToLogin = await userOption();
        if(backToLogin === '1'){
            console.clear();
            console.log(chalk.gray("--------------------------------"))
            console.log(chalk.green.bold("you are logged in as: " + jwt.decode(token.token).role))
            console.log(chalk.gray("--------------------------------"))
            // await sleep(1000);
            await MainLoginMenu();
        }
        if(backToLogin === '2'){
            await removeToken();
            console.clear();
            console.log(chalk.gray("--------------------------------"))
            console.log(chalk.green.bold("you are logged out"))
            console.log(chalk.gray("--------------------------------"))
            // await sleep(1000);
            await MainLoginMenu();
        }
        if(backToLogin === '3'){
            console.clear();
            console.log(chalk.gray("--------------------------------"))
            console.log(chalk.green.bold("you are logged in as: " + jwt.decode(token.token).role))
            console.log(chalk.gray("--------------------------------"))
            await sleep(1000);
            
        }
    }
   
    let option;
    do{

        await mainMenu();
        option = await userOption();
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
    }while(option !== '7');
    
          
}
