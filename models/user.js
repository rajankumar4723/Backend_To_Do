import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type:String,
        require:true,

    },
    email: {
        type: String,
        unique: true,
        require:true, 

    },
    password: {
        type: String,
        select: false,  //const user = await User.findOne({ email }).select("+password");
        require:true,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export const User = mongoose.model("User", schema);
