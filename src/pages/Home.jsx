import "./Home.css";
import { Link } from "react-router-dom";
import CreditCard from "../components/CreditCard.jsx";

// Array de créditos
const creditos = [
  {
    id: 1,
    nombre: "Crédito de Libre Inversión",
    icono: "💰",
    tasa: 18,
    monto: "$1.000.000 - $20.000.000",
    plazo: 48,
    img: "https://media.istockphoto.com/id/2198401601/photo/handshake-teamwork-contract-or-onboarding-b2b-partnership-agreement-or-deal-welcome-business.jpg?s=2048x2048&w=is&k=20&c=erOQc9d1O3q1O0DBs2XDgO-OqdjQXEmI6tMD4bXA4Nc="
  },
  {
    id: 2,
    nombre: "Crédito Vehícular",
    icono: "🏎️",
    tasa: 12,
    monto: "$5.000.000 - $50.000.000",
    plazo: 60,
    img: "https://media.istockphoto.com/id/2178101168/photo/client-secured-approval-for-mortgage-loan-after-reviewing-financial-agreements-outlined-in.jpg?s=2048x2048&w=is&k=20&c=UviBLJye5ua1sGS9qgUHIJGcWPOoQuPr-HdoFhtLKng="
  },
  {
    id: 3,
    nombre: "Crédito de Vivienda",
    icono: "🏠",
    tasa: 9,
    monto: "$20.000.000 - $200.000.000",
    plazo: 60,
    img: "https://media.istockphoto.com/id/2150750509/photo/loving-couple-holding-the-keys-of-their-new-house.jpg?s=2048x2048&w=is&k=20&c=mZ3O-KcYtbpet_nfHIMT__LgioYADILUKUd0xXmiQIM="
  }
];

export default function Home() {
  return (
    <>
      <header>
        <div className="logo">CreditSmart</div>
        <nav>
          <Link to="/" className="active">Inicio</Link>
          <Link to="/simulador">Simulador de crédito</Link>
          <Link to="/creditos">Solicita tu crédito</Link>
        </nav>
      </header>

      {/* Hero principal de CreditSmart */}
      <section className="hero">
        <h1>Tu crédito ideal en segundos</h1>
        <p>Simula, compara y elige el mejor crédito para impulsar tus sueños</p>
        <Link to="/simulador" className="btn-hero">Simula tu crédito</Link>
      </section>
      
      {/* Generación dinámica de tarjetas usando el array creditos */}
      <section className="section">
        <h2>Créditos Disponibles</h2>
        <p>Elige la opción que se ajuste a ti</p>

        <div className="cards">
          {creditos.map((credito) => (
            <CreditCard key={credito.id} credito={credito} />
          ))}
        </div>
      </section>

      <footer>
        © 2025 CreditSmart. Todos los derechos reservados.
      </footer>
    </>
  );
}