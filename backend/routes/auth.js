const express = require ("express");
const router = express.Router()
const mongoose= require("mongoose");
const USER = mongoose.model("USER");
const bcrypt =require("bcrypt");
const app = express();  

const cors=require("cors");
app.use(cors());
const jwt=require("jsonwebtoken");
const{Jwt_secret}=require("../keys");
const requireLogin = require("../middlewares/requireLogin");



router.get ('/',(req,res)=>{
    res.send("hello")
})



router.post("/signup",(req,res)=>{
const{name,userName,email,password}=req.body;
// const name= req.body.name
// const userName = req.body.userName
// const email = req.body.email
// const password = req.body.password

if(!name  || !email || !userName || !password){
   return res.status(422).json({error:"Please add all the fields"})
}

USER.findOne({$or:[{email:email},{userName:userName}]}).then((savedUser)=>{
    if(savedUser){
        return res.status(422).json({error:"User already exist with that email or username"})

    }

    bcrypt.hash(password,12).then((hashedPassword)=>{
        const user =new USER ({
            name,
            email,
            userName,
            password: hashedPassword
        })
        
        
        user.save()
            .then(user => {res.json({message:"Registered successfully"})})
            .catch(err=>{console.log(err)})

    })
   
    })
    
})


router.post("/signin",(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(422).json({error:"Please add email and password"})
    }
   
    USER.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email "})
        }
       bcrypt.compare(password,savedUser.password ).then
       ((match)=>{
         if(match){
           // return res.status(200).json
           // ({message:"Signed in Successfully"})
           const token=jwt.sign({_id:savedUser.id},Jwt_secret)
           const {_id,name,email,userName}=savedUser
           

           res.json({token,user:{_id,name,email,userName}})
           console.log({token,user:{_id,name,email,userName}})
        
         }else{
            return res.status(422).json
            ({error:"Invalid password"})
         }
       })
       .catch(err => console.log(err))
    })
})
// router.post("/forgot-password", (req, res) => {
//     const { email } = req.body;
  
//     if (!email) {
//       return res.status(422).json({ error: "Please provide email" });
//     }
  
//     // Generate reset token and expiry time
//     crypto.randomBytes(32, (err, buffer) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: "Internal server error" });
//       }
//       const token = buffer.toString("hex");
  
//       USER.findOne({ email: email })
//         .then((user) => {
//           if (!user) {
//             return res.status(404).json({ error: "User not found" });
//           }
  
//           // Save reset token and expiry time to user document
//           user.resetPasswordToken = token;
//           user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
  
//           return user.save();
//         })
//         .then((user) => {
//           // Send email with reset token
//           const transporter = nodemailer.createTransport({
//             service: "Gmail",
//             auth: {
//               user: "priyamannur14608@gmail.com", // Update with your email credentials
//               pass: "your_password", // Update with your email password
//             },
//           });
  
//           const mailOptions = {
//             from: "priyamannur14608@gmail.com",
//             to: email,
//             subject: "Password Reset",
//             text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n`
//               + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
//               + `http://${req.headers.host}/reset/${token}\n\n`
//               + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
//           };
  
//           transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//               console.error(error);
//               return res.status(500).json({ error: "Failed to send email" });
//             }
//             console.log("Email sent: " + info.response);
//             res.json({ message: "Email sent with password reset instructions" });
//           });
//         })
//         .catch((err) => {
//           console.error(err);
//           res.status(500).json({ error: "Internal server error" });
//         });
//     });
//   });


module.exports = router;
