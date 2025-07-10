import db from '../dal/index.dal.js'

async function createRiddle(riddleBody){
    let newRiddle = riddleBody;
    console.log("newRiddle",newRiddle);
    let newID = 1;
    let riddles = []

    try{

        const data = await db.riddles.GetAll();

        if(data && data.length > 0){
            riddles = data;
            const lastID = data[data.length - 1].id;
            newID = lastID + 1;
        }
    }catch(err){
        console.log(err);
        
    }

    newRiddle.id = newID;
    riddles.push(newRiddle);

    try{
        await db.riddles.Write(riddles);
        console.log("riddle created successfully");
    }catch(err){
        console.log(err);
        return err;
    }
    
}


async function readRiddle(){
    try{
        const riddles = await db.riddles.GetAll();
        return riddles;
    }catch(err){
        console.log(err);
        return err;
    }
}


async function updateRiddle(id, riddleBody){
    const riddle = riddleBody;
    const riddles = await db.riddles.GetAll()

    const index = riddles.findIndex(r => r.id === parseInt(id));

    if(index !== -1){
        if (riddle.length > 2){
        riddles[index] = riddle;
        await db.riddles.Write(riddles);
        console.log("riddle updated successfully");
        
    }else if(riddle.name !== undefined){
        riddles[index].name = riddle.name;
        await db.riddles.Write(riddles);
        console.log("riddle updated successfully");

    }else if(riddle.description !== undefined){
        riddles[index].description = riddle.description;
        await db.riddles.Write(riddles);
        console.log("riddle updated successfully");

    }else if(riddle.correctAnswer !== undefined){
        riddles[index].correctAnswer = riddle.correctAnswer;
        await db.riddles.Write(riddles);
        console.log("riddle updated successfully");

    }else if(riddle.difficulty !== undefined){
        riddles[index].difficulty = riddle.difficulty;
        await db.riddles.Write(riddles);
        console.log("riddle updated successfully");

    }else if(riddle.timeLimit !== undefined){
        riddles[index].timeLimit = riddle.timeLimit;
        await db.riddles.Write(riddles);
        console.log("riddle updated successfully");

    }else if(riddle.hint !== undefined){
        riddles[index].hint = riddle.hint;
        await db.riddles.Write(riddles);
        console.log("riddle updated successfully");

    }
    }else{
    console.log("riddle not found");
    return 
    }
}

async function deleteRiddle(riddleID){
    
try{
    const riddles = await db.riddles.GetAll()

    const index = riddles.findIndex(r => r.id === parseInt(riddleID));

    if(index !== -1){
        riddles.splice(index, 1);
        await db.riddles.Write(riddles);
        console.log("riddle deleted successfully");
    }else{
        console.log("riddle not found");
        return 
    }

}catch(err){
    console.log(err);
    return err;
}
}

export { createRiddle, readRiddle, updateRiddle, deleteRiddle }


