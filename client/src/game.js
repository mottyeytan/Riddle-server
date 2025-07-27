import { getRiddlesObject } from './instance/riddles.js';
import { getPlayersObject } from './instance/player.js';
import { checkPlayerExistsApi, createPlayerApi, getPlayerRecordApi, updateRiddlesPlayedIdsApi, getPlayerPlayedRiddlesApi } from './api/player.api.js';
import { getToken } from './utils/tokenManager.js';
import jwt from 'jsonwebtoken';
import readline from 'readline';
import chalk from 'chalk';
import { playerExists } from './utils/playerExists.js';


export async function startGame(difficulty){
    const riddles = await getRiddlesObject();
    const player = await getPlayersObject();

    const token = await getToken();
    const name = jwt.decode(token.token).name;
    
    player.name = name;

    if(jwt.decode(token.token).role === 'guest'){
        const PlayerExists = await playerExists();
        if(!PlayerExists){
            console.log(chalk.gray.bold("________________________________________________________"));
            console.log("")
            console.log(chalk.green.bold(`hi ${player.name}, its good to have you here for the first time`))
            console.log("")
        }else{
            const recordResponse = await getPlayerRecordApi(player.name);
            
            if (recordResponse && recordResponse.record !== null) {
                const record = recordResponse.record;
                console.log(chalk.gray.bold("________________________________________________________"));
                console.log("")
                console.log(chalk.green(`Hi ${player.name}! Your previous record is ${record.toFixed(2)} seconds.`));
                console.log("")
            }

        }
    }else{
        const recordResponse = await getPlayerRecordApi(player.name);
            
            if (recordResponse && recordResponse.record !== null) {
                const record = recordResponse.record;
                console.log(chalk.gray.bold("________________________________________________________"));
                console.log("")
                console.log(chalk.green(`Hi ${player.name}! Your previous record is ${record.toFixed(2)} seconds.`));
                console.log("")
            }

    }
    
    let playedRiddles = [];
    
    try {
        const response = await getPlayerPlayedRiddlesApi(player.name);
        if (response && response.played) {
            playedRiddles = response.played;
            console.log(`${player.name}, you have played riddles: ${playedRiddles}`);
        }
    } catch (error) {
        console.log("Could not fetch played riddles:", error);
        playedRiddles = [];
    }


    const filteredRiddlesplayed = riddles.filter(riddle => !playedRiddles.includes(riddle.id));

    const filteredRiddles = filteredRiddlesplayed.filter(riddle => riddle.difficulty === difficulty);

    if (filteredRiddles.length === 0) {
        console.log(chalk.yellow(`You have already played all riddles at ${difficulty} difficulty level!`));
        return;
    }

    console.log(chalk.blue(`found ${filteredRiddles.length} new riddles to play at ${difficulty} difficulty.`));
console.log(chalk.gray.bold("________________________________________________________"));
console.log("")

    for (let i = 0; i < filteredRiddles.length; i++){
        console.log(chalk.green(`Playing riddle ID: ${filteredRiddles[i].id}`));
        let start = Date.now();
        filteredRiddles[i].ask();
        let end = Date.now();
        const time = player.recordTime(start, end);
        player.times.push(time);
        player.riddlesPlayedIds.push(filteredRiddles[i].id);

    } 
    const riddlesPlayedIds = player.riddlesPlayedIds.map(id => Number(id));

     await new Promise(resolve => setTimeout(resolve, 100));
    try{
        await updateRiddlesPlayedIdsApi(player.name, riddlesPlayedIds);
    }catch(error){
        console.error("Failed to update riddles played ids:", error);
    }
    console.log(chalk.gray("--------------------------------"))
    player.showStats(filteredRiddles);
    console.log(chalk.gray("--------------------------------"))
    
}


