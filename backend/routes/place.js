const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const { route } = require("./auth");
const POST = mongoose.model("POST")

router.get("/place", requireLogin, (req, res) => {
    let query = {}; 
    const place = req.query.q;
    console.log(place)
    if (place) {
        query = { location: place };
    }
    POST.find(query)
        .populate("postedBy", "_id name Photo")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt")
        .then(posts => res.json(posts))
        .catch(err => console.log(err))
});

module.exports = router