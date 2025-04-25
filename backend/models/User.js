import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: [true, "user name required"],
        unique: false
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: true,   
    },
    password: {
        type: String,
        required: [true, "password required"],
        minlength: 6,
    },

    profileImage: {
        type: String,
        required: [false, "profileImage required"],
        default: ""
    },
    coverImage: {
        type: String,
        required: [false, "coverImage required"],
        default: ""
    },
    
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: [] // 0 followers
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: [] // 0 followers
        }
    ],

}, {timestamps: true});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
