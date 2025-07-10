import {readFile, writeFile} from 'fs/promises'


const dbPlayers = '../data/players.txt'
const dbRiddles = '../data/riddles.txt'

const db = {
    players:{

        async GetAll(){
            try{
                const data =  await readFile(dbPlayers, 'utf8');
                const players = JSON.parse(data);
                return players;
            }catch(err){
                return err;
            }
        },

        async Write(data){
            try{
                const convertData = JSON.stringify(data, null, 2)
                await writeFile(dbPlayers, convertData, 'utf8');
            }catch(err){
                return err
            }
        }

    },
    riddles:{
        async GetAll(){
            try{
                const data =  await readFile(dbRiddles, 'utf8');
                const riddles = JSON.parse(data);
                return riddles;
            }catch(err){
                return err
            }
        },

        async Write(data){
            try{
                const convertData = JSON.stringify(data, null, 2)
                await writeFile(dbRiddles, convertData, 'utf8')
            }catch(err){
                return err
            }
        }

    }
}

export default db



// db.riddles.Write([{"name":"motty"}])