import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: [true, "user name required"]
    },
    email: {
        type: String,
        required: [true, "email required"]
    },
    password: {
        type: Number,
        required: [true, "password required"]
    },
    posts: {
        // type: Object.getPrototypeOf(),
        required: [true, "posts required"]
    }
});

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
