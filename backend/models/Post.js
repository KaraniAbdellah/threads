import mongoose, { mongo } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post_text: {
      type: String,
      required: true,
    },
    post_image: {
      type: String,
      required: false,
    },
    post_likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    post_comments: [
      {
        text: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    post_date: {
      type: Date,
      required: [true, "post date required"],
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
