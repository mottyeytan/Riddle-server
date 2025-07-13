import chalk from 'chalk';
import { readRiddlesAPi } from '../api/riddles.api.js';

export async function nicePrintRiddles(){
    const riddlesResponse = await readRiddlesAPi();
    if (riddlesResponse && riddlesResponse.riddle && riddlesResponse.riddle.length > 0) {
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