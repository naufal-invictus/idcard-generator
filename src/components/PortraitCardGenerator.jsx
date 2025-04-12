import { useState } from "react";
import IDCardGenerator from "./IDCardGenerator";
import PortraitCardGenerator from "./PortraitCardGenerator";

export default function App() {
  const [orientation, setOrientation] = useState(null);

  if (orientation === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-800 text-white text-center p-6">
        <div className="max-w-xl space-y-6 bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl">
          <h1 className="text-4xl font-bold">Selamat Datang di MBTI ID Card Generator</h1>
          <p className="text-lg">Pilih mode kartu identitas yang ingin kamu buat:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setOrientation("landscape")}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-semibold shadow"
            >
              🌄 Landscape Mode
              <p className="text-sm font-normal">Kartu ID mendatar (ideal untuk kartu nama atau badge)</p>
            </button>
            <button
              onClick={() => setOrientation("portrait")}
              className="bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg font-semibold shadow"
            >
              📱 Portrait Mode
              <p className="text-sm font-normal">Kartu ID berdiri (ideal untuk dokumen resmi atau tag profil)</p>
            </button>
          </div>
          <p className="text-sm text-white/70 italic">* Kamu bisa download kartu ini dalam bentuk PNG atau PDF sesuai orientasi yang dipilih</p>
        </div>
      </div>
    );
  }

  return orientation === "landscape" ? <IDCardGenerator /> : <PortraitCardGenerator />;
}
