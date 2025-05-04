import Header from '../components/Header';
import HomeIntro from '../components/Home_Intro';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header></Header>
      <HomeIntro></HomeIntro>
    </div>
  );
}