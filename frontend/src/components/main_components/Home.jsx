import React, { useContext, useState, useEffect, useRef } from "react";
import {
  HiOutlinePhotograph,
  HiOutlineVideoCamera,
  HiOutlineEmojiHappy,
  HiOutlineLocationMarker,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineRetweet,
} from "react-icons/ai";
import { IoSadOutline, IoShareOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";
import userContext from "../../context/UserContext";
import axios from "axios";
import formatTimeAgo from "../../utlis_functions/formatTimeAgo";
import { FaEdit, FaTrash } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Home = () => {
  const [posts, setPosts] = useState([]);
  const user = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPostAction, setShowPostAction] = useState(false);
  const post_actions_menu = useRef(null);
  const [post_number, setPost_Number] = useState(4);
  const [postToPost, setPostToPost] = useState({
    user: "",
    post_text: "",
    post_img: "",
    post_likes: [],
    post_comments: [{ text: "", user: "" }],
    post_date: null,
  });

  const handlePost = async () => {
    const postToSend = {
      ...postToPost,
      post_date: new Date(),
      user: user._id,
    };
    // Store Post To Database
    try {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/api/post/create`, postToSend, {
          withCredentials: true,
        })
        .then((res) => {
          setPostToPost({
            user: "",
            post_text: "",
            post_img: "",
            post_likes: [],
            post_comments: [{ text: "", user: "" }],
            post_date: null,
          });
          toast.success("Post Added Successfully", {
            duration: 2000,
            position: "bottom-right",
          });
        })
        .catch((err) => {
          toast.error("Failed Adding Post", {
            duration: 2000,
            position: "bottom-right",
          });
        });
    } catch (error) {
      toast.error("Failed Adding Post", {
        duration: 2000,
        position: "bottom-right",
      });
    }
  };

  const selectImage = () => {
    console.log("Select Your Image");
  };

  const NotBuildYet = () => {
    toast("Not Implemented Yet!", {
      duration: 2000,
      icon: "🛠️",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const GetAllPosts = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/api/post/all_posts`, {
          withCredentials: true,
        })
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(true));
    } catch (error) {
      console.log(error);
    }
  };

  const LikePost = async (post) => {
    console.log("Like To POst");
    console.log(post);
  }

  const CommentPost = async (post) => {
    console.log("Comment To Post");
    console.log(post);
  }

  useEffect(() => {
    GetAllPosts();
    return () => {};
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", function (e) {
      if (post_actions_menu && post_actions_menu.current) {
        console.log(post_actions_menu.current);
        console.log(e.target);
        if (post_actions_menu.current.contains(e.target)) {
          console.log("We CLick Outside");
          setShowPostAction(false);
        }
      }
    });
  }, [post_actions_menu]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.scrollHeight &&
        isLoading
      ) {
        setPost_Number((post_number) => post_number + 4);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br bg-zinc-800 border-r border-l border-zinc-700 pb-4">
      <div className="max-w-2xl mx-auto pt-4 px-2">
        {/* Create Post Section */}
        <div data-aos="flip-left" className="bg-zinc-900 rounded-md shadow-lg border border-yellow-700 p-4 mb-6 hover:shadow-xl transition-all duration-300">
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
              <div className="flex items-center space-x-2 mb-2">
                <HiOutlineGlobeAlt className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-600">
                  Everyone can reply
                </span>
              </div>

              <textarea
                value={postToPost.post_text}
                onChange={(e) =>
                  setPostToPost({ ...postToPost, post_text: e.target.value })
                }
                placeholder="What's happening?"
                className="w-full text-xl
                [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-yellow-100
                        [&::-webkit-scrollbar-thumb]:bg-yellow-300
                        dark:[&::-webkit-scrollbar-track]:bg-zinc-800
                         placeholder-gray-500 text-white border-none outline-none resize-none min-h-[40px] bg-transparent"
              />
              {postToPost.post_img ? (
                <div
                  className="image_show scroll-m-60 overflow-auto overflow-y-auto [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-yellow-100
                        [&::-webkit-scrollbar-thumb]:bg-yellow-300
                        dark:[&::-webkit-scrollbar-track]:bg-zinc-800
                        w-full h-[300px] rounded-md flex justify-center items-center"
                >
                  <img src={postToPost.post_img} alt="" />
                </div>
              ) : (
                ""
              )}

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
                        setPostToPost({
                          ...postToPost,
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
                  disabled={postToPost.post_text.length < 10}
                  className="bg-gradient-to-r bg-yellow-700 hover:bg-yellow-600 text-white px-8 py-2.5 rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        {isLoading ? (
          <div data-aos="fade-up" className="space-y-6">
            {posts.slice(0, post_number).map((post) => (
              <div
                key={post._id}
                className="bg-zinc-900 rounded-md  shadow-lg border border-yellow-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="p-4">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start space-x-3">
                      <img
                        src={post.user.profile_image}
                        alt={post.user?.user_name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-yellow-600">
                            {post.user?.user_name}
                          </h3>
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
                        </div>
                        <p className="text-gray-500 text-sm">
                          @{post.user.user_name.split(" ")[0]} ·{" "}
                          {formatTimeAgo(post.post_date)}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setShowPostAction(!showPostAction)}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
                      >
                        <BsThreeDots className="w-4 h-4" />
                      </button>
                      {showPostAction ? (
                        <div
                          ref={post_actions_menu}
                          className="post_action absolute top-0 right-0 bg-zinc-900 p-1 rounded-sm border"
                        >
                          <button className="flex items-center w-full gap-1 px-3 py-1 text-white rounded hover:bg-zinc-800">
                            <FaEdit /> Edit
                          </button>
                          <button className="flex items-center w-full gap-1 px-3 py-1 text-white rounded hover:bg-zinc-800">
                            <FaTrash /> Delete
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="mb-2">
                    <p className="text-white text-lg leading-relaxed">
                      {post.post_text}
                    </p>
                  </div>
                  {post.post_image ? (
                    <div className="border rounded-md w-full h-full">
                      <img className="h-full" src={post.post_image}></img>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button onClick={() => LikePost(post)} className="flex items-center space-x-2 text-gray-500 hover:text-red-500 hover:bg-red-50 px-3 py-2 rounded-full transition-all group">
                      <AiOutlineHeart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">
                        {post.post_likes?.length == 0
                          ? 0
                          : post.post_likes?.length}
                      </span>
                    </button>

                    <button onClick={() => CommentPost(post)} className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 px-3 py-2 rounded-full transition-all group">
                      <AiOutlineComment className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">
                        {post.post_likes?.length}
                      </span>
                    </button>

                    <button
                      onClick={NotBuildYet}
                      className="flex items-center space-x-2 text-gray-500 hover:text-green-500 hover:bg-green-50 px-3 py-2 rounded-full transition-all group"
                    >
                      <AiOutlineRetweet className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">{}</span>
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
        ) : (
          <p className="text-white text-center">Loading ...</p>
        )}

        
        {posts.length === 0 && isLoading ? (
          <p className="text-white text-center">Create Your Threads ...</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Home;

{/* Load More */}
  {/* {posts.length !== 0 && post_number < posts.length ? (
    <div className="text-center py-8">
      <button
        className=" text-yellow-600 px-6 py-2 rounded-full font-medium hover:bg-zinc-700 transition-colors shadow-md border border-yellow-600"
      >
        Load more posts
      </button>
    </div>
  ) : (
    ""
  )} */}
