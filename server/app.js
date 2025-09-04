import 'dotenv/config';
import express from 'express';
import playerRoutes from './routes/player.routes.js';
import riddlesRoutes from './routes/riddles.routes.js';
import { connectToMongoDb } from './lib/mongoDbClient.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const server = express();

server.use(express.json());
server.use(cookieParser());
connectToMongoDb();
server.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://68b93fe123456--ridddlesfront.netlify.app', 
        'https://ridddlesfront.netlify.app' 
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


server.use('/player', playerRoutes);
server.use('/riddles', riddlesRoutes);
server.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;


server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});




export default server;