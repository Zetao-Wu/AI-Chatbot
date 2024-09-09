import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    console.log("Token created for user:", email, "Token:", token); // Debugging: log token creation
    return token;
};
export const verifyToken = async (req, res, next) => {
    console.log("Cookies present on the request:", req.signedCookies); // Debugging: log cookies on request
    const token = req.signedCookies[COOKIE_NAME];
    if (!token || token.trim() === "") {
        console.log("Token not received"); // Debugging log
        return res.status(401).json({ message: "Token Not Received" });
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token successfully decoded:", decoded); // Debugging: log decoded token
        res.locals.jwtData = decoded; // Store decoded data in res.locals
        console.log("User authenticated successfully, proceeding to next middleware."); // Debugging log
        return next(); // Proceed to the next middleware
    }
    catch (err) {
        console.error("Token verification failed:", err.message); // Debugging log for token verification failure
        return res.status(401).json({ message: "Token Expired or Invalid" });
    }
};
//# sourceMappingURL=token-manager.js.map