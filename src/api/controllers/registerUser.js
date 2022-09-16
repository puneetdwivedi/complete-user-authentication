const userModel = require("../../models/userModel.js");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        if (name === undefined || username === undefined || email === undefined || password === undefined) {
            res.status(400).json({ success: "fail", result: "name, username, password, email, required" });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(password, salt);
            const resultUser = await userModel.create({ name, username, email, password: hashpassword });
            res.status(200).json({ success: "ok", result: resultUser });
        }

    } catch (err) {
        res.status(501).json({ success: "fail", result: err });
    }
}

module.exports = registerUser;