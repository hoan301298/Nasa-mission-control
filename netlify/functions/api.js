import serverless from 'serverless-http';
import app from '../../server/src/app'; // path to your app.js

import { mongoConnect } from '../../server/src/service/mongo';
import { loadPlanetsData } from '../../server/src/models/planets.model';
import { loadLaunchesData } from '../../server/src/models/launches.model';

// Initialize DB before first function call
let isDbConnected = false;
async function initDb() {
  if (!isDbConnected) {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchesData();
    isDbConnected = true;
  }
}

export async function handler(event, context) {
  await initDb();
  return serverless(app)(event, context);
}