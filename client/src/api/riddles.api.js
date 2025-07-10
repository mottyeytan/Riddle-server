import { userOption, riddlesDetails, updateRiddleOptions, AskForRiddleID } from '../utils/userInputs.js';

const baseUrl = 'http://localhost:3000/riddles';

//POST
export async function createRiddelApi(){
   try{
       const riddles = riddlesDetails();
       console.log("riddles",riddles,typeof riddles);
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
       console.log(data)
       console.log(`the riddle ${riddles.name} has been created successfully`);
       return data;


   }catch(error){
    console.log(error);
   }
}

//GET

export async function readRiddlesAPi(){
    try{
        const response = await fetch(`${baseUrl}/getRiddle`)

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
export async function updateRiddleController(){
    const data = updateRiddleOptions();

    const id = data.id;

    try{

        const response = await fetch(`${baseUrl}/updateRiddle/${id}`, 
        {   method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
     } )

     if(!response.ok){
        throw new Error('Failed to update riddle');
     }
     console.log(`the riddle ${data.name} has been updated successfully`);


    }catch(error){
        console.log(error);
    }
}

//DELETE
export async function deleteRiddleController(){
    const id = await AskForRiddleID();

    try{
        const response = await fetch(`${baseUrl}/deleteRiddle/${id}`, {
            method: 'DELETE',
        })

        if(!response.ok){
            throw new Error('Failed to delete riddle');
        }
        console.log(`the riddle ${id} has been deleted successfully`);

    }catch(error){
        console.log(error);
    }

}



