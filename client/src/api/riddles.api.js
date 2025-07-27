import { userOption, riddlesDetails, updateRiddleOptions, AskForRiddleID } from '../utils/userInputs.js';
import { getToken } from '../utils/tokenManager.js';
import chalk from 'chalk';
import jwt from 'jsonwebtoken';

const baseUrl = 'http://localhost:3000/riddles';

//POST
export async function createRiddlesApi(){
    const tokenData = await getToken();
    const token = tokenData?.token;
    const role = tokenData?.role;
    if (!token) {
        throw new Error("No token available. Please login first.");
    }

    if(role !== 'admin' && role !== 'user'){
        console.log(chalk.red("You are not authorized to create riddles"));
        return;
    }

   try{
       const riddles = await riddlesDetails();
       
       const response = await fetch(`${baseUrl}/createRiddle`, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(riddles)
       });
       if(!response.ok){
        throw new Error('Failed to create riddle');
       }
       const data = await response.json();

       console.log("");
       console.log(chalk.blue.bold("----------------------------------------------------"));
       console.log(chalk.green(`the riddle ${riddles.name} has been created successfully`));
       console.log(chalk.blue.bold("----------------------------------------------------"));
       return data;


   }catch(error){
    console.log(error);
   }
}

//GET

export async function readRiddlesAPi(auth = false){
        
        const tokenData = await getToken();
        const token = tokenData?.token;
        const role = tokenData?.role;
        
        if (!token) {
            throw new Error("No token available. Please login first.");
        }
        
        if(!auth){
        if(role !== 'admin' && role !== 'user'){
            console.log(chalk.red("You are not authorized to read riddles"));
            return;
        }
        }else{
            if(role !== 'guest' && role !== 'user' && role !== 'admin'){
                console.log(chalk.red("You are not authorized to read riddles"));
                return;
            }
        }

    try{
        const response = await fetch(`${baseUrl}/getRiddle`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if(!response.ok){
            throw new Error("Faild to Read riddels")
        }

        const data = await response.json();
        return data;

    }catch(error){
        console.log(error);
    }
}

//PUT
export async function updateRiddlesApi(){
    const tokenData = await getToken();
    const token = tokenData?.token;
    const role = tokenData?.role;

    if (!token) {
        throw new Error("No token available. Please login first.");
    }

    if(role !== 'admin'){
        console.log(chalk.red("You are not authorized to update riddles"));
        return;
    }

    const data = await updateRiddleOptions();

    if (!data) {
        console.log("Update cancelled - no data received");
        return;
    }

    const id = data.id;

    delete data.id;

    try{

        const response = await fetch(`${baseUrl}/updateRiddle/${id}`, 
        {   method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
     } )

     if(!response.ok){
        throw new Error(`Failed to update riddle ${await response.text()}`);
     }
     const data1 = await response.json();
     console.log("");
     console.log(chalk.blue.bold("----------------------------------------------------"));
     console.log(chalk.green(`the riddle ${data1.name} has been updated successfully`)); 
     console.log(chalk.blue.bold("----------------------------------------------------"));


    }catch(error){
        console.log(error);
    }
}

//DELETE
export async function deleteRiddlesApi(){
    const tokenData = await getToken();
    const token = tokenData?.token;
    const role = tokenData?.role;

    if (!token) {
        throw new Error("No token available. Please login first.");
    }

    if(role !== 'admin'){
        console.log(chalk.red("You are not authorized to delete riddles"));
        return;
    }

    if (!token) {
        throw new Error("No token available. Please login first.");
    }

    const id = await AskForRiddleID();

    try{
        const response = await fetch(`${baseUrl}/deleteRiddle/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if(!response.ok){
            throw new Error(`Failed to delete riddle ${await response.text()}`);
        }
        console.log("");
        console.log(chalk.blue.bold("----------------------------------------------------"));
        console.log(chalk.green(`the riddle ${id} has been deleted successfully`));
        console.log(chalk.blue.bold("----------------------------------------------------"));

    }catch(error){
        console.log(error);
    }

}
