
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Simulador from "./pages/Simulador";
import Solicitar from "./pages/Pedir"; 

export default function App() {
  return (
    // introducimos toda la app en general en el Router para habilitar navegación sin recargar la página y sin la necesidad de entrar a paginas distintas
    <BrowserRouter>
      <Routes>
        {/* Ruta principal de la página de inicio */}
        <Route path="/" element={<Home />} />

        {/* Ruta principal de la página de simulador */}
        <Route path="/simulador" element={<Simulador />} />

        {/* Ruta principal de la página de pedir */}
        <Route path="/creditos" element={<Solicitar />} />
      </Routes>
    </BrowserRouter>
  );
}