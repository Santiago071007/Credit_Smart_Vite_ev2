import { useEffect, useState } from "react";
import { db } from "../firebase/config.js";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function MisSolicitudes({ userEmail = "ejemplo@correo.com" }) {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const snapshot = await getDocs(collection(db, "solicitudes"));
        // Filtrar por email del usuario
        const datos = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(s => s.email === userEmail);

        setSolicitudes(datos);
      } catch (err) {
        console.error("Error cargando solicitudes:", err);
        setError("No se pudieron cargar las solicitudes. Intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, [userEmail]);

  // Función para borrar solicitud que aparezcan que ha hecho el usuario
  const borrarSolicitud = async (id) => {
    try {
      await deleteDoc(doc(db, "solicitudes", id));
      setSolicitudes(prev => prev.filter(s => s.id !== id));
      alert("Solicitud eliminada ✔");
    } catch (err) {
      console.error("Error borrando solicitud:", err);
    }
  };

  // Función para editar solicitud en este caso solo nos permitira editar el monto solicitado
  const editarSolicitud = async (id) => {
    const nuevoMonto = prompt("Ingresa el nuevo monto:");
    if (!nuevoMonto) return;

    try {
      const docRef = doc(db, "solicitudes", id);
      await updateDoc(docRef, { monto: Number(nuevoMonto) });

      setSolicitudes(prev =>
        prev.map(s => (s.id === id ? { ...s, monto: Number(nuevoMonto) } : s))
      );

      alert("Monto actualizado ✔");
    } catch (err) {
      console.error("Error editando solicitud:", err);
    }
  };

  return (
    <div>
      <header>
        <div className="logo">CreditSmart</div>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/simulador">Simulador de crédito</Link>
          <Link to="/creditos">Solicitar crédito</Link>
          <Link className="active">Mis Solicitudes</Link>
        </nav>
      </header>

      <main style={{ padding: "1rem" }}>
        <h1>Mis Solicitudes</h1>

        {loading && <p>Cargando solicitudes...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && solicitudes.length === 0 && <p>No hay solicitudes registradas</p>}

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {solicitudes.map(s => (
            <div
              key={s.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                background: "#f9f9f9"
              }}
            >
              <p><strong>Nombre:</strong> {s.nombre}</p>
              <p><strong>Cédula:</strong> {s.cedula}</p>
              <p><strong>Email:</strong> {s.email}</p>
              <p><strong>Teléfono:</strong> {s.telefono}</p>
              <p><strong>Tipo de crédito:</strong> {s.tipo}</p>
              <p><strong>Monto:</strong> ${s.monto}</p>
              <p><strong>Plazo:</strong> {s.plazo} meses</p>
              <p><strong>Cuota aproximada:</strong> ${s.cuota}</p>
              <p><strong>Destino:</strong> {s.destino}</p>
              <p><strong>Empresa:</strong> {s.empresa}</p>
              <p><strong>Cargo:</strong> {s.cargo}</p>
              <p><strong>Ingresos:</strong> ${s.ingresos}</p>

              {/* Botones */}
              <div style={{ marginTop: "0.5rem" }}>
                <button onClick={() => editarSolicitud(s.id)} style={{ marginRight: "0.5rem" }}>Editar</button>
                <button onClick={() => borrarSolicitud(s.id)}>Borrar</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}