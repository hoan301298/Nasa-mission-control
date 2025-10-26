import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import planets from './planet.mongo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
};

function loadPlanetsData () {
    return new Promise((resolve, reject) => {
        createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                    await savePlanet(data)
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', async () => {
                const countPlanetsFound = (await getAllPlanets()).length;
                console.log(`${countPlanetsFound} habitable planets found!`);
                resolve();
            });
    });
};

async function getAllPlanets() {
    return await planets.find({}, {
        '_id': 0, '__v': 0
    });
};

async function savePlanet(planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name
        }, {
            keplerName: planet.kepler_name
        }, {
            upsert: true,
        });
    } catch (error) {
        console.error(`Could not save planet ${error}`);
    }
};

export {
    loadPlanetsData,
    getAllPlanets,
};