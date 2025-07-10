import {  readRiddle, createRiddle, updateRiddle, deleteRiddle } from '../services/riddles.service.js'

//GET

export const getRiddleController = async (req, res) => {
    try{
        const riddle = await readRiddle();
        res.status(200).json({ riddle });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

//POST
export const createRiddleController = async (req, res) => {
    try{
        const riddles = req.body;

        await createRiddle(riddles);

        res.status(201).json({ message: `Riddle created successfully` });

    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

//PUT

export const updateRiddleController = async (req, res) => {
    try{
        const id = req.params.id;
        const riddleBody = req.body;
        
        if(riddleBody && id){
            await updateRiddle(id, riddleBody);
            res.status(200).json({ message: `Riddle updated successfully` });
            console.log(`Riddle updated successfully`);
        }else{
            res.status(404).json({ message: `Riddle not found or id is missing` });
            console.log(`Riddle not found or id is missing`);
            return;
        }


    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const deleteRiddleController = async (req, res) => {
    try{
        const riddleID  = req.params.id;

        if(riddleID){
            await deleteRiddle(riddleID);
        }else{
            res.status(404).json({ message: `Riddle not found` });
            console.log(`Riddle not found`);
        }

        res.status(200).json({ message: `Riddle deleted successfully` });
        console.log(`Riddle deleted successfully`);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}