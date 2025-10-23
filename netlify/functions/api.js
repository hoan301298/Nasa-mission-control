import serverless from 'serverless-http';
import app from '../../server/src/app'; // path to your app.js

import { mongoConnect } from '../../server/src/service/mongo';
import { loadPlanetsData } from '../../server/src/models/planets.model';
import { loadLaunchesData } from '../../server/src/models/launches.model';

// Initialize DB before first function call
async function initDb() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchesData();
}

export async function handler(event, context) {
    await initDb();
    return serverless(app)(event, context);
}