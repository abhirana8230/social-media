const router = require("express").Router();
const Post = require("../Models/Post");
const User = require("../Models/User");


//create a post
router.post("/",async(req,res) => {
    try {
        const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json({message:"Post created successfully!",savedPost})
    } catch (error) {
        res.status(500).json(error);
    }
})

//get a post
router.get("/:id", async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
       res.status(200).send(post);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
})

//update a post
router.put("/:id",async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            const updatePost = await Post.updateOne({$set:req.body});
            res.status(200).send({message:"post updated successfully!"})
        }else{
            res.status(403).json("You can upate only your posts!");
        }
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
})

//delete a post
router.delete("/:id", async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await Post.deleteOne(post);
            res.status(200).send({message:"post deleted successfully!"})
        }else{
            res.status(403).json("You can delete only your posts!");
        }
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
})

//like a post
router.put("/:id/like", async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
            res.status(200).send({message:"Post has been liked successfully!"})
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).send({message:"Post has been disliked successfully!"})
        }
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
})

//love a post
router.put("/:id/love", async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.loved.includes(req.body.userId)){
            await post.updateOne({$push:{loved:req.body.userId}})
            res.status(200).send({message:"Post has been loved successfully!"})
        }else{
            await post.updateOne({$pull:{loved:req.body.userId}})
            res.status(200).send({message:"Post has been hated successfully!"})
        }
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
})



//get timeline posts
router.get("/timeline/:userId", async(req,res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const currentuserPosts = await Post.find({userId:currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({userId: friendId})
            })
        );
         res.status(200).json(currentuserPosts.concat(...friendPosts));
 } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
})

//get user's all posts
router.get("/profile/:username", async(req,res) => {
    try {
        const user = await User.findOne({username:req.params.username});
        const posts = await Post.find({userId:user._id});
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

module.exports = router;