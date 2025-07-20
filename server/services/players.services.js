import db from '../dal/index.dal.js'
import { createPlayerDal, getTimeDal, updateTimeDal, checkPlayerExistsDal , getAllRecordsDal} from '../dal/players.js'

export async function createPlayer(name) {
    const player = {
        name: name,
        record: null
    }
    try{
        const playerData = await createPlayerDal(player);
        return playerData;

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

        const cleanData = data.map(player => ({
            name: player.name,
            record: player.record,
        }));

        const sortedPlayers = cleanData.sort((a, b) => a.record - b.record);
        return sortedPlayers;
    }catch(err){
        console.log(err);
        return err;
    }
}



