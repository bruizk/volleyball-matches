import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#00C49F", "#82ca9d", "#FFBB28", "#FF4444"];

export default function DonutChart({ gesto }) {
  const chartData = [
    { name: "+2", value: gesto["% DOBLE POSITIVA (+2)"] },
    { name: "+1", value: gesto["% POSITIVA (+1)"] },
    { name: "-1", value: gesto["% NEGATIVA (-1)"] },
    { name: "-2", value: gesto["% DOBLE NEGATIVA (-2)"] },
  ];
  const filteredData = chartData.filter(d => d.value > 0);

  return (
    <div style={{ display: "inline-block", margin: 20 }}>
      <h4 style={{ textAlign: "center" }}>{gesto["GESTO TÉCNICO"]}</h4>
      <PieChart width={250} height={250}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          label
        >
          {chartData.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
