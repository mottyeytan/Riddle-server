import { createPlayer, checkPlayerTimeAndUpdate, checkPlayerExists, getPlayerRecord, getLeaderboard, updateRiddlesPlayedIds, getPlayerPlayedRiddles } from '../services/players.services.js'


//POST
export const createPlayerController = async (req, res) => {
    try{
        const name = req.params.name;

        console.log(name);

        await createPlayer(name);

        res.status(201).json({ message: `Player ${name} created successfully` });
        console.log(`Player ${name} created neneje ejejjek successfully`);

    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

//PUT
export const checkPlayerTimeAndUpdateController = async (req, res) => {
    
    try{
        const {name, time} = req.body;

        const updated = await checkPlayerTimeAndUpdate(name, time);

        if(updated){
            res.status(200).json({ message: `Player ${name} record updated successfully` });
            console.log(`Player ${name} record updated successfully`, updated);
        }else{
            res.status(404).json({ message: `Player ${name} record not updated` });
            console.log(`Player ${name} record not updated`);
        }

    }catch(err){
        res.status(500).json({ error: err.message });
    }
    
}

//GET

export const checkPlayerExistsController = async (req, res) => {
    try{
        const name = req.params.name;

        if(name){
            const exists = await checkPlayerExists(name);
            res.status(200).json({ exists });
        }else{
            res.status(404).json({ message: `Player name is missing` });
            console.log(`Player name is missing`);
        }
        
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

//GET

export const getPlayerRecordController = async (req, res) => {
    try{
        const name = req.params.name;

        if(name){
            const record = await getPlayerRecord(name);
            res.status(200).json({ record });
        }else{
            res.status(404).json({ message: `Player not found` });
            console.log(`Player not found`);
        }
        
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

//GET

export const getLeaderboardController = async (req, res) => {
    try{
        const leaderboard = await getLeaderboard();
        res.status(200).json({ leaderboard });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

//PUT
export const updateRiddlesPlayedIdsController = async (req, res) => {
    try{
        const {name, riddlesPlayedIds} = req.body;
        const updated = await updateRiddlesPlayedIds(name, riddlesPlayedIds);
        res.status(200).json({ updated });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const getPlayerPlayedRiddlesController = async (req, res) => {
    try{
        const name = req.params.name;
        const played = await getPlayerPlayedRiddles(name);
        res.status(200).json({ played });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}