import express from 'express';
import { config } from 'dotenv';
config();


const app = express();

//middlwares
app.use(express.json());

//connections and listeners
app.listen(5001, () => console.log("Server Open"));