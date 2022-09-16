const mongoose = require("mongoose");

const dbConnect = () =>{
    mongoose.connect(process.env.DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("Connection Successful");
    }).catch((err)=>{
        console.log(err);
    })
}


module.exports = dbConnect;