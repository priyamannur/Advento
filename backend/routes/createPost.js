const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const POST = mongoose.model("POST");

// Route to get all posts
router.get("/allposts", requireLogin, (req, res) => {
    POST.find()
        .populate("postedBy", "_id name")
        .then(posts => res.json(posts))
        .catch(err => console.log(err));
});

// Route to create a post
router.post("/createPost", requireLogin, (req, res) => {
    const { body, pic } = req.body;
    console.log(pic);

    if (!body || !pic) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    console.log(req.user);
    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user
    });
    post.save().then((result) => {
        return res.json({ post: result });
    }).catch(err => console.log(err));
});

// Route to get user's posts
router.get("/myposts", requireLogin, (req, res) => {
    POST.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")

        .then(myposts => {
            res.json(myposts);
        })
        .catch(err => console.log(err));
});

// Route to like a post
router.put("/like", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).exec()
      .then(result => res.json(result))
      .catch(err => res.status(422).json({ error: err }));
});

// Route to unlike a post
router.put("/unlike", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).exec()
      .then(result => res.json(result))
      .catch(err => res.status(422).json({ error: err }));
});


//comment Router
router.put("/comment", requireLogin, (req, res) => {
    const comment={
        comment:req.body.text,
        postedBy:req.user._id
    }

    POST.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    })
    .populate("comments.postedBy","_id name")
    
    
    .exec()
      .then(result => res.json(result))
      .catch(err => res.status(422).json({ error: err }));
});


//APi to delete post
router.delete("/deletePost/:postId", requireLogin, async (req, res) => {
 POST.findOne({id:req.params.postId})
 .populate("postedBy","_id")
 .exec((err,post)=>{
    if(err|| !post){
        return res.status(422).json({error:err})
    }
    
   if(post.postedBy._id.toString() == req.user._id.toString()){
        post.remove()
        .then(result=>{
            return res.json({message:
                "Successfully deleted"  })
        }).catch((err)=>{
            console.log(err)
        })
    }
 })

})



module.exports = router;

   
       
        
         





