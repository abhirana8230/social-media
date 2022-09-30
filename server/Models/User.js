const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 4,
        max: 20,
        unique: true
    },
    email:{
        type: String,
        required: true,
        max:50,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 6
    },
    followers:{
        type:Array,
    },
    following:{
        type:Array,
    },
    desc:{
        type:String,
        max: 50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max: 50
    },
    relationship:{
        type: String,
        max: 100
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    profilePicture:{
        type:String,
        dafault:""
    },
    coverPicture:{
        type:String,
        dafault:""
    }
},
{timestamps:true}
);

module.exports = mongoose.model("User", userSchema);