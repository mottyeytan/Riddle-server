import Riddle from '../../../server/models/riddles.js';
import { readRiddlesAPi } from '../api/riddles.api.js';

export async function getRiddlesObject(){
    const data = await readRiddlesAPi(true);
    
    const riddles = data.riddle;
    
    const riddlesClass = riddles.map(async riddle =>  await new Riddle(
        riddle.id,
        riddle.difficulty,
        riddle.timeLimit,
        riddle.hint,
        riddle.name,
        riddle.description, 
        riddle.correctAnswer
    ));
    return await Promise.all(riddlesClass);

}
