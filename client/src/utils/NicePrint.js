import chalk from 'chalk';
import { readRiddlesAPi } from '../api/riddles.api.js';
import { getLeaderboardApi } from '../api/player.api.js';

export async function nicePrintRiddles(){
    const riddlesResponse = await readRiddlesAPi();
    if (riddlesResponse && riddlesResponse.riddle && riddlesResponse.riddle.length > 0) {
        console.clear();
        console.log(chalk.blue.bold("\n--- All Riddles ---"));
        riddlesResponse.riddle.forEach(riddle => {
            console.log(chalk.yellow("----------------------------------------"));
            console.log(`${chalk.bold('ID:')}          ${riddle.id}`);
            console.log(`${chalk.bold('Name:')}        ${riddle.name}`);
            console.log(`${chalk.bold('Difficulty:')}  ${riddle.difficulty}`);
            console.log(`${chalk.bold('Description:')} ${riddle.description}`);
            console.log(`${chalk.bold('Hint:')}        ${riddle.hint}`);
            console.log(`${chalk.bold('Answer:')}      ${riddle.correctAnswer}`);
        });
        console.log(chalk.yellow("----------------------------------------"));
        console.log(chalk.blue.bold("--- End of List ---\n"));
    } else {
        console.log(chalk.red("No riddles found."));
    }
}


export async function printLeaderboard(){
    const response = await getLeaderboardApi();
    const leaderboard = response.leaderboard; 

    if(leaderboard && leaderboard.length > 0){
        console.clear();
        console.log(chalk.blue.bold("\n--- Leaderboard ---"));
        leaderboard.forEach((player, index) => {
            const rank = `${index + 1}.`.padEnd(4);
            const name = (player.name || "Unknown").padEnd(20);
            const score = player.record ? `${player.record.toFixed(3)}s` : "N/A";
            console.log(chalk.yellow("----------------------------------------"));
            console.log(`${chalk.bold(rank)} ${chalk.cyan(name)} ${chalk.green(score)}`);
        });
        console.log(chalk.yellow("----------------------------------------"));
    } else {
        console.log(chalk.red("Leaderboard is empty."));
    }
}


