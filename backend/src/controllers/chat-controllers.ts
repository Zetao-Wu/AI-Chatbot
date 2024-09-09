import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message, userId } = req.body; // Assume you are sending the userId directly from the client (or remove user logic if not needed)
  try {
    const user = await User.findById(userId); // Use userId from request body instead of res.locals.jwtData
    if (!user) return res.status(401).json({ message: "User not registered" });

    // grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // send all chats with new one to OpenAI API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);

    // get latest response
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body; // Assume you send userId from client or remove user-specific logic
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).send("User not registered");
    }

    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body; // Again, assume userId is sent from client
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).send("User not registered");
    }
    //@ts-ignore
    user.chats = []; // Clear all chats
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};



