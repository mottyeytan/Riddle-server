import dal from '../dal/index.dal.js'
import { updateRiddleOptions } from '../../client/userInput.js'
import { riddlesDetails } from '../../client/userInput.js'

async function createRiddle(){
    const newRiddle = riddleDetails();
    let newID = 1;
    let riddles = []

    try{

        const riddles = await dal.riddles.GetAll();

        if(riddles.trim()  !== '' && riddles.length > 0){
            lastID = riddles[riddles.length - 1].id;
            newID = lastID + 1;
        }
    }catch(err){
        console.log(err);
        return err;
    }

    newRiddle.id = newID;
    riddles.push(newRiddle);

    try{
        await dal.riddles.Write(riddles);
        console.log("riddle created successfully");
    }catch(err){
        console.log(err);
        return err;
    }
    
}


async function readRiddle(){
    try{
        const riddles = await dal.riddles.GetAll();
        return riddles;
    }catch(err){
        console.log(err);
        return err;
    }
}


async function updateRiddle(id){
    const riddle = updateRiddleOptions(id);
    const riddles = await dal.riddles.GetAll()

    const index = riddles.findIndex(r => parseInt(r.id) === parseInt(id));

    if(index !== -1){
        if (riddle.length > 2){
        riddles[index] = riddle;
        await dal.riddles.Write(riddles);
        console.log("riddle updated successfully");
        
    }else if(riddle.name !== undefined){
        riddles[index].name = riddle.name;
        await dal.riddles.Write(riddles);
        console.log("riddle updated successfully");

    }else if(riddle.description !== undefined){
        riddles[index].description = riddle.description;
        await dal.riddles.Write(riddles);
        console.log("riddle updated successfully");

    }else if(riddle.correctAnswer !== undefined){
        riddles[index].correctAnswer = riddle.correctAnswer;
        await dal.riddles.Write(riddles);
        console.log("riddle updated successfully");

    }else if(riddle.difficulty !== undefined){
        riddles[index].difficulty = riddle.difficulty;
        await dal.riddles.Write(riddles);
        console.log("riddle updated successfully");

    }else if(riddle.timeLimit !== undefined){
        riddles[index].timeLimit = riddle.timeLimit;
        await dal.riddles.Write(riddles);
        console.log("riddle updated successfully");

    }else if(riddle.hint !== undefined){
        riddles[index].hint = riddle.hint;
        await dal.riddles.Write(riddles);
        console.log("riddle updated successfully");

    }
    }else{
    console.log("riddle not found");
    return 
    }
}

async function deleteRiddle(){
    const riddleID = AskForRiddleID();
try{
    const riddles = await dal.riddles.GetAll()

    const index = riddles.findIndex(r => r.id === parseInt(riddleID));

    if(index !== -1){
        riddles.splice(index, 1);
        await dal.riddles.Write(riddles);
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