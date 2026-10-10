import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Report from "./pages/Report.jsx";
import Track from "./pages/Track.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/report" element={<Report />} />
      <Route path="/track" element={<Track />} />
    </Routes>
  );
}

export default App;