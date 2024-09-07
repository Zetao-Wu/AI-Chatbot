import User from "../models/User.js";
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
//# sourceMappingURL=user-controllers.js.map