import dal from '../dal/index.dal.js'
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