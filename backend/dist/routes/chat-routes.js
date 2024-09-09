import { Router } from "express";
import { chatCompletionValidation, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";
//Protected API
const chatRoutes = Router();
chatRoutes.post("/new", validate(chatCompletionValidation), generateChatCompletion);
chatRoutes.get("/all-chats", sendChatsToUser);
chatRoutes.delete("/delete", deleteChats);
export default chatRoutes;
//# sourceMappingURL=chat-routes.js.map