import { useRef, useState, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";

export const progLangColors = {
  javascript: ["from-yellow-300", "via-yellow-400", "to-yellow-600"],
  python: ["from-blue-900", "via-green-400", "to-yellow-400"],
  java: ["from-red-500", "via-orange-500", "to-gray-700"],
  cpp: ["from-cyan-700", "via-blue-400", "to-gray-900"],
  csharp: ["from-violet-500", "via-indigo-600", "to-purple-800"],
  ruby: ["from-red-400", "via-pink-500", "to-red-900"],
  php: ["from-indigo-300", "via-purple-500", "to-gray-600"],
  go: ["from-cyan-300", "via-teal-400", "to-blue-600"],
  rust: ["from-orange-600", "via-amber-500", "to-black"],
  dart: ["from-blue-300", "via-teal-400", "to-cyan-700"],
  kotlin: ["from-fuchsia-500", "via-pink-600", "to-indigo-700"],
  swift: ["from-orange-300", "via-red-400", "to-yellow-500"],
  typescript: ["from-sky-500", "via-blue-600", "to-indigo-700"],
  html: ["from-red-500", "via-orange-500", "to-yellow-500"],
  css: ["from-blue-400", "via-indigo-500", "to-purple-600"],
  r: ["from-sky-600", "via-blue-700", "to-cyan-900"],
  scala: ["from-red-500", "via-orange-500", "to-black"],
  perl: ["from-purple-400", "via-indigo-600", "to-gray-700"],
  bash: ["from-lime-400", "via-green-500", "to-emerald-700"],
  lua: ["from-indigo-900", "via-sky-600", "to-blue-800"]
};

export const progLangIcons = {
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  cpp: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  csharp: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  ruby: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
  php: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  rust: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
  dart: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
  kotlin: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  swift: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  r: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
  scala: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg",
  perl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/perl/perl-original.svg",
  bash: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  lua: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg"
};

export default function DevIDCard() {
  const cardRef = useRef(null);
  const [form, setForm] = useState({
    name: "Nama Programmer",
    language: "html",
    role: "Fullstack Developer",
    tagline: "Code. Facebook. Repeat.",
    techStack: "PHP - CSS - HTML", // Changed from 'team' to 'techStack'
    profilePic: null,
    visibility: "public",
    customLogo: null,
  });

  const [idNumber, setIdNumber] = useState("");

  useEffect(() => {
    const prefix = form.language.substring(0, 2).toUpperCase();
    const randomId = prefix + Math.floor(10000 + Math.random() * 89999).toString();
    setIdNumber(randomId);
  }, [form.language]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setForm({ ...form, [name]: URL.createObjectURL(files[0]) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const handleDownload = () => {
    if (!cardRef.current) return;
    htmlToImage.toPng(cardRef.current, { pixelRatio: 5 }).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${form.name}_Dev_Card.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  const gradientClasses = progLangColors[form.language]?.join(" ") || "from-gray-300 via-gray-400 to-gray-500";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={form.language}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`min-h-screen p-6 bg-gradient-to-br ${gradientClasses}`}
      >
        <h1 className="text-xl font-bold text-white mb-4">Programmer ID Card Generator</h1>
        <div className="bg-white bg-opacity-90 p-6 rounded-xl max-w-4xl mx-auto shadow-lg border">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <select name="language" value={form.language} onChange={handleChange} className="border px-2 py-1 w-full">
                {Object.keys(progLangColors).map((lang) => (
                  <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                ))}
              </select>

              <input name="name" placeholder="Nama" onChange={handleChange} className="border px-2 py-1 w-full" />
              <input name="role" placeholder="Role" onChange={handleChange} className="border px-2 py-1 w-full" />
              <input name="techStack" placeholder="Tech Stack (e.g., PHP - CSS - HTML)" onChange={handleChange} className="border px-2 py-1 w-full" />
              <input name="tagline" placeholder="Tagline" onChange={handleChange} className="border px-2 py-1 w-full" />
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Upload Custom Foto</label>
                <input name="profilePic" type="file" accept="image/*" onChange={handleChange} className="border px-2 py-1 w-full" />
              </div>

              <select name="visibility" value={form.visibility} onChange={handleChange} className="border px-2 py-1 w-full">
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
              <button onClick={handleDownload} className="px-4 py-2 bg-blue-600 text-white rounded mt-2">Download PNG</button>
            </div>
            <div
              ref={cardRef}
              className={`rounded-lg shadow-xl text-white overflow-hidden w-[320px] h-[202px] relative bg-gradient-to-br ${gradientClasses}`}
            >
              <div className="p-2 flex items-center justify-between bg-white bg-opacity-20">
                <div className="flex items-center gap-2">
                  <img
                    src={progLangIcons[form.language]}
                    alt={`${form.language} icon`}
                    className="w-8 h-8 object-contain"
                  />
                  <h2 className="text-sm font-bold tracking-widest">DEVELOPER ID CARD</h2>
                </div>
                <span className="text-[10px] font-mono">#{idNumber}</span>
              </div>
              <div className="absolute top-14 right-1 text-[10px] px-2 font-bold text-yellow-300">
                {form.visibility.toUpperCase()}
              </div>
              <div className="flex px-3 py-2 gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-24 rounded overflow-hidden border bg-white/20">
                    {form.profilePic ? (
                      <img src={form.profilePic} alt="Foto" className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">💻</div>
                    )}
                  </div>
                  <div className="text-[7px] italic text-white/80 mt-0.5">{new Date().toLocaleDateString()}</div>
                </div>
                <div className="text-xs space-y-0.5 leading-tight">
                  <p className="font-semibold text-sm mt-1 truncate">{form.name}</p>
                  <p className="uppercase text-base font-extrabold tracking-wider">{form.language}</p>
                  <p className="text-[10px] truncate">{form.techStack}</p> 
                  <p className="text-[10px] truncate">{form.role}</p>

                  {form.tagline && <i className="text-[9px] break-words max-w-[170px] block">"{form.tagline}"</i>}
                </div>
              </div>
              <div className="absolute bottom-3 left-3 text-[6px] italic text-white/90">Valid 4 Years</div>
              <div className="absolute bottom-2 right-2">
                <QRCodeCanvas value={`${form.name} - ${idNumber}`} size={40} fgColor="#ffffff" bgColor="transparent" />
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
