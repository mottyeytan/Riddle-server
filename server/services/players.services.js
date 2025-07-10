import db from '../dal/index.dal.js'

export async function createPlayer(name) {
    let newID = 1;

    newPlayer = {
        id:newID,
        name:name,
        record: null
    }
    try{

        const players = await db.players.GetAll();
        
        if(players.trim()  !== '' && players.length > 0){
            lastID = players[players.length - 1].id;
            newID = lastID + 1;
        }
    
        newPlayer.id = newID;
    
        players.push(newPlayer);

        await db.players.Write(players);

        console.log("player created successfully");
    
    }catch(err){
        console.log(err);
        return err;
    }
    
}

export async function checkPlayerTimeAndUpdate(name, time) {
    try{

        const players = await db.players.GetAll();

        const index = players.findIndex(player => player.name === name);

        if(!players[index].record || players[index].record > time){
            players[index].record = time;

            await dal.players.Write(players);

            console.log("player record updated successfully");
            return true;

        }else{

            return false;
        }

    }catch(err){
        console.log(err);
        return err;
    }
}

export async function checkPlayerExists(name){
    try{

        const players = await db.players.GetAll();

        const found = players.some(player => player.name === name);

        return found;
        
    }catch(err){
        console.log(err);
        return err;
    }
}

export async function getPlayerRecord(name){
    try{

        const players = await db.players.GetAll();

        const player = players.find(player => player.name === name);

        return player.record;

    }catch(err){
        console.log(err);
        return err;
    }
}

