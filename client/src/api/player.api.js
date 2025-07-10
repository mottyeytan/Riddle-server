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

createPlayerApi();