import { createServer } from 'http';
import app from './app.js';

import { mongoConnect } from '../src/service/mongo.js';
import { loadPlanetsData } from './models/planets.model.js';
import { loadLaunchesData } from './models/launches.model.js';

const server = createServer(app);
const PORT = 8000;

async function startServer(){
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchesData();

    server.listen(PORT, () => {
        console.log(`Server is running on Port ${PORT}...`)
    });
};

startServer();