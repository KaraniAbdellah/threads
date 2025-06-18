import Header from "../components/Header";
import HomeIntro from "../components/Home_Intro";
import Background from "../components/Background";
import { useState } from "react";
import Login from "../models/Login";
import Create_Account from "../models/Create_Account";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [content, setContent] = useState();


  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-hidden relative">
      <Header></Header>
      <Background></Background>
      <HomeIntro></HomeIntro>
      {showLogin ? <Login></Login> : ""}
      {showSignUp ? <Create_Account></Create_Account> : ""}
    </div>
  );
}
