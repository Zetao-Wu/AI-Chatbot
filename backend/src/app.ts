import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();

app.use(
  cors({
    origin: "https://ai-chatbot-frontend-xyae.onrender.com", // Your frontend
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Log after CORS middleware is applied
console.log("CORS is configured");

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Log cookies received on every request
app.use((req, res, next) => {
  console.log("Cookies on request:", req.signedCookies);
  next();
});

app.use("/api/v1", appRouter);

export default app;