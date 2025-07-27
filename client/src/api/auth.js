import { saveToken, getToken } from '../utils/tokenManager.js';
import { playerExists } from '../utils/playerExists.js';

const baseUrl = 'http://localhost:3000/auth'

export async function signUpApi(name, password, role = 'user'){
    try{

        const response = await fetch(`${baseUrl}/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password, role })
        });
        const data = await response.json();


        if(data.token){
            
            await saveToken(data.token);
        }else{
            console.log('signup failed:', data);
        }


       const userRole = data.role;
       console.log(`your signed up as: ${userRole}`);
        const PlayerExists = data.playerExists;
        await playerExists(PlayerExists);



    }catch(err){
        console.log(err)
    }
}

export async function loginApi(name, password){
    try{
        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password })
        });
        const data = await response.json();

        if(data.token){
            
            await saveToken(data.token);
        }else{
            console.log('login failed:', data);
        }

        const role = data.role;
        console.log(`your logged in as: ${role}`);
        return data;

    }catch(err){
        console.log(err)
    }
}




