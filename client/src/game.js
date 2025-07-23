import { getRiddlesObject } from './instance/riddles.js';
import { getPlayersObject } from './instance/player.js';
import { checkPlayerExistsApi, createPlayerApi, getPlayerRecordApi, updateRiddlesPlayedIdsApi, getPlayerPlayedRiddlesApi } from './api/player.api.js';
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
        console.log("Creating new player...");
        try {
            await createPlayerApi(player.name);
            console.log(chalk.blue.bold("----------------------------"));
            console.log(chalk.green(`Welcome, ${player.name}! Its good to have you here for the first time`));
        } catch (error) {
            console.error("Failed to create player:", error);
            return;
        }
    }else{
        const recordResponse = await getPlayerRecordApi(player.name);
        const record =  recordResponse.record 
        
        console.log(chalk.blue.bold("----------------------------"));
        console.log(chalk.green(`Hi ${player.name}! Your previous record is ${record.toFixed(2)} seconds.`));
        
    }

    
    let playedRiddles = [];
    
    try {
        const response = await getPlayerPlayedRiddlesApi(player.name);
        if (response && response.played) {
            playedRiddles = response.played;
        }
    } catch (error) {
        console.log("Could not fetch played riddles:", error);
        playedRiddles = [];
    }

    console.log(`Player has already played riddles: ${playedRiddles}`);

    const filteredRiddlesplayed = riddles.filter(riddle => !playedRiddles.includes(riddle.id));

    const filteredRiddles = filteredRiddlesplayed.filter(riddle => riddle.difficulty === difficulty);

    if (filteredRiddles.length === 0) {
        console.log(chalk.yellow(`You have already played all riddles at ${difficulty} difficulty level!`));
        return;
    }

    console.log(`Found ${filteredRiddles.length} new riddles to play at ${difficulty} difficulty.`);

    for (let i = 0; i < filteredRiddles.length; i++){
        console.log(`Playing riddle ID: ${filteredRiddles[i].id}`);
        let start = Date.now();
        filteredRiddles[i].ask();
        let end = Date.now();
        const time = player.recordTime(start, end);
        player.times.push(time);
        player.riddlesPlayedIds.push(filteredRiddles[i].id);

    } 
    const riddlesPlayedIds = player.riddlesPlayedIds.map(id => Number(id));


     await new Promise(resolve => setTimeout(resolve, 500));
    try{
        await updateRiddlesPlayedIdsApi(player.name, riddlesPlayedIds);
    }catch(error){
        console.error("Failed to update riddles played ids:", error);
    }
        

    
    player.showStats(filteredRiddles);

}


