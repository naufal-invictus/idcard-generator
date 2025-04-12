
import { useRef, useState, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import { QRCodeCanvas } from "qrcode.react";
import { jsPDF } from "jspdf";
import { motion, AnimatePresence } from "framer-motion";

const mbtiColors = {
  defender: "from-blue-700 via-cyan-500 to-blue-300",
  thinker: "from-purple-800 via-pink-500 to-purple-300",
  explorer: "from-yellow-600 via-orange-400 to-yellow-200",
  diplomat: "from-green-800 via-emerald-500 to-green-300",
};

const mbtiBgColors = {
  defender: ["#1e3a8a", "#06b6d4", "#93c5fd"],
  thinker: ["#6b21a8", "#ec4899", "#d8b4fe"],
  explorer: ["#ca8a04", "#fb923c", "#fef08a"],
  diplomat: ["#065f46", "#10b981", "#86efac"],
};

const mbtiTailwind = {
  defender: "bg-gradient-to-br from-blue-700 via-cyan-500 to-blue-300",
  thinker: "bg-gradient-to-br from-purple-800 via-pink-500 to-purple-300",
  explorer: "bg-gradient-to-br from-yellow-600 via-orange-400 to-yellow-200",
  diplomat: "bg-gradient-to-br from-green-800 via-emerald-500 to-green-300",
};

const mbtiPrefixes = {
  defender: "4",
  thinker: "2",
  explorer: "3",
  diplomat: "1",
};

const elementSymbols = {
  defender: "🛡️",
  thinker: "🧠",
  explorer: "🧭",
  diplomat: "🌳",
};

export default function IDCardGenerator() {
  const cardRef = useRef(null);
  
  const [form, setForm] = useState({
    name: "NAMA ANDA",
    mbti: "ISFJ",
    typology1: "XXX",
    typology2: "XXX",
    typology3: "",
    typology4: "",
    typology5: "",
    zodiac: "XXX",
    profilePic: null,
    mode: '',
    motto: "Knowledge is Power, but character is more",
  });
  const [idNumber, setIdNumber] = useState("");
  const [useDefaultPic, setUseDefaultPic] = useState(false);
  const [mode, setMode] = useState("landscape");
  const [prevCategory, setPrevCategory] = useState("diplomat");

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
      if (name === "mbti") setPrevCategory(mbtiCategory(form.mbti));
      setForm({ ...form, [name]: value });
    }
  };
  const handleDownload = () => {
    if (!cardRef.current) return;

    htmlToImage.toPng(cardRef.current, {
      pixelRatio: parseInt(downloadQuality), // dinamis
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${form.name}_MBTI_Card.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error("Gagal download:", error);
      });
  };

  const handleDownloadPDF = async () => {
    if (!cardRef.current) return;

    const dataUrl = await htmlToImage.toPng(cardRef.current, { pixelRatio: 4 });

    const pdf = new jsPDF({
      orientation: mode === "landscape" ? "landscape" : "portrait",
      unit: "px",
      format: [320 * 3, 202 * 3],
    });

    pdf.addImage(dataUrl, "PNG", 0, 0, 320 * 3, 202 * 3);
    pdf.save(`${form.name}_MBTI_Card_CMYK.pdf`);
  };

  const today = new Date().toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });



  const fullTypology = [
    form.typology1,
    form.typology2,
    form.typology3,
    form.typology4,
    form.typology5,
  ].filter(Boolean).join(" - ");

  const currentCategory = mbtiCategory(form.mbti);
  const bgColor = mbtiColors[currentCategory] || "from-gray-400 to-gray-200";
  const symbol = elementSymbols[currentCategory] || "";
  const gradientColors = mbtiBgColors[currentCategory] || ["#9ca3af", "#e5e7eb", "#f3f4f6"];

  const renderProfilePic = () => {
    if (form.profilePic && !useDefaultPic) {
      return <img src={form.profilePic} alt="Foto" className="w-full h-full object-cover object-top" />;
    }
    return <div className="w-full h-full flex items-center justify-center text-4xl">{symbol}</div>;
  };

  const cardSize = mode === "landscape" ? "w-[320px] h-[202px]" : "w-[202px] h-[320px]";
  const [downloadQuality, setDownloadQuality] = useState("3");
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: `linear-gradient(to bottom right, ${gradientColors.join(", ")})`,
        }}
        className="min-h-screen p-6 transition-colors duration-1000 font-sans"
      >
        <nav className="flex items-center justify-between text-white mb-4 font-sans">
          <h1 className="text-xl font-bold">MBTI Card Generator</h1>

        </nav>

        <div className="bg-white bg-opacity-80 p-6 rounded-xl max-w-4xl mx-auto shadow-lg border border-white font-sans">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <select
                value={downloadQuality}
                onChange={(e) => setDownloadQuality(e.target.value)}
                className="border px-2 py-1 w-full"
              >
                <option value="3">Sosmed (Low)</option>
                <option value="5">Tajam (High)</option>
              </select>
              <select
                name="visibility"
                value={form.visibility}
                onChange={handleChange}
                className="border px-2 py-1 w-full"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
              <input name="name" placeholder="Nama" onChange={handleChange} className="border px-2 py-1 w-full" />
              <select name="mbti" value={form.mbti} onChange={handleChange} className="border px-2 py-1 w-full">
                {["INFJ", "INFP", "INTJ", "INTP", "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP", "ENTJ", "ENTP"].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <input key={i} name={`typology${i}`} placeholder={`Typology ${i}`} onChange={handleChange} className="border px-2 py-1" />
                ))}
              </div>
              <input name="zodiac" placeholder="Zodiak" onChange={handleChange} className="border px-2 py-1 w-full" />
              <input name="motto" placeholder="Motto Hidup (opsional)" onChange={handleChange} className="border px-2 py-1 w-full" />
              <input name="profilePic" type="file" accept="image/*" onChange={handleChange} className="border px-2 py-1 w-full" />
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={useDefaultPic} onChange={() => setUseDefaultPic(!useDefaultPic)} />
                <span>Gunakan simbol elemen sebagai foto default</span>
              </label>
              <div className="flex gap-2 mt-4">
              <button onClick={handleDownload} className="px-4 py-2 bg-blue-600 text-white rounded">Download PNG</button>
              {/* <button onClick={handleDownloadPDF} className="px-4 py-2 bg-blue-600 text-white rounded">Download PDF</button> */}

              </div>

            </div>

            <div ref={cardRef} className={`rounded-lg shadow-xl font-sans text-white overflow-hidden ${mbtiTailwind[currentCategory]} ${cardSize} relative font-sans border-white`}>
              <div className="p-2 flex items-center justify-between bg-white bg-opacity-20">
                <div className="flex items-center gap-1">
                  <h2 className="text-sm md:text-base font-bold tracking-widest">TYPOLOGY ID</h2>
                </div>
                <span className="text-[10px] md:text-xs font-mono">#{idNumber}</span>
              </div>
              <div className="absolute top-12 right-1 text-[10px]  px-2 font-bold text-yellow-300 py-0.5 rounded-full">
                {form.visibility === "public" ? "PUBLIC" : "PRIVATE"}
              </div>

              <div className="flex px-3 py-2 gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-24 rounded overflow-hidden border bg-white/20">
                    {renderProfilePic()}
                  </div>
                  <div className="text-[7px] italic text-white/80 mt-0.5">
                    {today}
                  </div>
                </div>

                <div className="text-xs space-y-0.5 leading-tight">
                  <p className="font-semibold text-sm leading-tight mt-1 truncate">{form.name}</p>
                  <p className="uppercase text-base font-extrabold tracking-wider text-white drop-shadow-sm">{form.mbti}</p>
                  <p className="text-[10px] leading-snug truncate">{fullTypology}</p>
                  <p className="text-[10px] leading-snug truncate">{form.zodiac}</p>
                  {form.motto && <i className="text-[9px] leading-snug whitespace-pre-wrap break-words max-w-[170px] block">"{form.motto}"</i>}
                </div>
              </div>

              <div className="absolute bottom-5 left-3 text-[7px] italic text-white/90 max-w-[70%]">"Unlocking the soul through structure and typology."</div>

              <div className="absolute bottom-3 left-3 text-[6px] italic text-white/90 max-w-[70%]">Expired: {new Date(new Date().setFullYear(new Date().getFullYear() + 50)).toISOString().split('T')[0]}</div>

              <div className="absolute bottom-3 right-16 text-[6px] italic text-white/90 max-w-[70%]">#{idNumber}</div>

              <div className="absolute bottom-2 right-2">
                <QRCodeCanvas value={`${form.name} - ${idNumber}`} size={40} fgColor="#ffffff" bgColor="transparent" />
              </div>

            </div>

          </div>
        </div>
        <div className="max-w-4xl mx-auto my-10 bg-white rounded-xl shadow-lg overflow-hidden border">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="w-full h-64 md:h-auto bg-gray-100">
              <img
                src="https://i.ibb.co.com/BVcf70Rw/TYPOLOGY-ID-CARD.webp"
                alt="Contoh Produk"
                className="object-cover"
              />
            </div>

            <div className="p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Custom ID Card - Cetak Fisik</h2>
                <p className="text-sm text-gray-600 mb-2">Bahan: PVC</p>
                <p className="text-sm text-gray-600 mb-2">Ukuran: Standar Kartu Anggota</p>
                <p className="text-sm text-gray-600 mb-2">Harga: <span className="text-red-600 font-bold">Rp6.500</span></p>
                <p className="text-sm text-gray-600 mb-4">Min. Pemesanan: 1 item</p>
                <p className="text-sm text-gray-600 mb-4">Kartu ini terbuat dari bahan PVC, setebal standar member card pada umumnya. Ukurannya mengikuti standar member card, sehingga pas di dompet. Untuk ketahanan ekstra, tersedia juga opsi laminating. Ingin desain sesuai gaya pribadi atau branding komunitas? Tentu bisa, karena kami menerima custom desain. Bahkan, untuk Anda yang butuh fleksibilitas digital, kami juga menyediakan versi flashdisk card.</p>
              </div>
              <a
                href="https://wa.me/6283150645824?text=Halo%2C%20saya%20tertarik%20dengan%20kartu%20typology%20PVC-nya.%20Boleh%20saya%20custom%20desain%3F%20Berapa%20lama%20prosesnya%20dan%20apakah%20bisa%20versi%20flashdisk%3F%20Saya%20suka%20banget%20konsepnya%21
" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              >
                Beli Sekarang
              </a>
            </div>
          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  );
}