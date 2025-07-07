import checkPlayerTimeAndUpdate from "../services/CheckPlayerTimeAndUpdate.js";

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
        console.log(`great job ${this.name}!`)
        console.log(`Total time: ${totalTime} seconds`);
        console.log(`Average per riddle:: ${averageTime} seconds`);

        if(await checkPlayerTimeAndUpdate(this.name, totalTime)){
            console.log(`New record for ${this.name}: ${totalTime} seconds`);
        }
        
        // Check for time penalties
        const penaltyTime = riddles.find(r => r.timeLimit)
        if (riddles.some(r => r.isPassedTime)) {
            console.log("");
            console.log(`Time limit penalty applied. it took you more than ${penaltyTime.timeLimit} seconds. or you have used the hint`);
        }
    }
}