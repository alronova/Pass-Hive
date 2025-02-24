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
        const invalidCreds = 'Provided Credentials are wrong!';
        if (!user) {
            return res.status(403)
                .json({ message: "User doesn't exist, signup first!", success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.passHash);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: invalidCreds, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, userName: user.userName, u_name: user.name, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Logged In Successfully",
                success: true,
                jwtToken,
                email: user.email,
                u_name: user.name,
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

const verifyToken = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Session Expired, Re-Login!' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Token Verified', success: true, decoded });
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = {
    signup,
    login,
    verifyToken
}