import { useState } from "react";
import { Link } from "react-router-dom";
import "./simulador.css";

export default function Simulador() {
  // Datos de créditos
  const creditosData = [
    { id: 1, nombre: "Crédito Libre Inversión", tasa: 18, montoMin: 1000000, montoMax: 20000000 },
    { id: 2, nombre: "Crédito Vehículo", tasa: 12, montoMin: 5000000, montoMax: 50000000 },
    { id: 3, nombre: "Crédito Vivienda", tasa: 9, montoMin: 20000000, montoMax: 200000000 },
  ];

  // Estados del simulador, en resumen datos del credito
  const [tipo, setTipo] = useState("libre");
  const [monto, setMonto] = useState(10000000);
  const [plazo, setPlazo] = useState(36);
  const [tasa, setTasa] = useState(10);
  const [destino, setDestino] = useState("");
  const [resultado, setResultado] = useState(0);

  // Estados de búsqueda y filtros
  const [search, setSearch] = useState("");
  const [montoFiltro, setMontoFiltro] = useState("todos");
  const [ordenTasa, setOrdenTasa] = useState("asc");

  // Función de simulación de cuota de credito seleccionado
  const simular = () => {
    const interes = tasa / 100;
    const cuota = (monto * (1 + interes * (plazo / 12))) / plazo;
    setResultado(cuota);
  };

  // Filtrado y ordenamiento dinámico por monto
  const filtered = creditosData
    .filter(c => c.nombre.toLowerCase().includes(search.toLowerCase()))
    .filter(c => {
      if (montoFiltro === "bajo") return c.montoMax <= 20000000;
      if (montoFiltro === "medio") return c.montoMax > 20000000 && c.montoMax <= 50000000;
      if (montoFiltro === "alto") return c.montoMax > 50000000;
      return true;
    })
    .sort((a, b) => (ordenTasa === "asc" ? a.tasa - b.tasa : b.tasa - a.tasa));

  return (
    <>
      <header>
        <div className="logo">CreditSmart</div>
        <nav>
          <Link to="/">Inicio</Link>
          <Link className="active" to="/simulador">Simulador de crédito</Link>
          <Link to="/creditos">Solicitar crédito</Link>
        </nav>
      </header>

      <main>
        <h1>Simulador de Crédito</h1>

        <div className="simulador-card">
          <div className="form-group">
            <label>Tipo de crédito</label>
            <select value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value="libre">Crédito de Libre Inversión</option>
              <option value="vehiculo">Crédito Vehícular</option>
              <option value="vivienda">Crédito de Vivienda</option>
            </select>
          </div>

          <div className="form-group">
            <label>Monto ($)</label>
            <input
              type="range"
              min="1000000"
              max="200000000"
              step="1000000"
              value={monto}
              onChange={e => setMonto(Number(e.target.value))}
            />
            <span>{`$${monto.toLocaleString()}`}</span>
          </div>

          <div className="form-group">
            <label>Plazo (meses)</label>
            <input
              type="range"
              min="12"
              max="60"
              step="12"
              value={plazo}
              onChange={e => setPlazo(Number(e.target.value))}
            />
            <span>{plazo} meses</span>
          </div>

          <div className="form-group">
            <label>Tasa de interés anual (%)</label>
            <input
              type="range"
              min="5"
              max="20"
              step="0.5"
              value={tasa}
              onChange={e => setTasa(Number(e.target.value))}
            />
            <span>{tasa}%</span>
          </div>

          <div className="form-group">
            <label>Destino del crédito</label>
            <textarea
              value={destino}
              onChange={e => setDestino(e.target.value)}
              placeholder="Ej: Comprar vehículo, remodelar vivienda..."
            ></textarea>
          </div>

          <button className="btn-primary" onClick={simular}>
            Simular Crédito
          </button>

          <div className="resultado">
            La cuota mensual aproximada será:{" "}
            <strong>
              ${resultado.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </strong>
          </div>
        </div>

        {/* Filtros y búsqueda de creditos disponibles */}
        <div className="filtros">
          <input
            type="text"
            placeholder="Buscar crédito..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select value={montoFiltro} onChange={e => setMontoFiltro(e.target.value)}>
            <option value="todos">Todos los montos</option>
            <option value="bajo">Hasta $20.000.000</option>
            <option value="medio">$20.000.001 - $50.000.000</option>
            <option value="alto">Más de $50.000.000</option>
          </select>
          <select value={ordenTasa} onChange={e => setOrdenTasa(e.target.value)}>
            <option value="asc">Tasa menor a mayor</option>
            <option value="desc">Tasa mayor a menor</option>
          </select>
        </div>

        <h2>Opciones de crédito disponibles</h2>
        <div className="cards">
          {filtered.length > 0 ? (
            filtered.map(c => (
              <div className="card" key={c.id}>
                <h3>{c.nombre}</h3>
                <p>Tasa promedio: {c.tasa}%</p>
                <p>Monto: ${c.montoMin.toLocaleString()} - ${c.montoMax.toLocaleString()}</p>
                <button>Ver detalles</button>
              </div>
            ))
          ) : (
            <p>No hay créditos disponibles</p>
          )}
        </div>

        <button 
  className="btn-secondary"
  onClick={() => {
    setSearch("");
    setMontoFiltro("todos");
    setOrdenTasa("asc");
  }}
  style={{ marginTop: "10px" }}
>
  Limpiar filtros
</button>
      </main>

      <footer>© 2025 CreditSmart. Todos los derechos reservados.</footer>
    </>
  );
}