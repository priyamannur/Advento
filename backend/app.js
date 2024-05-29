const express = require("express"); //to import express
const app = express();  //to run express
const port = 5000;

const mongoose = require("mongoose");
const {mongoUrl} = require("./keys");
const cors=require("cors");


app.use(cors())

require('./models/model')
require('./models/post')

app.use(express.json())

app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))
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