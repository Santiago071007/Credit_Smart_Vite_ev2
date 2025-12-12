import { useState } from "react";
import { Link } from "react-router-dom";
import "./Pedir.css";
import { guardarSolicitud } from "../solicitarFirebase.js";

export default function Solicitar() {
  const [errors, setErrors] = useState({ email: "", cedula: "", monto: "" });
  const [name, setName] = useState("");
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tipo, setTipo] = useState("libre-inversion");
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState(12);
  const [destino, setDestino] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [ingresos, setIngresos] = useState("");
  const [cuota, setCuota] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  const calcularCuota = (monto, plazo) => {
    if (!monto || !plazo) return;
    const tasaMensual = 0.015;
    const cuotaCalc = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));
    setCuota(cuotaCalc.toFixed(2));
  };

  const handleMontoChange = (e) => {
    const value = e.target.value;
    setMonto(value);
    calcularCuota(Number(value), Number(plazo));
    if (Number(value) < 500000) {
      setErrors(prev => ({ ...prev, monto: "El monto mínimo es $500.000" }));
    } else {
      setErrors(prev => ({ ...prev, monto: "" }));
    }
  };

  const handlePlazoChange = (e) => {
    setPlazo(e.target.value);
    calcularCuota(Number(monto), Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.email || errors.cedula || errors.monto) {
      alert("Debe corregir los errores antes de enviar.");
      return;
    }
    if (!name || !cedula || !email || !telefono || !monto) {
      alert("Por favor complete todos los campos obligatorios");
      return;
    }
    setShowSummary(true);
  };

  const confirmarEnvio = async () => {
    try {
      const solicitud = { nombre: name, cedula, email, telefono, tipo, monto, plazo, destino, empresa, cargo, ingresos, cuota };
      const id = await guardarSolicitud(solicitud);
      alert(`Solicitud enviada con éxito ✔ ID: ${id}`);

      // Reset de campos
      setName(""); setCedula(""); setEmail(""); setTelefono("");
      setTipo("libre-inversion"); setMonto(""); setPlazo(12); setDestino("");
      setEmpresa(""); setCargo(""); setIngresos(""); setCuota(null);
      setShowSummary(false); setErrors({ email: "", cedula: "", monto: "" });

    } catch (err) {
      alert("❌ Error al enviar la solicitud, intenta de nuevo.");
      console.error(err);
    }
  };

  return (
    <>
      <header>
        <div className="logo">CreditSmart</div>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/simulador">Simulador de crédito</Link>
          <Link className="active">Solicitar crédito</Link>
        </nav>
      </header>

      <main>
        <h1>Formulario de Solicitud de Crédito</h1>

        <form onSubmit={handleSubmit}>
          {/* Datos Personales */}
          <h2>Datos Personales</h2>
          <div className="form-group">
            <label>Nombre completo</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Santiago Martinez" />
          </div>
          <div className="form-group">
            <label>Cédula</label>
            <input type="number" value={cedula} onChange={(e) => {
              const value = e.target.value;
              setCedula(value);
              if (!/^\d{6,}$/.test(value)) {
                setErrors(prev => ({ ...prev, cedula: "La cédula debe tener mínimo 6 números" }));
              } else {
                setErrors(prev => ({ ...prev, cedula: "" }));
              }
            }} placeholder="Ej: 1096329156" />
            {errors.cedula && <p className="error">{errors.cedula}</p>}
          </div>
          <div className="form-group">
            <label>Correo electrónico</label>
            <input type="email" value={email} onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
              if (!/\S+@\S+\.\S+/.test(value)) {
                setErrors(prev => ({ ...prev, email: "Correo electrónico inválido" }));
              } else {
                setErrors(prev => ({ ...prev, email: "" }));
              }
            }} placeholder="ejemplo@correo.com" />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Ej: 3004567890" />
          </div>

          {/* Datos del crédito */}
          <h2>Datos del Crédito</h2>
          <div className="form-group">
            <label>Tipo de crédito</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="libre-inversion">Libre Inversión</option>
              <option value="vehiculo">Vehículo</option>
              <option value="vivienda">Vivienda</option>
            </select>
          </div>
          <div className="form-group">
            <label>Monto solicitado</label>
            <input type="number" value={monto} onChange={handleMontoChange} placeholder="Ej: 10000000" />
            {errors.monto && <p className="error">{errors.monto}</p>}
          </div>
          <div className="form-group">
            <label>Plazo (meses)</label>
            <select value={plazo} onChange={handlePlazoChange}>
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="36">36</option>
              <option value="48">48</option>
              <option value="60">60</option>
            </select>
          </div>
          {cuota && <p className="cuota-info">💰 Cuota mensual aproximada: <strong>${cuota}</strong></p>}

          <div className="form-group">
            <label>Destino del crédito</label>
            <textarea value={destino} onChange={(e) => setDestino(e.target.value)} placeholder="¿En qué usarás el crédito?" />
          </div>

          {/* Datos Laborales */}
          <h2>Datos Laborales</h2>
          <div className="form-group"><label>Empresa</label><input type="text" value={empresa} onChange={(e) => setEmpresa(e.target.value)} /></div>
          <div className="form-group"><label>Cargo</label><input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} /></div>
          <div className="form-group"><label>Ingresos mensuales</label><input type="number" value={ingresos} onChange={(e) => setIngresos(e.target.value)} /></div>

          <div className="buttons">
            <button type="submit" className="submit-btn">Enviar Solicitud</button>
            <button type="button" className="reset-btn" onClick={() => {
              setName(""); setCedula(""); setEmail(""); setTelefono("");
              setTipo("libre-inversion"); setMonto(""); setPlazo(12); setDestino("");
              setEmpresa(""); setCargo(""); setIngresos(""); setCuota(null);
              setShowSummary(false); setErrors({ email: "", cedula: "", monto: "" });
            }}>Vaciar Formulario</button>
          </div>
        </form>

        {showSummary && (
          <div className="resumen">
            <h2>Resumen de la solicitud</h2>
            <p><strong>Nombre:</strong> {name}</p>
            <p><strong>Cédula:</strong> {cedula}</p>
            <p><strong>Tipo de crédito:</strong> {tipo}</p>
            <p><strong>Monto:</strong> ${monto}</p>
            <p><strong>Plazo:</strong> {plazo} meses</p>
            <p><strong>Cuota mensual:</strong> ${cuota}</p>

            <button className="submit-btn" onClick={confirmarEnvio} style={{ marginTop: "1rem" }}>Confirmar envío</button>
          </div>
        )}

        {/* Botón para ir a Mis Solicitudes */}
        <div style={{ marginTop: "2rem" }}>
          <Link to="/mis-solicitudes">
            <button type="button">Ver Mis Solicitudes</button>
          </Link>
        </div>
      </main>

      <footer>© 2025 CreditSmart. Todos los derechos reservados.</footer>
    </>
  );
}