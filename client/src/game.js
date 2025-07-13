import { getRiddlesObject } from './instance/riddles.js';
import { getPlayersObject } from './instance/player.js';
import { checkPlayerExistsApi, createPlayerApi, getPlayerRecordApi } from './api/player.api.js';
import readline from 'readline';
import chalk from 'chalk';


export async function startGame(difficulty){
    const riddles = await getRiddlesObject();
    const player = await getPlayersObject();

    console.log(`${chalk.green.bold("welcome to the riddle game")}`);
    console.log(`${chalk.blue.bold("----------------------------")}`);
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    const name = await new Promise(res => {
      rl.question("what's your name? ", res);
    });
    rl.close();

    player.name = name;

    const playerExists = await checkPlayerExistsApi(player.name);

    if(!playerExists.exists){
        await createPlayerApi(player.name)
        console.log(chalk.blue.bold("----------------------------"));
        console.log(chalk.green(`Welcome, ${player.name}! Its glad to have you here for the first time`));
    }else{
        const recordResponse = await getPlayerRecordApi(player.name);
        const record =  recordResponse.record 
        
        console.log(chalk.blue.bold("----------------------------"));
        console.log(chalk.green(`Hi ${player.name}! Your previous record is ${record} seconds.`));
        
    }

    const filteredRiddles = riddles.filter(riddle => riddle.difficulty === difficulty);

    for (let i = 0; i < filteredRiddles.length; i++){
        let start = Date.now();
        filteredRiddles[i].ask();
        let end = Date.now();
        const time = player.recordTime(start, end);
        player.times.push(time);
    } 

    
    player.showStats(filteredRiddles);

}


