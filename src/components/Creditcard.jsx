import React from "react";

export default function CreditCard({ credito }) {
  return (
    <div className="card">
      <img src={credito.img} alt={credito.nombre} />
      <div className="card-body">
        <h3>{credito.nombre} {credito.icono}</h3>
        <p>Tasa de interés promedio: {credito.tasa}% E.A.</p>
        <p>Monto disponible: {credito.monto}</p>
        <p>Plazo máximo: {credito.plazo} meses</p>
        <button>Ver detalles</button>
      </div>
    </div>
  );
}