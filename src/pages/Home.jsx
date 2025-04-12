import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-100">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">
        Selamat Datang di ID Card Generator
      </h1>
      
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <Link to="/mbti">
          <img
            src="https://i.ibb.co.com/gbzS97zh/NAMA-ANDA-MBTI-Card-5.png"
            alt="MBTI ID Card"
            className="w-[320px] h-[203px] object-cover rounded-xl shadow-md hover:scale-105 transition"
          />
        </Link>
        <Link to="/gup">
          <img
            src="https://static.wikia.nocookie.net/logopedia/images/8/82/Girls_und_Panzer_Logo.png"
            alt="GUP ID Card"
            className="w-[320px] h-[203px] object-cover rounded-xl shadow-md hover:scale-105 transition"
          />
        </Link>
        <Link to="/pg">
          <img
            src="https://i.ibb.co.com/tMm1Wzds/Nama-Programmer-Dev-Card-3.png"
            alt="Programmer ID Card"
            className="w-[320px] h-[203px] object-cover rounded-xl shadow-md hover:scale-105 transition"
          />
        </Link>
      </div>
    </div>
  );
}
