import React from "react";
import { FaShare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";

export default function SocialMedia() {
  return (
    <div>
      <button class="social_media z-10 px-4 py-2 border border-yellow-600 rounded hover:bg-yellow-800">
        <div class="icon">
          <a href="/">
            <FaShare className="shere" />
          </a>
          <a href="https://www.linkedin.com/in/abdellah-karani-965928294/" target="_blank">
            <FaLinkedin className="icon-shere" />
          </a>
          <a href="https://github.com/KaraniAbdellah" target="_blank">
            <FaGithub className="icon-shere" />
          </a>
          <a href="https://abdellahkarani.vercel.app/" target="_blank">
            <IoPersonCircleOutline className="icon-shere" />
          </a>
        </div>
        <p className="ml-8">Share me</p>
      </button>
    </div>
  );
}
