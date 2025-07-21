import SelectUserProfileContext from "../../context/SelectUserProfileContext";
import React, { useContext, useState, useEffect } from "react";
import {
  FiEdit2,
  FiCalendar,
  FiUsers,
  FiUserPlus,
  FiCheck,
  FiCamera,
  FiImage,
  FiX,
} from "react-icons/fi";
import { SiGoogledocs } from "react-icons/si";
import { FaHeart, FaArrowLeft } from "react-icons/fa";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineRetweet,
} from "react-icons/ai";
import { IoShareOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../pages/Loading";
import userContext from "../../context/UserContext";
import AOS from "aos";
import "aos/dist/aos.css";
import spaceContext from "../../context/SpaceContext";
import showSlideContext from "../../context/showSlideContext";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [select_user_profile_state, setSelect_user_profile_state] = useContext(
    SelectUserProfileContext
  );
  const [show_slide, setShowSlide] = useContext(showSlideContext);

  const [main_state, setMain_State] = useContext(spaceContext);
  const [posts, setPosts] = useState([]);
  const user = useContext(userContext);
  const [isLoading, setIsLoading] = useState(true);
  const [post_number, setPost_Number] = useState(4);
  const [comment_number, setCommentNumber] = useState(4);
  const [postToShow, setPostToShow] = useState(null);
  const [follow_state, setFollowState] = useState("Follow/UnFollow");

  const [commentText, setCommentText] = useState("");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getUserSelectDate = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/user/profile/${select_user_profile_state}`,
        { withCredentials: true }
      );
      
      setProfile(res.data);
      // Set posts from the profile data
      setPosts(res.data.posts || []);
      setIsLoading(false);
    } catch (error) {
      
      setIsLoading(false);
    }
  };

  async function getProfileInfo() {
    try {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/api/user/profile/${user._id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setProfile(() => res.data);
        })
        .catch((err) => {})
        .finally(() => setIsLoading(() => true));
    } catch (error) {
      
    }
  }

  const FollowUnFollow = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/user/follow_unfollow/${select_user_profile_state}`,
        {
          withCredentials: true,
        }
      );
      getUserSelectDate();
    } catch (error) {
      
    }
  };

  const LikePost = async (post) => {
    try {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/api/user/like_post/${post._id}`, {
          withCredentials: true,
        })
        .then((res) => {
          
          // Refresh the profile data to get updated posts
          getUserSelectDate();
        })
        .catch((err) => {
          
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
          
          // Refresh the profile data to get updated posts
          getUserSelectDate();
        })
        .catch((err) => {
          
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
          
          // Refresh the profile data to get updated posts
          getUserSelectDate();
          setCommentText(() => "");
        })
        .catch((err) => {
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

  const GoBack = () => {
    setMain_State((prev) => prev);
    setSelect_user_profile_state(null);
  };

  useEffect(() => {
    if (select_user_profile_state) {
      getUserSelectDate();
    }
  }, []);

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

  if (isLoading || !profile) {
    return <Loading></Loading>;
  }

  return (
    <div
      className={`${
        show_slide
          ? "ml-[6%] lg:ml-[20%] lg:mr-[25%]"
          : "ml-[10%] lg:ml-[6%] lg:mr-[25%] "
      }  min-h-screen bg-gradient-to-br p-4 pl-6 lg:px-4 lg:pt-4 border-zinc-700 pb-4`}
      // className="rounded-sm border-x border-zinc-700 bg-zinc-800 w-[55%] min-h-screen bg-gradient-to-br px-4 pt-4 border-r border-l pb-4"
    >
      <h3 className="text-2xl font-bold text-yellow-500 mb-2 rounded-b-md">
        {profile?.user?.user_name} Profile
      </h3>
      <p className="text-white mb-4">Welcome {user?.user_name} to my profile</p>
      <div className="space-y-2" data-aos="fade-up"></div>
      <div className="bg-zinc-900 overflow-hidden shadow-xl">
        {/* Cover Image Section */}
        <div className="relative h-48 bg-gradient-to-r from-yellow-700 to-yellow-500">
          <div
            onClick={GoBack}
            className="absolute cursor-pointer border border-zinc-00 p-3 rounded-full left-1 top-1 hover:bg-gray-200"
          >
            <FaArrowLeft className="text-yellow-600"></FaArrowLeft>
          </div>
          {profile?.user.cover_image && (
            <img
              src={profile.user.cover_image}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Profile Content */}
        <div className="relative px-6 pb-6">
          {/* Profile Image */}
          <div className="relative -mt-16 mb-4">
            <div className="relative inline-block">
              <img
                src={profile?.user.profile_image}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-yellow-400 bg-zinc-700 object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">
                {profile?.user.user_name}
              </h1>
              {profile?.user.verfied && (
                <div className="bg-yellow-400 text-black p-1 rounded-full">
                  <FiCheck className="w-4 h-4" />
                </div>
              )}
              {select_user_profile_state !== user._id ? (
                <button
                  onClick={() => FollowUnFollow()}
                  className="ml-4 px-4 py-1 text-sm bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition"
                >
                  {Number(profile.user.followers.length)
                    ? "UnFollow"
                    : "Follow"}
                </button>
              ) : (
                ""
              )}
            </div>

            <div className="space-y-2">
              <label className="text-yellow-400 font-semibold">Bio</label>
              <p className="text-gray-300">
                {profile?.user.bio || "No bio available yet."}
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-8 py-4">
              <div className="flex items-center gap-2">
                <FiUsers className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">
                  {profile?.user.followers?.length || 0}
                </span>
                <span className="text-gray-400">Followers</span>
              </div>
              <div className="flex items-center gap-2">
                <FiUserPlus className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">
                  {profile?.user.following?.length || 0}
                </span>
                <span className="text-gray-400">Following</span>
              </div>
              <div className="flex items-center gap-2">
                <SiGoogledocs className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">
                  {profile?.posts?.length || 0}
                </span>
                <span className="text-gray-400">Posts</span>
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FiCalendar className="w-4 h-4 text-yellow-400" />
                <span>Joined {formatDate(profile?.user.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiEdit2 className="w-4 h-4 text-yellow-400" />
                <span>Last updated {formatDate(profile?.user.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <h3 className="px-6 pb-6 text-yellow-400 font-semibold">Posts</h3>
        <div>
          <div className="space-y-2 px-6 pb-6">
            {posts.slice(0, post_number).map((post) => (
              <div
                data-aos="fade-up"
                key={post._id}
                id={post._id}
                className="bg-zinc-900 shadow-lg border border-yellow-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="p-4">
                  {/* Post Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 mb-2">
                      <img
                        src={profile?.user?.profile_image}
                        alt={profile?.user?.user_name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-yellow-600">
                            {profile?.user?.user_name}
                          </h3>
                          {profile?.user?.verfied && (
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
                          @{profile?.user?.user_name.split(" ")[0]} ·{" "}
                          {formatDate(post.post_date)}
                        </p>
                      </div>
                    </div>
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

                {/* Comments Section */}
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
                    {post.post_comments.length !== 0 ? (
                      post.post_comments
                        .slice(0, comment_number)
                        .map((comment, index) => {
                          return (
                            <div
                              key={index}
                              className="p-1 flex justify-start items-center my-1 bg-zinc-800 text-white w-full"
                            >
                              <img
                                className="w-10 h-10 border mr-4 rounded-full cursor-pointer"
                                src={comment.user.profile_image}
                                alt={comment.user.user_name}
                              />
                              <div>
                                <p className="text-yellow-400 font-semibold text-sm">
                                  {comment.user.user_name}
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
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
