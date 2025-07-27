import { createPlayerDal, getTimeDal, updateTimeDal, checkPlayerExistsDal , getAllRecordsDal, getRiddlesPlayedIdsDal, updateRiddlesPlayedIdsDal, getPlayerPlayedRiddlesDal} from '../dal/players.js'

export async function createPlayer(name, hashedPassword, role = 'user') {
    const player = {
        name: name,
        record: null,
        played: null,
        password: hashedPassword,
        role: role
    }
    try{
        const playerData = await createPlayerDal(player);
        if(playerData){
            return player;
        }else{
            return false;
        }

    }catch(err){
        console.log(err);
        return err;
    }
}

export async function checkPlayerTimeAndUpdate(name, time) {
    try{
        const timeData = await getTimeDal(name);

        if(timeData === null || timeData > time){
            await updateTimeDal(name, time);

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
        const exists = await checkPlayerExistsDal(name);
        return exists;
        
    }catch(err){
        console.log(err);
        return err;
    }
}

export async function getPlayerRecord(name){
    try{

        const record = await getTimeDal(name);
        return record;

    }catch(err){
        console.log(err);
        return err;
    }
}

export async function getLeaderboard(){
    try{
        const data = await getAllRecordsDal();

        const sortedPlayers = data.sort((a, b) => a.record - b.record);
        return sortedPlayers;
    }catch(err){
        console.log(err);
        return err;
    }
}

export async function updateRiddlesPlayedIds(name, riddlesPlayedIds){
    try{
        const existingPlayed = await getRiddlesPlayedIdsDal(name);
        
        const newPlayed = Array.from(new Set([...existingPlayed, ...riddlesPlayedIds]));

        const updated = await updateRiddlesPlayedIdsDal(name, newPlayed);
        return updated;

    }catch(err){
        console.log(err);
        return err;
    }

}

export async function getPlayerPlayedRiddles(name){
    try{
        const played = await getPlayerPlayedRiddlesDal(name);
        
        if(played === null || played === undefined || played === '' || played.length === 0){
            return false;
        }else{
            return played;
        }
    }catch(err){
        console.log(err);
        return false;
    }
}




// await updateRiddlesPlayedIds("motty", [9,12,13,15,18,12]);



