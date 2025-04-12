// ID Card Generator - React + Tailwind - Enhanced Version with QR, PDF, PNG, Auto-Crop, Extra Features
// Dependencies: html2canvas, jspdf, qrcode.react, framer-motion

import { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";

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

export default function IDCardGenerator() {
  const cardRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    mbti: "INFJ",
    birthDate: "",
    typology1: "",
    typology2: "",
    typology3: "",
    typology4: "",
    typology5: "",
    profilePic: null,
  });
  const [idNumber, setIdNumber] = useState("");
  const [useDefaultPic, setUseDefaultPic] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

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

  const downloadPDF = async () => {
    setShowPreview(true);
    setTimeout(async () => {
      const canvas = await html2canvas(cardRef.current, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [320, 480] });
      pdf.addImage(imgData, "PNG", 0, 0, 320, 480);
      pdf.save(`${form.name}_IDCard.pdf`);
      setShowPreview(false);
    }, 500);
  };

  const downloadPNG = async () => {
    setShowPreview(true);
    setTimeout(async () => {
      const canvas = await html2canvas(cardRef.current, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${form.name}_IDCard.png`;
      link.href = imgData;
      link.click();
      setShowPreview(false);
    }, 500);
  };

  const fullTypology = [
    form.typology1,
    form.typology2,
    form.typology3,
    form.typology4,
    form.typology5,
  ].filter(Boolean).join(" - ");

  const bgColor = mbtiColors[mbtiCategory(form.mbti)] || "from-gray-400 to-gray-200";
  const symbol = elementSymbols[mbtiCategory(form.mbti)] || "";

  const renderProfilePic = () => {
    if (form.profilePic && !useDefaultPic) {
      return (
        <img src={form.profilePic} alt="Foto" className="w-full h-full object-cover object-top" />
      );
    }
    return (
      <div className="w-full h-full flex items-center justify-center text-4xl">
        {symbol}
      </div>
    );
  };

  const Card = (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`w-[320px] h-[480px] rounded-2xl shadow-2xl text-white overflow-hidden bg-gradient-to-br ${bgColor} relative font-sans`}
    >
      <div className="p-3 flex items-center justify-between bg-white bg-opacity-20">
        <h2 className="text-xl font-bold tracking-widest">TYPOLOGY ID</h2>
        <span className="text-xs font-mono">#{idNumber}</span>
      </div>
      <div className="flex flex-col items-center text-center px-4 pt-4 gap-2">
        <div className="w-24 h-24 rounded-full overflow-hidden border bg-white/20">
          {renderProfilePic()}
        </div>
        <p className="font-semibold text-lg mt-1 leading-tight">{form.name}</p>
        <p className="uppercase text-2xl font-extrabold tracking-wider drop-shadow-sm">{form.mbti}</p>
        <p className="text-xs leading-snug">{fullTypology}</p>
        <p className="text-xs leading-snug">Lahir: {form.birthDate}</p>
      </div>
      <div className="absolute bottom-4 left-4 text-[10px] italic text-white/90">"Unlocking the soul through structure and typology."</div>
      <div className="absolute bottom-4 right-4">
        <QRCodeCanvas value={`${form.name} - ${idNumber}`} size={40} fgColor="#ffffff" bgColor="transparent" />
      </div>
    </motion.div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">MBTI ID Card Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <input name="name" placeholder="Nama" onChange={handleChange} className="border px-2 py-1 w-full" />
          <select name="mbti" onChange={handleChange} className="border px-2 py-1 w-full">
            {["INFJ","INFP","INTJ","INTP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP","ENTJ","ENTP"].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <input name="birthDate" type="date" onChange={handleChange} className="border px-2 py-1 w-full" />
          <div className="grid grid-cols-2 gap-2">
            {[1,2,3,4,5].map(i => (
              <input key={i} name={`typology${i}`} placeholder={`Typology ${i}`} onChange={handleChange} className="border px-2 py-1" />
            ))}
          </div>
          <input name="profilePic" type="file" accept="image/*" onChange={handleChange} className="border px-2 py-1 w-full" />
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={useDefaultPic} onChange={() => setUseDefaultPic(!useDefaultPic)} />
            <span>Gunakan simbol elemen sebagai foto default</span>
          </label>
          <div className="flex gap-2">
            <button onClick={downloadPDF} className="bg-blue-600 text-white px-4 py-2 rounded">Download PDF</button>
            <button onClick={downloadPNG} className="bg-green-600 text-white px-4 py-2 rounded">Download PNG</button>
            <button onClick={() => setShowPreview(!showPreview)} className="bg-gray-600 text-white px-4 py-2 rounded">Preview</button>
          </div>
        </div>

        {showPreview && (
          <div className="flex justify-center items-start">
            {Card}
          </div>
        )}
      </div>
    </div>
  );
}
