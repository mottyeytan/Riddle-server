import { playerDetails } from '../utils/userInputs.js';

const baseUrl = 'http://localhost:3000/player';

//POST
export async function createPlayerApi(){
    const name = playerDetails();

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
        console.log(`the player ${name} has been created successfully`);

    }catch(error){
        console.log(error);
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

        console.log(`the player ${name} exists`);
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

checkPlayerExistsApi("yakov").then(a => console.log(a.exists));