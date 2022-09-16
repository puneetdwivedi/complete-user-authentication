const userModel = require("../../models/userModel.js");
const bcrypt = require("bcrypt");

const userAuth = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username === undefined || password === undefined) {
            res.status(401).json({ success: "ok", result: "username and password is required" });
        }
        else {
            const user = await userModel.findOne({ username });
            if (user === null) {
                res.status(404).json({ success: "fail", result: "Username not found" });
            }
            else {
                const result = await bcrypt.compare(password, user.password);
                if (result) {
                    res.status(200).json({ success: 'ok', result: user });
                }
                else {
                    res.status(404).json({ success: "fail", result: "Password do not match" })
                }
            }
        }
    } catch (err) {
        res.status(500).json({ success: "ok", result: err });
    }
}

module.exports = userAuth;