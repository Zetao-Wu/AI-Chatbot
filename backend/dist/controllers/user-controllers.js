import User from "../models/User.js";
import { hash } from 'bcrypt';
export const getAllUsers = async (req, res, next) => {
    //get all users from db
    try {
        const users = await User.find();
        return res.status(200).json({ message: "Ok", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error });
    }
};
export const userSignup = async (req, res, next) => {
    //user signup
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hash(password, 10);
        const user = new User({
            name, email, password: hashedPassword
        });
        await user.save();
        return res.status(201).json({ message: "Ok", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error });
    }
};
//# sourceMappingURL=user-controllers.js.map