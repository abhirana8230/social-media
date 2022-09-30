const router =require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async(req,res) => {
    const {id,password} = req.body;
    if(id === req.params.id){
        try {
            if(req.body.password){
                const salt = await bcrypt.genSalt(12);
                const encPass = await bcrypt.hash(req.body.password,salt);
                req.body.password = encPass
           }
           const updateUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body});
           res.status(200).send({message:"Account updated successfully!"});
        } catch (error) {
            res.status(500).json(error);
        }
    }else{
        res.status(403).json({error:"You can update only your account!"})
    }
})

//delete user
router.delete("/:id", async(req,res) => {
    if(req.body.id === req.params.id){
        try {
            const delUser = await User.deleteOne({_id:req.params.id});
    res.status(200).json({message: "User Deleted successfully!"})
        } catch (error) {
            console.log(error);
            res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can delete only your account!");
    }
})

//get a user 
router.get("/", async(req,res) => {
    const userId = req.query.userId;
    const username =  req.query.username;
    try {
        const getUser = userId ? await User.findById(userId) : await User.findOne({username:username});
        const {password,updatedAt,...other} = getUser._doc;
        res.status(200).send(other);
    } catch (error) {
        res.status(500).json(error);
    }
})

//get all friends
router.get("/friends/:id", async(req,res) => {
    try {
        const currentUser = await User.findById(req.params.id);
        const friends = await Promise.all(
            currentUser.following.map((friendID) => {
                return User.findById(friendID);  
            })
        );

        //but we need only userid,username and profilepic so extract that only
        let friendList =[];
        friends.map((friend,key) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        })
        res.status(200).send(friendList);
    } catch (error) {
        res.status(500).send(error);
    }
})

//follow a user
router.put("/follow/:id", async(req,res) => {
    try {
        if(req.body.id === req.params.id){
            res.status(403).send({error:"You can't follow yourself!"});
        }else{
            const followUser = await User.findOne({_id:req.params.id});
            const followingUser = await User.findById(req.body.id);
            if(!followUser.followers.includes(req.body.id)){
                await followUser.updateOne({$push: {followers:req.body.id}});
                await followingUser.updateOne({$push: {following:req.params.id}});
                res.status(200).json({message:"User has been followed successfully!"})
            }else{
                res.status(403).json({message:"You already follow this user!"});
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

//unfollow a user
router.put("/unfollow/:id", async(req,res) => {
    try {
        if(req.body.id === req.params.id){
            res.status(403).send({error:"You can't unfollow yourself!"});
        }else{
            const unfollowUser = await User.findOne({_id:req.params.id});
            const unfollowingUser = await User.findById(req.body.id);
            if(unfollowUser.followers.includes(req.body.id)){
                await unfollowUser.updateOne({$pull: {followers:req.body.id}});
                await unfollowingUser.updateOne({$pull: {following:req.params.id}});
                res.status(200).json({message:"User has been unfollowed successfully!"})
            }else{
                res.status(403).json({message:"You do not follow this user!"});
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;