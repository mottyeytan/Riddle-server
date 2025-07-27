import { saveToken, getToken } from '../utils/tokenManager.js';
import { playerExists } from '../utils/playerExists.js';
import chalk from 'chalk';

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
            const userRole = data.role;
            console.log(chalk.gray("--------------------------------"))
            console.log(chalk.green.bold(`you are signed in as: ${userRole}`));
            console.log(chalk.gray("--------------------------------"))
             const PlayerExists = data.playerExists;
             await playerExists(PlayerExists);
        }else{
            return data;
        }

        return data;


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

            const role = data.role;
            console.log(chalk.gray("--------------------------------"))
            console.log(chalk.green.bold(`you are logged in as: ${role}`))
            console.log(chalk.gray("--------------------------------"))
        }else{
            return data;
        }

        return data;

    }catch(err){
        console.log(err)
    }
}




