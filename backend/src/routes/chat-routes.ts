import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidation, validate } from "../utils/validators.js";
import { generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";

//Protected API
const chatRoutes = Router();
chatRoutes.post("/new", validate(chatCompletionValidation), verifyToken, generateChatCompletion);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);


export default chatRoutes;