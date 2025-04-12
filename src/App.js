import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MBTIIDCardGenerator from "./pages/IDCardGeneratorMBTI";
import GUPIDCardGenerator from "./pages/IDCardGeneratorGUP";
import PGIDCardGenerator from "./pages/IDCardGeneratorPG";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mbti" element={<MBTIIDCardGenerator />} />
        <Route path="/gup" element={<GUPIDCardGenerator />} />
        <Route path="/pg" element={<PGIDCardGenerator />} />

      </Routes>
    </Router>
  );
}

export default App;
