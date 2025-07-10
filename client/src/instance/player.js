
import Player from '../../../server/models/player.js';

export  function getPlayersObject(){
    const player = new Player();
    return player;
}

