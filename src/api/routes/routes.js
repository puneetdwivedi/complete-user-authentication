const routes = require("express").Router();
const registerUser = require("../controllers/registerUser.js");
const userAuth = require("../controllers/userAuth.js");


routes.route("").get((req,res)=>{
    res.send("api routes hit");
});

// register a  user route
routes.route("/register").post(registerUser);

// login routes
routes.route("/login").post(userAuth);

module.exports = routes;