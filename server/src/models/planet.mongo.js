import { Schema, model } from 'mongoose';

const planetSchema = new Schema({
    keplerName: {
        type: String,
        required: true,
    }
});

export default model('planets', planetSchema);