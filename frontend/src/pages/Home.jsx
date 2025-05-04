import Header from '../components/Header';
import HomeIntro from '../components/Home_Intro';
import Background from '../components/Background';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header></Header>
      <Background></Background>
      <HomeIntro></HomeIntro>
      
    </div>
  );
}