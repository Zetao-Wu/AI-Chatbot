import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();
//middlewares
app.use(cors({
    origin: "https://ai-chatbot-frontend-xyae.onrender.com", // Exact URL of your frontend
    credentials: true, // Allow credentials (cookies)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow necessary HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allow necessary headers
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map