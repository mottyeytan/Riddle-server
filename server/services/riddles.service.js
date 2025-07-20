import { CreateRiddleDal, getLastIdDal, getAllRiddlesDal, updateRiddleDal, deleteRiddleDal } from '../dal/riddles.js'

async function createRiddle(riddleBody){
    let newRiddle = riddleBody;
    
    const lastId = await getLastIdDal();
    
    newRiddle.id = lastId + 1;

    try{
        await CreateRiddleDal(newRiddle);
    }catch(err){
        console.log(err);
        
    }

    
    return newRiddle;
    
}


async function readRiddle(){
    try{
        const riddles = await getAllRiddlesDal();
        return riddles;

    }catch(err){
        console.log(err);
        return err;
    }
}


async function updateRiddle(id, riddleBody){
    try{
        const name = await updateRiddleDal(id, riddleBody);
        return name;
    }catch(err){
        console.log(err);
        return err;
    }
    
}

async function deleteRiddle(riddleID){
    
try{
    await deleteRiddleDal(riddleID);

}catch(err){
    console.log(err);
   
}
}

export { createRiddle, readRiddle, updateRiddle, deleteRiddle }



