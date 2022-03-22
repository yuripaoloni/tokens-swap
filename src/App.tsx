import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar/Navbar";
import Swap from "./pages/Swap";

const App = () => {
  return (
    <div className="min-h-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/swap" element={<Swap />} />
      </Routes>
    </div>
  );
};

export default App;
