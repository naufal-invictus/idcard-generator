
import { useRef, useState, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import { QRCodeCanvas } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";

export const gupColors = {
    oarai: "from-blue-500 via-blue-400 to-blue-500",
    kuromorimine: "from-gray-900 via-gray-800 to-gray-500",
    pravda: "from-red-900 via-rose-600 to-rose-300",
    st_gloriana: "from-pink-900 via-rose-500 to-amber-200",
    anzio: "from-green-900 via-green-500 to-lime-300",
    jatkosota: "from-sky-300 via-sky-600 to-blue-300",
    chihatan: "from-orange-900 via-yellow-500 to-yellow-300",
    saunders: "from-blue-900 via-sky-500 to-indigo-300",
    bc_freedom: "from-blue-600 to-red-500",
    koala_forest: "from-green-800 via-green-900 to-lime-800",

};

export const gupSymbols = {
    oarai: "🐟",
    kuromorimine: "⚔️",
    pravda: "🌨️",
    st_gloriana: "🍵",
    anzio: "🍝",
    chihatan: "⛩️",
    saunders: "🎯",
    bc_freedom: "🎆",
    koala_forest: "🐨",
    jatkosota: "❄️",
};

export const gupPrefixes = {
    oarai: "OA",
    kuromorimine: "KM",
    pravda: "PR",
    st_gloriana: "SG",
    anzio: "AZ",
    chihatan: "CH",
    saunders: "SA",
    bc_freedom: "BC",
    koala_forest: "KF",
    jatkosota: "JT",
};

export const gupBgColors = {
    oarai: ["#ca8a04", "#fde047", "#fef9c3"],
    kuromorimine: ["#000000", "#4b5563", "#7f1d1d"],
    pravda: ["#991b1b", "#ef4444", "#fecaca"],
    st_gloriana: ["#9d174d", "#ec4899", "#fbcfe8"],
    anzio: ["#065f46", "#84cc16", "#d9f99d"],
    chihatan: ["#1e3a8a", "#4f46e5", "#c7d2fe"],
    saunders: ["#1e40af", "#3b82f6", "#93c5fd"],
    bc_freedom: ["#6b21a8", "#a855f7", "#d8b4fe"],
    koala_forest: ["#365314", "#84cc16", "#bef264"],
    jatkosota: ["#0f766e", "#14b8a6", "#5eead4"],
};

export const gupLogos = {
    anzio: "https://i.ibb.co.com/8LgRH5gL/GUP-Anzio-Small-860.webp",
    saunders: "https://i.ibb.co.com/q3kZnTpm/GUP-Saunders-Small-7264.webp",
    bc_freedom: "https://i.ibb.co.com/8gG0Cq43/BC-Freedom.webp",
    jatkosota: "https://i.ibb.co.com/ycQXH51j/Jaktosoka.webp",
    kuromorimine: "https://i.ibb.co.com/nNMytgxj/GUP-Kuromorimine-Small-5224.webp",
    pravda: "https://i.ibb.co.com/G49Sqg7v/GUP-Pravda-Small-3053.webp",
    oarai: "https://i.ibb.co.com/wN9RcDDf/GUP-Ooarai-Small-9335.webp",
    st_gloriana: "https://i.ibb.co.com/4RDSN5YT/GUP-St-Gloriana-Small-124.webp",
    chihatan: "https://i.ibb.co.com/LzWFR2Tz/Ap2-C12x122-Ctransparent-t-u1.webp",
    koala_forest: "https://i.ibb.co.com/209jCTXr/KoalaHD.webp",
};

export default function GUPIDCardGenerator() {
    const cardRef = useRef(null);
    const [form, setForm] = useState({
        name: "NAMA KARAKTER",
        school: "oarai",
        role: "Gunner",
        motto: "Panzer vor!",
        tank: "T34",
        bio2: "",
        profilePic: null,
        visibility: "public",
    });
    const [useDefaultPic, setUseDefaultPic] = useState(false);
    const [idNumber, setIdNumber] = useState("");
    const [downloadQuality, setDownloadQuality] = useState("3");

    useEffect(() => {
        const prefix = gupPrefixes[form.school] || "XX";
        const randomId = prefix + Math.floor(10000 + Math.random() * 89999).toString();
        setIdNumber(randomId);
    }, [form.school]);

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

    const handleDownload = () => {
        if (!cardRef.current) return;
        htmlToImage.toPng(cardRef.current, {
            pixelRatio: parseInt(downloadQuality),
        })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = `${form.name}_GUP_Card.png`;
                link.href = dataUrl;
                link.click();
            })
            .catch((error) => {
                console.error("Gagal download:", error);
            });
    };

    const today = new Date().toLocaleDateString('id-ID', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    });
    const expiredDate = new Date(new Date().setFullYear(new Date().getFullYear() + 4)).toISOString().split('T')[0];

    const bgColor = gupColors[form.school] || "from-gray-400 to-gray-200";
    const gradientColors = gupBgColors[form.school] || ["#9ca3af", "#e5e7eb", "#f3f4f6"];
    const symbol = gupSymbols[form.school] || "🎖️";

    const renderProfilePic = () => {
        if (form.profilePic && !useDefaultPic) {
            return <img src={form.profilePic} alt="Foto" className="w-full h-full object-cover object-top" />;
        }
        return <div className="w-full h-full flex items-center justify-center text-4xl">{symbol}</div>;
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={form.school}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ background: `linear-gradient(to bottom right, ${gradientColors.join(", ")})` }}
                className="min-h-screen p-6 transition-colors duration-1000 font-sans"
            >
                <h1 className="text-xl font-bold text-white mb-4">GUP ID Card Generator</h1>
                <div className="bg-white bg-opacity-80 p-6 rounded-xl max-w-4xl mx-auto shadow-lg border">
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
                            <select name="school" value={form.school} onChange={handleChange} className="border px-2 py-1 w-full">
                                {Object.keys(gupColors).map((school) => (
                                    <option key={school} value={school}>{school.replace(/_/g, " ").toUpperCase()}</option>
                                ))}
                            </select>

                            <input name="tank" placeholder="Tank" onChange={handleChange} className="border px-2 py-1 w-full" />
                            <input name="role" placeholder="Role" onChange={handleChange} className="border px-2 py-1 w-full" />
                            <input name="bio2" placeholder="Team" onChange={handleChange} className="border px-2 py-1 w-full" />
                            <input name="motto" placeholder="Motto" onChange={handleChange} className="border px-2 py-1 w-full" />
                            <input name="profilePic" type="file" accept="image/*" onChange={handleChange} className="border px-2 py-1 w-full" />
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" checked={useDefaultPic} onChange={() => setUseDefaultPic(!useDefaultPic)} />
                                <span>Gunakan simbol elemen sebagai foto default</span>
                            </label>
                            <button onClick={handleDownload} className="px-4 py-2 bg-blue-600 text-white rounded mt-2">Download PNG</button>
                        </div>
                        <div ref={cardRef} className={`rounded-lg shadow-xl text-white overflow-hidden bg-gradient-to-br ${bgColor} w-[320px] h-[202px] relative`}>
                            <div className="p-2 flex items-center justify-between bg-white bg-opacity-20">
                                <img src={gupLogos[form.school]} alt="logo sekolah" className="w-6 h-6 mr-2" />

                                <h2 className="text-sm font-bold tracking-widest">GUP ID CARD</h2>
                                <span className="text-[10px] font-mono">#{idNumber}</span>
                            </div>
                            <div className="absolute top-12 right-1 text-[10px] px-2 font-bold text-yellow-300">
                                {form.visibility.toUpperCase()}
                            </div>
                            <div className="flex px-3 py-2 gap-3">
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-24 rounded overflow-hidden border bg-white/20">
                                        {renderProfilePic()}
                                    </div>
                                    <div className="text-[7px] italic text-white/80 mt-0.5">{today}</div>
                                </div>
                                <div className="text-xs space-y-0.5 leading-tight">
                                    <p className="font-semibold text-sm mt-1 truncate">{form.name}</p>
                                    <p className="uppercase text-base font-extrabold tracking-wider">
  {form.school.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
</p>                                    <p className="text-[10px] truncate">{form.tank}</p>
                                    <p className="text-[10px] truncate">{form.role}</p>
                                    <p className="text-[10px] truncate">{form.bio2}</p>
                                    {form.motto && <i className="text-[9px] break-words max-w-[170px] block">"{form.motto}"</i>}
                                </div>
                            </div>
                            <div className="absolute bottom-5 left-3 text-[7px] italic text-white/90">Panzer vor!</div>
                            <div className="absolute bottom-3 left-3 text-[6px] italic text-white/90">Expired: {expiredDate}</div>
                            <div className="absolute bottom-3 right-16 text-[6px] italic text-white/90">#{idNumber}</div>
                            <div className="absolute bottom-2 right-2">
                                <QRCodeCanvas value={`${form.name} - ${idNumber}`} size={40} fgColor="#ffffff" bgColor="transparent" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto my-10 bg-white rounded-xl shadow-lg overflow-hidden border">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="w-full h-32 md:h-auto bg-gray-100">
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
              </div>
              <a
                href="https://wa.me/6283150645824?text=Halo%2C%20saya%20tertarik%20dengan%20kartu%20PVC-nya.%20Boleh%20saya%20custom%20desain%3F%20Berapa%20lama%20prosesnya%20dan%20apakah%20bisa%20versi%20flashdisk%3F%20Saya%20suka%20banget%20konsepnya%21" 
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
