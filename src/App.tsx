import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar/Navbar";
import Swap from "./pages/Swap";

const App = () => {
  return (
    <>
      <Navbar />;
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/" element={<Swap />} />
      </Routes>
    </>
  );
};

export default App;
