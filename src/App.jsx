import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Simulador from "./pages/Simulador";
import Solicitar from "./pages/Pedir";
import MisSolicitudes from "./pages/Missolicitudes"; // importacion de el nuevo jsx

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulador" element={<Simulador />} />
        <Route path="/creditos" element={<Solicitar />} />
        <Route path="/mis-solicitudes" element={<MisSolicitudes userEmail="santiagocantor23@gmail.com" />} />

      </Routes>
    </BrowserRouter>
  );
}