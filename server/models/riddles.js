import readline from "readline-sync";
import chalk from "chalk";

class Riddle {
    constructor(id, difficulty, timeLimit, hint, name, taskDescription, correctAnswer){
        this.id = id;
        this.difficulty = difficulty;
        this.timeLimit = timeLimit;
        this.hint = hint;
        this.isPassedTime = false;
        this.name = name ;
        this.taskDescription = taskDescription;
        this.correctAnswer = correctAnswer;
    }
    ask(){
        console.log("");
        console.log(chalk.blue.bold(this.name))
        console.log(chalk.yellow.bold("------------------"))
        console.log(chalk.blue(this.taskDescription));
        console.log("")

        const hint = readline.question("do you want a hint? yes/no: ")
        if (hint === "yes"){
            console.log("");
            console.log(this.hint);
            console.log("");

            this.isPassedTime = true;
        }
        else{
            console.log("");
        }

        const start = Date.now();
        
        let userAnswer = readline.question("Enter your answer: ");
        while (userAnswer !== this.correctAnswer){
            console.log("Incorrect!");
            console.log("")
            userAnswer = readline.question("Enter your answer: ");
        }
        console.log("Correct!");
        console.log("")
        let end = Date.now();
        const time = (end - start)/1000;

        if(time > this.timeLimit){
            console.log(`Too slow! ${this.timeLimit} seconds penalty applied.`)
            this.isPassedTime = true;
        }
    }
}

export default Riddle;