import {mongoDbClient} from "../lib/mongoDbClient.js";

const db = mongoDbClient.db("Riddles-game");
const riddlesCollection = db.collection("Riddles");

export async function CreateRiddleDal(riddle){
    try{
        const result = await riddlesCollection.insertOne(riddle);
        
        if(result.acknowledged){
            console.log("Riddle created successfully");
        }else{
            console.log("Failed to create riddle");
        }
    }catch(err){
        console.log("hi", err.message)
    }
}

export async function getLastIdDal(){
    try{
        const result = await riddlesCollection.find({}).sort({id: -1}).limit(1).toArray();
        return result[0]?.id || 0;
    }catch(err){
        console.log(err.message)
    }
}

export async function getAllRiddlesDal(){
    try{
        const result = await riddlesCollection.find({}).toArray();
        return result;
    }catch(err){
        console.log(err.message)
    }
}


export async function updateRiddleDal(id, riddle){
    try{
        const result = await riddlesCollection.updateOne({id: id}, {$set: riddle});
        const name = await riddlesCollection.findOne({id: id}, {projection: {name: 1}});
        return name.name;
    }catch(err){
        console.log(err.message)
    }
}

export async function deleteRiddleDal(id){
    try{
        const result = await riddlesCollection.deleteOne({id: id});
        return result;
    }catch(err){
        console.log(err.message)
    }
}

// async function deleteAllRiddlesDal(){
//     try{
//         const result = await riddlesCollection.deleteMany({});
//         return result;
//     }catch(err){
//         console.log(err.message)
//     }
// }













