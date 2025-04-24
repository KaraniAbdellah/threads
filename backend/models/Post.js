import mongoose, { mongo } from "mongoose";

const PostSchema = new mongoose.Schema({
    post_name: {
        type: String,
        required: [true, "post name required"]
    },
    post_description: {
        type: String,
        required: [true, "post description required"]
    },
    post_likes_number: {
        type: Number,
        required: [true, "number of likes required"]
    },
    post_comments_number: {
        type: Number,
        required: [true, "number of comments required"]
    },
    post_date: {
        type: Date,
        required: [true, "post date required"]
    }
});

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
