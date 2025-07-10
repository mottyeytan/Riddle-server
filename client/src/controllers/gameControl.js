import { userOption, riddlesDetails, updateRiddleOptions, AskForRiddleID } from '../utils/userInputs.js';

export function gameControl(){
    const option = userOption();
    if(option === '1'){
        return 1
    }else if(option === '2'){
        return 2
    }else if(option === '3'){
        return 3
    }else if(option === '4'){
        return 4
    }else if(option === '5'){
        return 5
    }else if(option === '6'){
        return 6
    }else if(option === '7'){
        return 7
    }
}