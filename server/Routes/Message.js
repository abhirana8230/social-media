const router = require("express").Router();
const Message = require("../Models/Message");

//add message
router.post("/", async(req,res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).send(savedMessage);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

//get message
router.get("/:conversationId", async(req,res) => {
    try {
        const messages = await Message.find({conversationId:req.params.conversationId});
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

module.exports = router;