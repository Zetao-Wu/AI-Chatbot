import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
export const verifyToken = (req, res, next) => {
    const token = req.signedCookies[COOKIE_NAME]; // Get the signed cookie
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token Not Received" });
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.jwtData = decoded; // Save decoded token data (user info) to res.locals
        next(); // Move to the next middleware or route handler
    }
    catch (err) {
        // Token is invalid or expired
        console.error("Token verification failed:", err);
        return res.status(401).json({ message: "Token Expired or Invalid" });
    }
};
//# sourceMappingURL=token-manager.js.map