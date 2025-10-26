import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import api from './routes/api.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use('/v1', api);

if (process.env.PRODUCTION === 'false') {
    const buildPath = path.join(__dirname, '..', '..', 'client', 'build');
    app.use(express.static(buildPath));
    app.get('*', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
    });
}

export default app;