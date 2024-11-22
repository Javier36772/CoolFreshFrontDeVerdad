import React from "react";
import "../App.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function Estadisticas() {
  // Datos de ejemplo para las gráficas
  const dataTemperatura = {
    labels: ["1 PM", "2 PM", "3 PM", "4 PM", "5 PM"],
    datasets: [
      {
        label: "Temperatura (°C)",
        data: [22, 21, 20, 19, 18],
        borderColor: "red",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const dataHumedad = {
    labels: ["1 PM", "2 PM", "3 PM", "4 PM", "5 PM"],
    datasets: [
      {
        label: "Humedad (%)",
        data: [45, 50, 48, 52, 49],
        borderColor: "blue",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const dataCalidadAire = {
    labels: ["1 PM", "2 PM", "3 PM", "4 PM", "5 PM"],
    datasets: [
      {
        label: "CO2 (ppm)",
        data: [400, 420, 430, 410, 405],
        borderColor: "orange",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const dataNivelLuz = {
    labels: ["1 PM", "2 PM", "3 PM", "4 PM", "5 PM"],
    datasets: [
      {
        label: "Nivel de Luz (Lux)",
        data: [700, 750, 800, 780, 760],
        borderColor: "green",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="container">
      <h1>Estadística</h1>
      <div className="card-container">
        {/* Tarjeta de Temperatura */}
        <div className="card">
          <h2>🌡️ Temperatura</h2>
          <Line data={dataTemperatura} options={{ responsive: true }} />
        </div>

        {/* Tarjeta de Humedad */}
        <div className="card">
          <h2>💧 Humedad</h2>
          <Line data={dataHumedad} options={{ responsive: true }} />
        </div>

        {/* Tarjeta de Calidad del Aire */}
        <div className="card">
          <h2>🌫️ Calidad del aire (CO2)</h2>
          <Line data={dataCalidadAire} options={{ responsive: true }} />
        </div>

        {/* Tarjeta de Nivel de Luz */}
        <div className="card">
          <h2>💡 Nivel de Luz</h2>
          <Line data={dataNivelLuz} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
}
