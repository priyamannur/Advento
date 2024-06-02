const router = require("express").Router();
const Pin = require("../models/pin.js");
const mongoose = require("mongoose")
const USER = require("../models/model.js")
const requireLogin = require("../middlewares/requireLogin");
//create a pin
router.post("/",requireLogin, async (req,res)=>{
  console.log(req.user.userName)
  const newPin = new Pin({
    userame: req.user.userName,
    title: req.body.title,
    desc: req.body.desc,
    rating: req.body.rating,
    lat: req.body.lat,
    lng: req.body.lng,
  });
    try{
        const savedPin = await  newPin.save();
        res.status(200).json(savedPin);
    }catch(err){
        res.status(500).json(err);
    }
})

//get a pin
router.get("/",requireLogin,async (req, res) => {
    try {
      const users = await USER.find({following: req.user.following});
      const userNames = users.map(user => user.userName);
      userNames.push(req.user.username);
      const pins = await Pin.find({username: { $in: userNames }});
      res.status(200).json(pins);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  });
module.exports = router;