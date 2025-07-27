import 'dotenv/config';
import express from 'express';
import playerRoutes from './routes/player.routes.js';
import riddlesRoutes from './routes/riddles.routes.js';
import { connectToMongoDb } from './lib/mongoDbClient.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';


const server = express();

server.use(express.json());
server.use(cookieParser());

connectToMongoDb();

server.use('/player', playerRoutes);
server.use('/riddles', riddlesRoutes);
server.use('/auth', authRoutes);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});




export default server;