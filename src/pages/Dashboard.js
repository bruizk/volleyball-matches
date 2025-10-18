import React, { useState } from "react";
import useCSV from "../hooks/useCSV";
import DonutChart from "../components/charts/DonutChart";

export default function Dashboard() {
  const data = useCSV();
  const [jugadora, setJugadora] = useState("NURIA");
  const [partido, setPartido] = useState("PICASSENT IDA");

  if (data.length === 0) return <p>Cargando...</p>;

  const jugadoras = [...new Set(data.map((d) => d.JUGADORA))];
  const partidos = [...new Set(data.map((d) => d.PARTIDO))];
  const filtered = data.filter(
    (d) => d.JUGADORA === jugadora && d.PARTIDO === partido
  );

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Estadísticas por gesto técnico</h2>

      <div style={{ margin: 10 }}>
        <label>Jugadora: </label>
        <select value={jugadora} onChange={(e) => setJugadora(e.target.value)}>
          {jugadoras.map((j) => (
            <option key={j}>{j}</option>
          ))}
        </select>

        <label style={{ marginLeft: 10 }}>Partido: </label>
        <select value={partido} onChange={(e) => setPartido(e.target.value)}>
          {partidos.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {filtered.map((g, i) => (
          <DonutChart key={i} gesto={g} />
        ))}
      </div>
    </div>
  );
}
