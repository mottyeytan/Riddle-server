import express from 'express';
import playerRoutes from './routes/player.routes.js';
import riddlesRoutes from './routes/riddles.routes.js';

const server = express();

server.use(express.json());

server.use('/player', playerRoutes);
server.use('/riddles', riddlesRoutes);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

export default server;