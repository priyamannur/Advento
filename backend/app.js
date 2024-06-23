const express = require("express"); //to import express
const app = express();  //to run express
const port = 5000;

const mongoose = require("mongoose");
const {mongoUrl} = require("./keys");
const cors=require("cors");
const pinRoute = require("./routes/pins.js");
const chatRoute = require("./routes/chat.js")
app.use(cors());

require('./models/model')
require('./models/post')

app.use(express.json())

app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))
app.use(require("./routes/user"))
app.use(require("./routes/place.js"))
app.use("/addpins",pinRoute)
app.use("/chat", chatRoute);
mongoose.connect(mongoUrl);

mongoose.connection.on("connected",()=>{
    console.log("succesfully connected to mongo")
})

mongoose.connection.on("error",()=>{
    console.log("not connected to mongodb")
})



app.listen(port,()=>{
    console.log("server is running on port" + " " + port)
})