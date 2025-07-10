import React, { useContext, useState, useRef } from "react";
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
import profileContext from "../../context/ProfileContext";
import axios from "axios";
import toast from "react-hot-toast";


const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const profile = useContext(profileContext);
  const profileImageRef = useRef(null);
  const coverImageRef = useRef(null);
  console.log(profile);


  const [editData, setEditData] = useState({
    user_name: profile?.user.user_name,
    bio: profile?.user.bio,
    profile_image: profile?.user.profile_image,
    cover_image: profile?.user.cover_image,
  });

  // states for image uploads
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [coverImagePreview, setCoverImagePreview] = useState("");

  // Image upload function
  const uploadImage = async (file, imageType) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("imageType", imageType);
    formData.append("userId", profile.user._id);
    setIsUploading(false);
  };

  // Handle file selection
  const handleImageSelect = (e, imageType) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        if (imageType === "profile_image") {
          setProfileImagePreview(reader.result);
        } else {
          setCoverImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
      uploadImage(file, imageType);
    }
  };

  const handleEdit = async () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      const newData = {
        bio: editData.bio,
        user_name: editData.user_name,
        cover_image: coverImagePreview,
        profile_image: profileImagePreview,
      };

      // Save profile data
      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/user/update_user_profile/${
            profile.user._id
          }`,
          newData,
          { withCredentials: true }
        );
        toast.success("Profile updated successfully", {
          duration: 2000,
          position: "bottom-right",
        });
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile.user. Please try again.", {
          duration: 2000,
          position: "bottom-right",
        });
      }
    } else {
      setEditData({
        user_name: profile?.user.user_name || "",
        email: profile?.user.email || "",
        bio: profile?.user.bio || "",
        profile_image: profile?.user.profile_image || "",
        cover_image: profile?.user.cover_image || "",
      });
    }
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="rounded-sm border border-yellow-700">
      <div className="bg-zinc-900 overflow-hidden shadow-xl">
        {/* Hidden file inputs */}
        <input
          type="file"
          ref={profileImageRef}
          onChange={(e) => handleImageSelect(e, "profile_image")}
          accept="image/*"
          className="hidden"
        />
        <input
          type="file"
          ref={coverImageRef}
          onChange={(e) => handleImageSelect(e, "cover_image")}
          accept="image/*"
          className="hidden"
        />

        {/* Cover Image Section */}
        <div className="relative h-48 bg-gradient-to-r from-yellow-700 to-yellow-500">
          {(coverImagePreview || profile?.user.cover_image) && (
            <img
              src={coverImagePreview || profile.user.cover_image}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          )}
          {isEditing && (
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => coverImageRef.current?.click()}
                disabled={isUploading}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 disabled:opacity-50"
              >
                {isUploading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FiImage className="w-5 h-5" />
                )}
              </button>
              {(coverImagePreview || profile?.user.cover_image) && (
                <button
                  onClick={() => {
                    setCoverImagePreview(null);
                    setEditData((prev) => ({ ...prev, cover_image: "" }));
                  }}
                  className="bg-red-500 bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full transition-all duration-200"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p>Uploading...</p>
              </div>
            </div>
          )}
        </div>

        {/* Profile Content */}
        <div className="relative px-6 pb-6">
          {/* Profile Image */}
          <div className="relative -mt-16 mb-4">
            <div className="relative inline-block">
              <img
                src={profileImagePreview || profile?.user.profile_image}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-yellow-400 bg-zinc-700 object-cover"
              />
              {isEditing && (
                <button
                  onClick={() => profileImageRef.current?.click()}
                  disabled={isUploading}
                  className="absolute bottom-2 right-2 bg-yellow-400 hover:bg-yellow-500 text-black p-2 rounded-full transition-all duration-200 disabled:opacity-50"
                >
                  {isUploading ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <FiCamera className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Edit Button */}
          <div className="absolute top-4 right-6">
            <button
              onClick={handleEdit}
              disabled={isUploading}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
            >
              {isUploading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FiEdit2 className="w-4 h-4" />
              )}
              {isEditing ? "Save" : "Edit Profile"}
            </button>
          </div>

          {/* User Info */}
          <div className="space-y-4">
            {/* Username and Verified Badge */}
            <div className="flex items-center gap-3">
              {isEditing ? (
                <input
                  type="text"
                  value={editData.user_name}
                  onChange={(e) =>
                    handleInputChange("user_name", e.target.value)
                  }
                  className="bg-zinc-700 text-white px-3 py-2 rounded-lg border border-yellow-400 focus:border-yellow-300 focus:outline-none text-2xl font-bold"
                />
              ) : (
                <h1 className="text-2xl font-bold text-white">
                  {editData?.user_name}
                </h1>
              )}
              {profile?.user.verfied && (
                <div className="bg-yellow-400 text-black p-1 rounded-full">
                  <FiCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="text-yellow-400 font-semibold">Bio</label>
              {isEditing ? (
                <textarea
                  value={editData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="w-full bg-zinc-700 text-white px-3 py-2 rounded-lg border border-yellow-400 focus:border-yellow-300 focus:outline-none resize-none h-24"
                />
              ) : (
                <p className="text-gray-300">
                  {editData?.bio ||
                    "No bio available yet. Click edit to add one!"}
                </p>
              )}
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
      </div>
    </div>
  );
};

export default Profile;
