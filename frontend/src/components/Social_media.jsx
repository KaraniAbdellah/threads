import React from "react";
import { FaShare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";


export default function SocialMedia() {
  return (
    <div>
  <button class="social_media">
      <div class="icon">
        <FaShare className="shere"/>
          <FaLinkedin className="icon-shere"/>
        <FaGithub className="icon-shere"/>
        <IoPersonCircleOutline className="icon-shere"/>
      </div>
      <p>Share me</p>
  </button>
    </div>
  );
};

// export default SocialMedia;
// import React from "react";
// import { FaLinkedin } from "react-icons/fa";
// import { BsTwitterX } from "react-icons/bs";



// const SocialMedia = () => {
//   return (
//     <div>
//       <button class="social_media">
//         <div class="icon">
//         <CiShare2 />

//           <FaLinkedin />
//           <FaGithub />
//           <IoPersonCircleOutline />
//           <BsTwitterX />
//         </div>
//         <p>Share me</p>
//       </button>
//     </div>
//   );
// };

// export default SocialMedia;
