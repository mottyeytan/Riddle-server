
import Player from '../../../server/models/player.js';

export async function getPlayersObject(){
    const player = await new Player();
    return player;
}

