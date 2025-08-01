import supabase from '../lib/supabaseClient.js';

export async function getPlayersDal() {
    try{

        const {data, error} = await supabase.from('Players').select('*');
        if (error) {
            throw error;
        }
        return data;
    }catch(err){
        console.log(err.message)
    }
}

export async function getPlayerByNameDal(name){
    try{
        const {data, error} = await supabase.from('Players').select('*').eq('name', name);
        if(!data || data.length === 0){
            return false;
        }
        return data[0];
    }catch(err){
        console.log(err.message)
    }
}

export async function createPlayerDal(player) {
    
    try{
        const {data, error} = await supabase.from('Players').insert(player);
        if (error) {
            throw error;
        }
        return true

    }catch(err){
        console.log(err.message)
    }
}

export async function getTimeDal(name){
    try{
        const {data, error} = await supabase.from('Players').select('record').eq('name', name);
        if (error) {
            throw error;
        }
        return data[0].record;
    }catch(err){
        console.log(err.message)
    }
}

export async function updateTimeDal(name, time){
    try{
        const {data, error} = await supabase.from('Players').update({record: time}).eq('name', name);
        if (error) {
            throw error;
        }
        return data;
    }catch(err){
        console.log(err.message)
    }
}

export async function getPlayerByIdDal(id){
    try{
        const {data, error} = await supabase.from('Players').select('*').eq('id', id);
        if (error) {
            throw error;
        }
        return data;
    }catch(err){
        console.log(err.message)
    }
}

export async function updatePlayerRecordDal(id, record){
    try{
        const {data, error} = await supabase.from('Players').update(record).eq('id', id);
        if (error) {
            throw error;
        }
        return data;
    }catch(err){
        console.log(err.message)
    }
}

export async function getAllRecordsDal(){
    try{
        const {data, error} = await supabase.from('Players').select('record, name');
        if (error) {
            throw error;
        }
        return data;
    }catch(err){
        console.log(err.message)
    }
}

export async function checkPlayerExistsDal(name){
    try{
        const {data, error} = await supabase.from('Players').select('name').eq('name', name);
        if (error) {
            throw error;
        }
        return data.length > 0;
    }catch(err){
        console.log(err.message)
    }
}

export async function getRiddlesPlayedIdsDal(name){
    try{
        const {data, error} = await supabase.from('Players').select('played').eq('name', name);
        if (error) {
            throw error;
        }
        
        return data[0]?.played || [];
    }catch(err){
        console.log(err.message)
        return [];
    }
}

export async function updateRiddlesPlayedIdsDal(name, riddlesPlayedIds){
    try{
        const {data, error} = await supabase.from('Players').update({played : `{${riddlesPlayedIds.join(',')}}`}).eq('name', name);
        if (error) {
            throw error;
        }
        return data;
    }catch(err){
        console.log(err.message)
    }
}

export async function getPlayerPlayedRiddlesDal(name){
    try{
        const {data, error} = await supabase.from('Players').select('played').eq('name', name);
        if (error) {
            throw error;
        }
        return data[0].played;
    }catch(err){
        console.log(err.message)
    }
}









