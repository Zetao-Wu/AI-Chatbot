import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
config();
const app = express();
//middlwares
app.use(cors({
    origin: "https://ai-chatbot-frontend-xyae.onrender.com", // Use the correct origin without the trailing slash
    credentials: true, // Allow cookies and credentials
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
//remove it in product
app.use(morgan("dev"));
app.use('/api/v1', appRouter);
export default app;
//# sourceMappingURL=app.js.map