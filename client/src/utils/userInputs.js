import chalk from 'chalk';

import rl from 'readline';
import readline from 'readline-sync';


export async function userOption(ask = "enter your option: "){
    const rl1 = rl.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      const option = await new Promise(res => {
        rl1.question(ask, res);
      });
      rl1.close();
    return option;
}

export async function riddlesDetails(){
    
    console.log("");
    console.clear()
    console.log(chalk.greenBright.bold("--- Create a Riddle ---"));
    console.log(chalk.blue.bold("----------------------------------------------------------"));
    const difficulty = await userOption(chalk.yellow("Enter the difficulty (easy/medium/hard): "));
    const timeLimit = await userOption(chalk.yellow("Enter the time limit: "));
    const riddleName = await userOption(chalk.yellow("Enter the riddle name: "));
    const riddleDescription = await userOption(chalk.yellow("Enter the description: "));
    const hint = await userOption(chalk.yellow("Enter the hint: "));
    const correctAnswer = await userOption(chalk.yellow("Enter the correct answer: "));

    return await {
        id: null,
        name: riddleName,
        description: riddleDescription,
        correctAnswer: correctAnswer,
        difficulty: difficulty,
        timeLimit: parseInt(timeLimit),
        hint: hint
    };

}

export function updateRiddleOptions(){
    console.clear();
    console.log(chalk.blue.bold("\n--- Update a Riddle ---"));
    const id = readline.question(chalk.yellow("Enter the ID of the riddle to update: "));

    const question = readline.question(chalk.cyan("Which field do you want to update?\n  1: All\n  2: Name\n  3: Description\n  4: Correct Answer\n  5: Difficulty\n  6: Time Limit\n  7: Hint\nYour choice: "));
    
    let newRiddle = {}
    let fullRiddle = {}
    let riddleName, riddleDescription, correctAnswer, difficulty, timeLimit, hint;
    
    switch(question){
        case "1":
            riddleName = readline.question(chalk.green("Enter the new riddle name: "));
            riddleDescription = readline.question(chalk.green("Enter the new riddle description: "));
            correctAnswer = readline.question(chalk.green("Enter the new correct answer: "));
            difficulty = readline.question(chalk.green("Enter the new difficulty: "));
            timeLimit = readline.question(chalk.green("Enter the new time limit: "));
            hint = readline.question(chalk.green("Enter the new hint: "));

            fullRiddle = {
                id: id,
                name: riddleName,
                description: riddleDescription,
                correctAnswer: correctAnswer,
                difficulty: difficulty,
                timeLimit: timeLimit,
                hint: hint
            }
            return fullRiddle;
        case "2":
            riddleName = readline.question(chalk.green("Enter the new riddle name: "));
            newRiddle = { id: id, name: riddleName }
            return newRiddle;
        case "3":
            riddleDescription = readline.question(chalk.green("Enter the new riddle description: "));
            newRiddle = { id: id, description: riddleDescription }
            return newRiddle;
        case "4":
            correctAnswer = readline.question(chalk.green("Enter the new correct answer: "));
            newRiddle = { id: id, correctAnswer: correctAnswer }
            return newRiddle;
        case "5":
            difficulty = readline.question(chalk.green("Enter the new difficulty: "));
            newRiddle = { id: id, difficulty: difficulty }
            return newRiddle;
        case "6":
            timeLimit = readline.question(chalk.green("Enter the new time limit: "));
            newRiddle = { id: id, timeLimit: timeLimit }
            return newRiddle;
        case "7":
            hint = readline.question(chalk.green("Enter the new hint: "));
            newRiddle = { id: id, hint: hint }
            return newRiddle;
        default:
            console.log(chalk.red("Invalid option"));
            break;
    }
}


export function AskForRiddleID(){
    const id = readline.question(chalk.yellow("Enter the id of the riddle you want to delete: "));
    return id;
}

export function playerDetails(){
    const name = readline.question("Enter your name: ");
    return name;
}

export async function difficultyChoice(){
    const choice = await userOption("your difficulty level: ");
    
    let difficulty;
   
    if(choice === '1' || choice === 'easy'){
        difficulty = 'easy';
    }else if(choice === '2' || choice === 'medium'){
        difficulty = 'medium';
    }else if(choice === '3' || choice === 'hard'){
        difficulty = 'hard';
    }else{
        difficulty = 'easy';
    }
    return difficulty;
}
