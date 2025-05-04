import React from "react";
import { FaShare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";

export default function SocialMedia() {
  return (
    <div>
      <button class="social_media z-10 px-4 py-2 border border-sky-600 rounded hover:bg-sky-800" >
        <div class="icon">
          <FaShare className="shere" />
          <FaLinkedin className="icon-shere" />
          <FaGithub className="icon-shere" />
          <IoPersonCircleOutline className="icon-shere" />
        </div>
        <p className="ml-8">Share me</p>
      </button>
    </div>
  );
}
