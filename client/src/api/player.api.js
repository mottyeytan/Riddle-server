import { playerDetails } from '../utils/userInputs.js';

const baseUrl = 'http://localhost:3000/player';

//POST
export async function createPlayerApi(name){
    try{
        const response = await fetch(`${baseUrl}/createPlayer/${name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if(!response.ok){
            throw new Error('Failed to create player');
        }

        const result = await response.json();
        console.log("Player created successfully:", result);
        return result;

    }catch(error){
        console.log("Error creating player:", error);
        throw error;
    }
}

//PUT
export async function checkPlayerTimeAndUpdateApi(name, time){
    const body = {name, time};

    try{
        const response = await fetch(`${baseUrl}/checkPlayerTimeAndUpdate`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if(!response.ok){
            return false;
        }

        console.log(`the player ${name} time updated successfully`);

    }catch(error){
        console.log(error);
    }
}

//GET
export async function checkPlayerExistsApi(name){
    try{
        const response = await fetch(`${baseUrl}/checkPlayerExists/${name}`);

        if(!response.ok){
            return response.json();
        }

        return response.json();

    }catch(error){
        console.log(error);
        return false;
    }
}


export async function getPlayerRecordApi(name){
    try{
        const response = await fetch(`${baseUrl}/getPlayerRecord/${name}`);

        if(!response.ok){
            return false;
        }

        return await response.json();

    }catch(error){
        console.log(error);
        return false;
    }
}

export async function getLeaderboardApi(){
    try{
        const response = await fetch(`${baseUrl}/getLeaderboard`);
        return await response.json();
    }catch(error){
        console.log(error);
        return false;
    }
}

export async function updateRiddlesPlayedIdsApi(name, riddlesPlayedIds){
    const body = {name, riddlesPlayedIds};

    try{
        const response = await fetch(`${baseUrl}/updateRiddlesPlayedIds`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if(!response.ok){
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();

    }catch(error){
        console.log("updateRiddlesPlayedIdsApi error:", error);
    }
}

export async function getPlayerPlayedRiddlesApi(name){
    try{
        const response = await fetch(`${baseUrl}/getPlayerPlayedRiddles/${name}`);
        return await response.json();
    }catch(error){
        console.log(error);
        return false;
    }
}

await updateRiddlesPlayedIdsApi("motty", [1,2,3,4])

