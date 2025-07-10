import chalk from 'chalk';

import readline from 'readline-sync';


export function userOption(){
    const option = chalk.gray(readline.question("Enter your option: "));
    return option;
}

export function riddlesDetails(){
    const difficulty = (readline.question("Enter the difficulty (easy/medium/hard): "));
    const timeLimit = (readline.question("Enter the time limit: "));
    const riddleName = (readline.question("Enter the riddle name: "));
    const riddleDescription = (readline.question("Enter the description: "));
    const hint = (readline.question("Enter the hint: "));
    const correctAnswer = (readline.question("Enter the correct answer: "));

    return {
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
    const id = readline.question("Enter the id of the riddle you want to update: ");

    const question = readline.question("which field you want to update?\n1: all\n2: name\n3: description\n4: correctAnswer\n5: difficulty\n6: timeLimit\n7: hint\n");
    
    let newRiddle = {}
    let fullRiddle = {}
    let riddleName, riddleDescription, correctAnswer, difficulty, timeLimit, hint;
    
    switch(question){
        case "1":
            riddleName = readline.question("Enter the new riddle name: ");
            riddleDescription = readline.question("Enter the new riddle description: ");
            correctAnswer = readline.question("Enter the new correct answer: ");
            difficulty = readline.question("Enter the new difficulty: ");
            timeLimit = readline.question("Enter the new time limit: ");
            hint = readline.question("Enter the new hint: ");

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
            break;
        case "2":
            riddleName = readline.question("Enter the new riddle name: ");
            newRiddle = {
                id: id,
                name: riddleName,
            }
            return newRiddle;
            break;
        case "3":
            riddleDescription = readline.question("Enter the new riddle description: ");
            newRiddle = {
                id: id,
                description: riddleDescription,
            }
            return newRiddle;
            break;
        case "4":
            correctAnswer = readline.question("Enter the new correct answer: ");
            newRiddle = {
                id: id,
                correctAnswer: correctAnswer,
            }
            return newRiddle;
            break;
        case "5":
            difficulty = readline.question("Enter the new difficulty: ");
            newRiddle = {
                id: id,
                difficulty: difficulty,
            }   
            return newRiddle;
            break;
        case "6":
            timeLimit = readline.question("Enter the new time limit: ");
            newRiddle = {
                id: id,
                timeLimit: timeLimit,
            }
            return newRiddle;
            break;
        case "7":
            hint = readline.question("Enter the new hint: ");
            newRiddle = {
                id: id,
                hint: hint,
            }
            return newRiddle;
            break;
        default:
            console.log("Invalid option");
            break;
    }
}


export function AskForRiddleID(){
    const id = readline.question("Enter the id of the riddle you want to delete: ");
    return id;
}
