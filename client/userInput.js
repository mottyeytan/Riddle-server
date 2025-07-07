export function riddlesDetails(){
    const difficulty = readline.question("Enter the difficulty(easy/medium/hard): ");
    const timeLimit = readline.question("Enter the time limit: ");
    const riddleName = readline.question("Enter the riddle name: ");
    const riddleDescription = readline.question("Enter the description: ");
    const hint = readline.question("Enter the hint: ");
    const correctAnswer = readline.question("Enter the correct answer: ");

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

function riddleMenu(){
    console.log("1. add riddle")
}
