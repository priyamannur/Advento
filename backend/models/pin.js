const mongoose  = require('mongoose');

const PinSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    title:{
        type:String,
        required:true,
        min:3,
    },
    desc:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5,
    },
    lat:{
        type:Number,
        required:true,
    },
    lng:{
        type:Number,
        required:true,
    }
},
{timestamps : true}
);

module.exports = mongoose.model("Pin",PinSchema);