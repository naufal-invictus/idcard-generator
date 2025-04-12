import { useRef, useState, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import { QRCodeCanvas } from "qrcode.react";
import { saveAs } from "file-saver";

const mbtiColors = {
  defender: "from-blue-700 via-cyan-500 to-blue-300",
  thinker: "from-purple-800 via-pink-500 to-purple-300",
  explorer: "from-yellow-600 via-orange-400 to-yellow-200",
  diplomat: "from-green-800 via-emerald-500 to-green-300",
};

const mbtiPrefixes = {
  defender: "4",
  thinker: "2",
  explorer: "3",
  diplomat: "1",
};

const elementSymbols = {
  defender: "⚡",
  thinker: "🌟",
  explorer: "🌌",
  diplomat: "💧",
};

export default function PortraitCardGenerator() {
  const cardRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    mbti: "INFJ",
    birthDate: "",
    hobby: "",
    location: "",
    motto: "",
    profilePic: null,
  });
  const [idNumber, setIdNumber] = useState("");
  const [useDefaultPic, setUseDefaultPic] = useState(false);

  const mbtiCategory = (mbti) => {
    const type = mbti.toUpperCase();
    if (["ISFJ", "ISTJ", "ESFJ", "ESTJ"].includes(type)) return "defender";
    if (["INTJ", "INTP", "ENTJ", "ENTP"].includes(type)) return "thinker";
    if (["ISTP", "ISFP", "ESTP", "ESFP"].includes(type)) return "explorer";
    if (["INFJ", "INFP", "ENFJ", "ENFP"].includes(type)) return "diplomat";
    return "";
  };

  useEffect(() => {
    const prefix = mbtiPrefixes[mbtiCategory(form.mbti)] || "0";
    const randomId = prefix + Math.floor(10000 + Math.random() * 89999).toString();
    setIdNumber(randomId);
  }, [form.mbti]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      if (files[0]) {
        setForm({ ...form, [name]: URL.createObjectURL(files[0]) });
        setUseDefaultPic(false);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const downloadPNG = async () => {
    if (!cardRef.current) return;
    const dataUrl = await htmlToImage.toPng(cardRef.current, { cacheBust: true });
    saveAs(dataUrl, `${form.name}_PortraitCard.png`);
  };

  const bgColor = mbtiColors[mbtiCategory(form.mbti)] || "from-gray-400 to-gray-200";
  const symbol = elementSymbols[mbtiCategory(form.mbti)] || "";

  const renderProfilePic = () => {
    if (form.profilePic && !useDefaultPic) {
      return (
        <img src={form.profilePic} alt="Foto" className="w-full h-full object-cover object-top" />
      );
    }
    return (
      <div className="w-full h-full flex items-center justify-center text-5xl">
        {symbol}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">MBTI Portrait Card Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <input name="name" placeholder="Nama" onChange={handleChange} className="border px-2 py-1 w-full" />
          <select name="mbti" onChange={handleChange} className="border px-2 py-1 w-full">
            {["INFJ","INFP","INTJ","INTP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP","ENTJ","ENTP"].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <input name="birthDate" type="date" onChange={handleChange} className="border px-2 py-1 w-full" />
          <input name="hobby" placeholder="Hobi" onChange={handleChange} className="border px-2 py-1 w-full" />
          <input name="location" placeholder="Domisili" onChange={handleChange} className="border px-2 py-1 w-full" />
          <input name="motto" placeholder="Motto Hidup" onChange={handleChange} className="border px-2 py-1 w-full" />
          <input name="profilePic" type="file" accept="image/*" onChange={handleChange} className="border px-2 py-1 w-full" />
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={useDefaultPic} onChange={() => setUseDefaultPic(!useDefaultPic)} />
            <span>Gunakan simbol elemen sebagai foto default</span>
          </label>
          <button onClick={downloadPNG} className="bg-green-600 text-white px-4 py-2 rounded">Download PNG</button>
        </div>

        <div ref={cardRef} className={`w-[220px] h-[340px] rounded-xl shadow-xl text-white overflow-hidden bg-gradient-to-br ${bgColor} relative font-sans`}>
          <div className="p-2 flex items-center justify-between bg-white bg-opacity-20">
            <h2 className="text-base font-bold tracking-widest">TYPOLOGY ID</h2>
            <span className="text-xs font-mono">#{idNumber}</span>
          </div>
          <div className="flex flex-col items-center px-3 py-2 gap-3">
            <div className="w-24 h-28 rounded overflow-hidden border bg-white/20">
              {renderProfilePic()}
            </div>
            <div className="text-sm space-y-1 text-center">
              <p className="font-semibold text-base leading-tight">{form.name}</p>
              <p className="uppercase text-lg font-extrabold tracking-wider text-white drop-shadow-sm">{form.mbti}</p>
              <p className="text-xs leading-snug">Lahir: {form.birthDate}</p>
              <p className="text-xs leading-snug">Hobi: {form.hobby}</p>
              <p className="text-xs leading-snug">Domisili: {form.location}</p>
              <p className="text-[10px] italic mt-1">"{form.motto}"</p>
            </div>
          </div>
          <div className="absolute bottom-2 right-2">
            <QRCodeCanvas value={`${form.name} - ${idNumber}`} size={36} fgColor="#ffffff" bgColor="transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
