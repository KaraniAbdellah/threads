import React, { useContext, useState } from "react";
import {
  HiOutlinePhotograph,
  HiOutlineVideoCamera,
  HiOutlineEmojiHappy,
  HiOutlineLocationMarker,
  HiOutlineGlobeAlt,
  HiOutlineChevronDown,
} from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineRetweet,
} from "react-icons/ai";
import { IoShareOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";
import userContext from "../../context/UserContext";
import axios from "axios";

// Mock posts data
const mockPosts = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      username: "sarahc",
      profile_image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      verified: true,
    },
    content:
      "Just finished an amazing hike in the mountains! The view from the top was absolutely breathtaking. Nature never fails to inspire me ✨",
    timestamp: "2h",
    likes: 24,
    comments: 8,
    reposts: 3,
  },
  {
    id: 2,
    user: {
      name: "Alex Rivera",
      username: "alexr",
      profile_image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      verified: false,
    },
    content:
      "Working on some exciting new projects! Can't wait to share what we've been building. The future of tech is looking bright 🚀",
    timestamp: "4h",
    likes: 67,
    comments: 12,
    reposts: 8,
  },
];

const Home = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState(mockPosts);
  const user = useContext(userContext);
  const [post, setPost] = useState({
    user: "",
    post_text: "",
    post_img: "",
    post_likes: [],
    post_comments: [],
    post_date: null,
  });

  const handlePost = async () => {
    setPost((prevPost) => ({
      ...prevPost,
      post_date: new Date(),
      user: user._id,
    }));
    console.log(post);
    // Store Post To Database
    await axios
      .post(`${import.meta.env.VITE_API_URL}/api/post/create`, post, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectImage = () => {
    console.log("Select Your Image");
  };

  const NotBuildYet = () => {
    toast("Not Implemented Yet!", {
      icon: "🛠️",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-zinc-800">
      <div className="max-w-2xl mx-auto pt-8 px-4">
        {/* Create Post Section */}
        <div className="bg-zinc-900 rounded-2xl shadow-lg border border-yellow-700 p-6 mb-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <img
                src={user.profile_image}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-4">
                <HiOutlineGlobeAlt className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-600">
                  Everyone can reply
                </span>
              </div>

              <textarea
                value={post.post_text}
                onChange={(e) =>
                  setPost({ ...post, post_text: e.target.value })
                }
                placeholder="What's happening?"
                className="w-full text-xl placeholder-gray-500 text-white border-none outline-none resize-none min-h-[80px] bg-transparent"
                rows="3"
              />
              <div
                className="image_show scroll-m-60 overflow-auto overflow-y-auto [&::-webkit-scrollbar]:w-2
                      [&::-webkit-scrollbar-track]:bg-yellow-100
                      [&::-webkit-scrollbar-thumb]:bg-yellow-300
                      dark:[&::-webkit-scrollbar-track]:bg-zinc-800
                      w-full h-[300px] rounded-md flex justify-center items-center"
              >
                <img src={post.post_img} alt="" />
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <div className="flex space-x-4">
                  <label
                    htmlFor="upload_file"
                    onClick={selectImage}
                    className="flex items-center space-x-2 text-blue-500 hover:bg-blue-200 px-3 py-2 rounded-full transition-colors"
                  >
                    <HiOutlinePhotograph className="w-5 h-5" />
                    <span className="text-sm font-medium">Photo</span>
                  </label>
                  <input
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPost({
                          ...post,
                          post_img: reader.result, // this is a valid base64 string
                        });
                      };
                      reader.readAsDataURL(file);
                    }}
                    id="upload_file"
                    className="hidden"
                    type="file"
                  />

                  <button
                    onClick={NotBuildYet}
                    className="flex items-center space-x-2 text-green-500 hover:bg-green-200 px-3 py-2 rounded-full transition-colors"
                  >
                    <HiOutlineVideoCamera className="w-5 h-5" />
                    <span className="text-sm font-medium">Video</span>
                  </button>
                  <button
                    onClick={NotBuildYet}
                    className="flex items-center space-x-2 text-yellow-500 hover:bg-yellow-200 px-3 py-2 rounded-full transition-colors"
                  >
                    <HiOutlineEmojiHappy className="w-5 h-5" />
                  </button>
                  <button
                    onClick={NotBuildYet}
                    className="flex items-center space-x-2 text-red-500 hover:bg-red-200 px-3 py-2 rounded-full transition-colors"
                  >
                    <HiOutlineLocationMarker className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={handlePost}
                  disabled={!post.post_text}
                  className="bg-gradient-to-r bg-yellow-700 hover:bg-yellow-600 text-white px-8 py-2.5 rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-zinc-900 rounded-2xl shadow-lg border border-yellow-700 hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <img
                      src={post.user.profile_image}
                      alt={post.user.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-yellow-600">
                          {post.user.name}
                        </h3>
                        {post.user.verified && (
                          <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm">
                        @{post.user.username} · {post.timestamp}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors">
                    <BsThreeDots className="w-4 h-4" />
                  </button>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-white text-lg leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 hover:bg-red-50 px-3 py-2 rounded-full transition-all group">
                    <AiOutlineHeart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>

                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 px-3 py-2 rounded-full transition-all group">
                    <AiOutlineComment className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>

                  <button
                    onClick={NotBuildYet}
                    className="flex items-center space-x-2 text-gray-500 hover:text-green-500 hover:bg-green-50 px-3 py-2 rounded-full transition-all group"
                  >
                    <AiOutlineRetweet className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{post.reposts}</span>
                  </button>

                  <button
                    onClick={NotBuildYet}
                    className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 hover:bg-purple-50 px-3 py-2 rounded-full transition-all group"
                  >
                    <IoShareOutline className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center py-8">
          <button className="bg-white text-gray-600 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors shadow-md border border-gray-200">
            Load more posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
