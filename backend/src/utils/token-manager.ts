import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.signedCookies[COOKIE_NAME];

  if (!token || token.trim() === "") {
    console.log("Token not received"); // Debugging log
    return res.status(401).json({ message: "Token Not Received" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Debugging log
    res.locals.jwtData = decoded; // Store decoded data in res.locals
    return next(); // Proceed to the next middleware
  } catch (err) {
    console.error("Token verification failed:", err); // Debugging log
    return res.status(401).json({ message: "Token Expired or Invalid" });
  }
};
