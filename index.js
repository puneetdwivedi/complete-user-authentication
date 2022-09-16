const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnect = require("./database/dbConnect.js");
const bodyParser = require("body-parser");
const apiRoutes = require("./src/api/routes/routes.js");
const path = require("path");


// env configuration
dotenv.config();

// dbConnection
dbConnect();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// routes
app.route("").get((req, res) =>{
    res.send("hello try for /api/register or /api/login");
})

// api routes
app.use("/api", apiRoutes);

app.use(express.static(path.join(__dirname, "./signium_task/build")));


// app listening port
app.listen(process.env.PORT, ()=>{
    console.log("Server is listening");
})
