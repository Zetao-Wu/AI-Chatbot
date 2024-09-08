import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidation, validate } from "../utils/validators.js";
import { generateChatCompletion } from "../controllers/chat-controllers.js";
//Protected API
const chatRoutes = Router();
chatRoutes.post("/new", validate(chatCompletionValidation), verifyToken, generateChatCompletion);
export default chatRoutes;
//# sourceMappingURL=chat-routes.js.map