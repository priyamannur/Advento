const mongoose = require("mongoose");

const chatData = new mongoose.Schema({
    clientChat:{
        type:String,
        unique:true
    },
    serverChat:{
        type:String,
        unique:true
    }
});

module.exports = mongoose.model("Chat", chatData);