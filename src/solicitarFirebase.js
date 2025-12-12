import { db } from "./firebase/config.js"; 
import { collection, addDoc } from "firebase/firestore";

export async function guardarSolicitud(solicitud) {
  try {
    if (!solicitud.nombre || !solicitud.monto) throw new Error("Faltan datos");

    const docRef = await addDoc(collection(db, "solicitudes"), {
      nombre: solicitud.nombre,
      cedula: solicitud.cedula,
      email: solicitud.email,
      telefono: solicitud.telefono,
      tipo: solicitud.tipo,
      monto: solicitud.monto,
      plazo: solicitud.plazo,
      destino: solicitud.destino,
      empresa: solicitud.empresa,
      cargo: solicitud.cargo,
      ingresos: solicitud.ingresos,
      cuota: solicitud.cuota
    });

    console.log("✅ Solicitud guardada con ID:", docRef.id);
    return docRef.id;
  } catch (err) {
    console.error("❌ Error guardando solicitud:", err);
    throw err;
  }
}