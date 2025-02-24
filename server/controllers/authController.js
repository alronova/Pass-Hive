require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user_schema");


const signup = async (req, res) => {
    try {
        const { name, userName, email, password } = req.body;
        const user = await UserModel.findOne({ $or: [{ userName: userName }, { email: email }] });
        if (user) {
            return res.status(409)
                .json({ message: 'User already exists, login with your credentials', success: false });
        }
        const passHash = await bcrypt.hash(password, 10);
        const newUser =  new UserModel({ name, userName, email, passHash });
        console.log(newUser);
        await newUser.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        console.log("Error in signup", err);
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}


const login = async (req, res) => {
    try {
        const { cred, password } = req.body;
        const user = await UserModel.findOne({ $or: [{ email: cred }, { userName: cred }] });
        const errorMsg = 'Credentials are wrong!';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.passHash);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, userName: user.userName, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Logged In Successfully",
                success: true,
                jwtToken,
                email: user.email,
                name: user.name,
                userId: user._id
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

module.exports = {
    signup,
    login
}