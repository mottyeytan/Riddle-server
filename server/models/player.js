import { checkPlayerTimeAndUpdate } from "../services/players.services.js";
import chalk from "chalk";

class Player{
    constructor(){
        this.name = "";
        this.times = [];
    }

    recordTime(strat, end){
        return (end - strat) / 1000
    }
    
    async showStats(riddles){
        let totalTime = 0;
        let averageTime = 0;
        for(let i = 0; i < this.times.length; i++){
            totalTime += this.times[i];
        }
        
        averageTime = totalTime / this.times.length;
        
        console.log("")
        console.log(chalk.green(`great job ${this.name}!`))
        console.log(chalk.yellow.bold("----------------------------"))
        console.log("")
        console.log(chalk.blue(`Total time: ${totalTime} seconds`));
        console.log(chalk.blue(`Average per riddle:: ${averageTime} seconds`));
        console.log("")

        if(await checkPlayerTimeAndUpdate(this.name, totalTime)){
            console.log(chalk.yellow.bold("----------------------------"))
            console.log(chalk.bgGreenBright.white(`New record for ${this.name}: ${totalTime} seconds`));
        }
        
        // Check for time penalties
        const penaltyTime = riddles.find(r => r.timeLimit)
        if (riddles.some(r => r.isPassedTime)) {
            console.log("");
            console.log(`Time limit penalty applied. it took you more than ${penaltyTime.timeLimit} seconds. or you have used the hint`);
        }
    }
}

export default Player;