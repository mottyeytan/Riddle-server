import { hashPassword, comparePassword } from '../utils/password.js';
import { getPlayerByNameDal } from '../dal/players.js';
import { createPlayer } from '../services/players.services.js';
import { generateToken } from '../utils/jwt.js';

export const signupController = async (req, res) => {
    try{
        
        const { name, password, role = 'user' } = req.body;
        if(role !== 'guest'){
            if (!name || !password) {
                return res.status(400).json({ message: 'one field is missing' });
            }
        }
        let playerExists = false;
        
        const existingPlayer = await getPlayerByNameDal(name);
        if (existingPlayer && role !== 'guest') {
            return res.status(403).json({ message: 'player already exists, please login', loggedIn: false });
        }else if(existingPlayer && role === 'guest'){
            playerExists = true;
        }
        let hashedPassword;
        if(role !== 'guest'){
            hashedPassword = await hashPassword(password);
        }
        if(role === 'guest'){
            hashedPassword = null;
        }
        const player = await createPlayer(name, hashedPassword, role);
        
        if(player){
            const token = generateToken(name, player.role);
            res.status(201).json({token, role: player.role, playerExists});
        }else{
            res.status(403).json({ message: 'player not created' });
        }

    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
    }
}

export const loginController = async (req, res) => {
    try{
        
        const { name, password } = req.body;
        const existingPlayer = await getPlayerByNameDal(name);
        if (!existingPlayer) {
            return res.status(403).json({ message: 'player not found', loggedIn: false });
        }
        const isPasswordValid = await comparePassword(password, existingPlayer.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: 'invalid password' });
        }
        const token = generateToken(name, existingPlayer.role);
        res.status(200).json({token, role: existingPlayer.role});

    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
    }
}


