import React, { useContext, useState, useEffect } from "react";
import {
  HiOutlinePhotograph,
  HiOutlineVideoCamera,
  HiOutlineEmojiHappy,
  HiOutlineLocationMarker,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import { IoShareOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";
import userContext from "../../context/UserContext";
import SelectUserProfileContext from "../../context/SelectUserProfileContext";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import formatTimeAgo from "../../utlis_functions/formatTimeAgo";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineRetweet,
} from "react-icons/ai";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const user = useContext(userContext);
  const [isLoading, setIsLoading] = useState(true);
  const [post_number, setPost_Number] = useState(4);
  const [comment_number, setCommentNumber] = useState(4);
  const [postToShow, setPostToShow] = useState(null);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [select_user_profile_state, setSelect_user_profile_state] = useContext(
    SelectUserProfileContext
  );

  const [postToPost, setPostToPost] = useState({
    user: "",
    post_text: "",
    post_image: "",
    post_likes: [],
    post_comments: [{ text: "", user: "" }],
    post_date: null,
  });
  const [IsEditPost, setIsEditPost] = useState(false);

  const createThisPost = async (postToSend) => {
    setIsLoadingPost(() => true);
    try {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/api/post/create`, postToSend, {
          withCredentials: true,
        })
        .then((res) => {
          setPostToPost({
            user: "",
            post_text: "",
            post_image: "",
            post_likes: [],
            post_comments: [{ text: "", user: "" }],
            post_date: null,
          });
          toast.success("Post Added Successfully", {
            duration: 2000,
            position: "bottom-right",
          });
          GetAllPosts(); // Refresh posts after creating
        })
        .finally(() => setIsLoadingPost(() => false))
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

  const EditThisPost = async (postToSend) => {
    setIsLoadingPost(() => true);
    try {
      await axios
        .put(
          `${import.meta.env.VITE_API_URL}/api/post/update/${IsEditPost._id}`,
          postToSend,
          { withCredentials: true }
        )
        .then((res) => {
          setPostToPost({
            user: "",
            post_text: "",
            post_image: "",
            post_likes: [],
            post_comments: [{ text: "", user: "" }],
            post_date: null,
          });
          GetAllPosts();
        })
        .finally(() => setIsLoadingPost(() => false))
        .catch((err) => {
          console.log(err);
          toast.error("Failed Updating Post", {
            duration: 2000,
            position: "bottom-right",
          });
        });
    } catch (error) {
      console.log(error);
      toast.error("Failed Updating Post", {
        duration: 2000,
        position: "bottom-right",
      });
    }
  };

  const handlePost = async () => {
    const postToSend = {
      ...postToPost,
      post_date: new Date(),
      user: user._id,
    };
    if (IsEditPost) {
      console.log("Must Edit This Post ", IsEditPost);
      EditThisPost(postToSend);
    } else {
      createThisPost(postToSend);
    }
  };

  const selectImage = () => {
    console.log("Select Your Image");
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
        .finally(() => setIsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  const EditPost = (post) => {
    setPostToShow(null);
    window.scroll(0, 0);
    setIsEditPost(post);
    setPostToPost(post);
  };

  const DeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/post/delete/${postId}`,
          {
            withCredentials: true,
          }
        );

        // Frontend update for now
        setPosts(posts.filter((post) => post._id !== postId));
        setPostToShow(null);

        toast.success("Post Deleted Successfully", {
          duration: 2000,
          position: "bottom-right",
        });
      } catch (error) {
        toast.error("Failed to Delete Post", {
          duration: 2000,
          position: "bottom-right",
        });
      }
    }
  };

  const LikePost = async (post) => {
    try {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/api/user/like_post/${post._id}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          GetAllPosts();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong, please try again", {
            duration: 2000,
            position: "bottom-right",
          });
        });
    } catch (error) {
      toast.error("Something went wrong, please try again", {
        duration: 2000,
        position: "bottom-right",
      });
    }
  };

  const UnLikePost = async (post) => {
    try {
      await axios
        .get(
          `${import.meta.env.VITE_API_URL}/api/user/unlike_post/${post._id}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          GetAllPosts();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong, please try again", {
            duration: 2000,
            position: "bottom-right",
          });
        });
    } catch (error) {
      toast.error("Something went wrong, please try again", {
        duration: 2000,
        position: "bottom-right",
      });
    }
  };

  const CommentPost = async (e, post) => {
    e.preventDefault();
    e.target.querySelector("textarea").value = "";
    try {
      await axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/user/comment_post/${post._id}`,
          { commentText: commentText },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          GetAllPosts();
          setCommentText(() => "");
        })
        .catch((err) => {
          toast.error("Something went wrong, please try again", {
            duration: 2000,
            position: "bottom-right",
          });
        });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again", {
        duration: 2000,
        position: "bottom-right",
      });
    }
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

  const ShowCommentSection = (post) => {
    setCommentNumber(4);
    const post_to_comment = document.getElementById(`${post._id}`);
    const comments_section = post_to_comment.querySelector(".comments_section");
    if (comments_section) {
      if (comments_section.classList.contains("hidden")) {
        comments_section.classList.add("block");
        comments_section.classList.remove("hidden");
      } else {
        comments_section.classList.add("hidden");
        comments_section.classList.remove("block");
      }
    }
  };

  const SelectUserProfile = (selected_user) => {
    if (selected_user) {
      setSelect_user_profile_state(() => selected_user);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const postElement = document.getElementById(`${postToShow}`);
      if (!(postElement && postElement.contains(e.target))) {
        setPostToShow(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [postToShow]);

  useEffect(() => {
    GetAllPosts();
    return () => {};
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setPost_Number((prev) => prev + 4);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="">
      <div className="pt-4">
        {/* Create Post Section */}
        <div
          data-aos="flip-left"
          className="bg-zinc-900 rounded-sm shadow-lg border border-yellow-700 p-4 mb-6 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-start space-x-4">
            {user?.profile_image ? (
              <div className="relative">
                <img
                  onClick={() => SelectUserProfile(user?._id)}
                  src={user?.profile_image}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100 cursor-pointer"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
            ) : (
              ""
            )}

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
              {postToPost.post_image ? (
                <div
                  className="image_show scroll-m-60 overflow-auto overflow-y-auto [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-yellow-100
                        [&::-webkit-scrollbar-thumb]:bg-yellow-300
                        dark:[&::-webkit-scrollbar-track]:bg-zinc-800
                        w-full h-[300px] rounded-md flex justify-center items-center"
                >
                  <img src={postToPost.post_image} alt="" />
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
                    value={postToPost?.profile_image}
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPostToPost({
                          ...postToPost,
                          post_image: reader.result, // this is a valid base64 string
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
                  disabled={postToPost.post_text.length < 2}
                  className="bg-gradient-to-r bg-yellow-700 hover:bg-yellow-600 text-white px-8 py-2.5 rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {!isLoadingPost
                    ? IsEditPost
                      ? "Edit"
                      : "Post"
                    : "Processing ..."}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        {posts.length !== 0 ? (
          posts.length !== 0 && !isLoading ? (
            <div className="space-y-2" data-aos="fade-up">
              {posts.slice(0, post_number).map((post) => (
                <div
                  key={post._id}
                  id={post._id}
                  className="bg-zinc-900 rounded-md shadow-lg border border-yellow-700 hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-4">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start space-x-3">
                        <img
                          onClick={() => SelectUserProfile(post?.user?._id)}
                          src={post.user?.profile_image}
                          alt={post.user?.user_name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 cursor-pointer"
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
                            @{post?.user?.user_name.split(" ")[0]} ·{" "}
                            {formatTimeAgo(post.post_date)}
                          </p>
                        </div>
                      </div>
                      {user._id === post.user?._id ? (
                        <div className="relative">
                          <button
                            onClick={() => setPostToShow(post._id)}
                            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
                          >
                            <BsThreeDotsVertical className="w-4 h-4" />
                          </button>
                          {post._id === postToShow && (
                            <div className="post_action_menu absolute top-0 right-0 bg-zinc-900 p-1 rounded-sm border z-10">
                              <button
                                onClick={() => EditPost(post)}
                                className="flex items-center w-full gap-1 px-3 py-1 text-white rounded hover:bg-zinc-800"
                              >
                                <FaEdit /> Edit
                              </button>
                              <button
                                onClick={() => DeletePost(post._id)}
                                className="flex items-center w-full gap-1 px-3 py-1 text-white rounded hover:bg-zinc-800"
                              >
                                <FaTrash /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    {/* Post Content */}
                    <div className="mb-2">
                      <p className="text-white text-lg leading-relaxed">
                        {post.post_text}
                      </p>
                    </div>

                    {post.post_image && (
                      <div className="border rounded-md w-full h-full mb-4">
                        <img
                          className="h-full w-full object-cover"
                          src={post.post_image}
                          alt=""
                        />
                      </div>
                    )}

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      {post.post_likes.find(
                        (id) => id.toString() === user._id.toString()
                      ) ? (
                        <button
                          onClick={() => UnLikePost(post)}
                          className="flex items-center space-x-2 text-gray-500 hover:text-red-500 hover:bg-red-50 px-3 py-2 rounded-full transition-all group"
                        >
                          <FaHeart className="w-5 h-5 text-red-700 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-medium">
                            {post.post_likes?.length || 0}
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={() => LikePost(post)}
                          className="flex items-center space-x-2 text-gray-500 hover:text-red-500 hover:bg-red-50 px-3 py-2 rounded-full transition-all group"
                        >
                          <AiOutlineHeart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-medium">
                            {post.post_likes?.length || 0}
                          </span>
                        </button>
                      )}

                      <button
                        onClick={() => ShowCommentSection(post)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 px-3 py-2 rounded-full transition-all group"
                      >
                        <AiOutlineComment className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">
                          {post.post_comments?.length || 0}
                        </span>
                      </button>

                      <button
                        onClick={NotBuildYet}
                        className="flex items-center space-x-2 text-gray-500 hover:text-green-500 hover:bg-green-50 px-3 py-2 rounded-full transition-all group"
                      >
                        <AiOutlineRetweet className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">0</span>
                      </button>

                      <button
                        onClick={NotBuildYet}
                        className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 hover:bg-purple-50 px-3 py-2 rounded-full transition-all group"
                      >
                        <IoShareOutline className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <div className="comments_section hidden">
                    <form
                      onSubmit={(e) => CommentPost(e, post)}
                      className="create_comment px-4 flex-col justify-end items-end"
                    >
                      <textarea
                        className="w-full bg-zinc-800 border-none outline-none p-2 rounded-md text-white border resize-none"
                        placeholder="Write your comment"
                        onChange={(e) => setCommentText(e.target.value)}
                        rows={2}
                        required
                      />
                      <button className="mt-2 text-right px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
                        Submit
                      </button>
                    </form>
                    <div className="all_comments justify-start flex-col items-start m-4">
                      {post?.post_comments?.length !== 0 ? (
                        post.post_comments
                          .slice(0, comment_number)
                          .map((comment) => {
                            return (
                              <div
                                key={comment?._id}
                                className="p-1 flex justify-start items-center my-1 bg-zinc-800 text-white w-full rounded-sm
                             "
                              >
                                <img
                                  onClick={() =>
                                    SelectUserProfile(comment?.user._id)
                                  }
                                  className="w-10 h-10 border mr-4 rounded-full cursor-pointer"
                                  src={comment?.user?.profile_image}
                                />
                                <div>
                                  <p className="text-yellow-400 font-semibold text-sm">
                                    {comment?.user?.user_name}
                                  </p>
                                  <p className="text-white">{comment.text}</p>
                                </div>
                              </div>
                            );
                          })
                      ) : (
                        <p className="text-yellow-600 text-center">
                          No Comment Found
                        </p>
                      )}
                      {comment_number < post.post_comments.length ? (
                        <button
                          onClick={() =>
                            setCommentNumber(() => comment_number + 4)
                          }
                          className="text-yellow-600 mt-2 text-center flex m-auto"
                        >
                          Load more Comment
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white text-center">Loading ...</p>
          )
        ) : (
          ""
        )}

        {posts.length === 0 && !isLoading && (
          <p className="text-white text-center">Create Your Thread ...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
