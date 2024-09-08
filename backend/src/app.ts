import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js'
import cookieParser from 'cookie-parser';
config();


const app = express();

//middlwares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//remove it in product
app.use(morgan("dev"))

app.use('/api/v1', appRouter)

export default app;

// change localhost in userController for the domain for cookie (in constants)
// change axios default with main.tsx of frotend