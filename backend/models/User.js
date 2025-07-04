import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
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

    profile_image: {
      type: String,
      required: [false, "profile_image is not required"],
      default: "https://robohash.org/username.png?size=150x150",
    },
    cover_image: {
      type: String,
      required: [false, "cover_image is not required"],
      default: "",
    },

    bio: {
      type: String,
      required: [false, "bio is not required"],
      default: "",
    },
    link: {
      type: String,
      required: [false, "bio is not required"],
      default: "",
    },
    liked_posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [], // 0 followers
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [], // 0 followers
      },
    ],
    verfied: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
