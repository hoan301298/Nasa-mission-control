import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
const Mongo_URL = process.env.MONGO_URL;

if (!Mongo_URL) {
    throw new Error("MONGO_URL environment variable is not defined");
}

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function mongoConnect() {
    await mongoose.connect(Mongo_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

async function mongoDisconnect() {
    await mongoose.disconnect();
};

export {
    mongoConnect,
    mongoDisconnect
};