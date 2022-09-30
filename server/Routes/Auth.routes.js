const router =require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");

//register
router.post("/register",async(req,res) => {
    try {
        const { username, email, password, cnfmPassword } = req.body;
        //encrypting password
        const salt = await bcrypt.genSalt(12);
        const encryptPass = await bcrypt.hash(password,salt);
        //creating new user
        const newUser = await new User({
            username: username,
            email:email,
            password:encryptPass
        });
        //save user
        const user = await newUser.save();
        res.status(200).send({message:"Registration successful!"});
    } catch (error) {
        console.log(error);
        res.status(500).send({error:'Sorry, registration unsuccessful!'});
    }
})

//login
router.post("/login", async(req,res) => {
    try {
        const {email, password} = req.body;
        const loginUser = await User.findOne({email:email});
        if(loginUser){
            const validPass = await bcrypt.compare(password,loginUser.password);
            if(!validPass){
                res.status(404).send({error:"Invalid Credentials!"});
            }else{
                res.status(200).send({message:"Login successful!",loginUser});
            }
        }else{
            res.status(404).send({error:"User not exist!"})
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal error!"})
    }
})

module.exports = router;