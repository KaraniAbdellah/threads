import Header from "../components/Header";
import HomeIntro from "../components/Home_Intro";
import Background from "../components/Background";
import { useState } from "react";
import Login from "../models/Login";
import SignUp from "../models/SignUp";
import AuthContext from "../context/AuthContext";


export default function Home() {
  const [LoginOrSignUp, setLoginOrSignUp] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-hidden relative">
      <AuthContext.Provider value={[setLoginOrSignUp]}>
        <Header></Header>
        <Background></Background>
        <HomeIntro></HomeIntro>
        {LoginOrSignUp == "login" ? <Login></Login> : ""}
        {LoginOrSignUp == "sign up" ? <SignUp></SignUp> : ""}
      </AuthContext.Provider>
    </div>
  );
}
