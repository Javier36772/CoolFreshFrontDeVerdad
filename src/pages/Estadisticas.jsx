import React, { useEffect, useState } from "react";
import "../App.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function Estadisticas() {
  const [dataTemperatura, setDataTemperatura] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperatura (°C)",
        data: [],
        borderColor: "red",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
      },
    ],
  });

  const [dataHumedad, setDataHumedad] = useState({
    labels: [],
    datasets: [
      {
        label: "Humedad (%)",
        data: [],
        borderColor: "blue",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
      },
    ],
  });

  const [dataCalidadAire, setDataCalidadAire] = useState({
    labels: [],
    datasets: [
      {
        label: "CO2 (ppm)",
        data: [],
        borderColor: "orange",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        tension: 0.3,
      },
    ],
  });

  const [dataNivelLuz, setDataNivelLuz] = useState({
    labels: [],
    datasets: [
      {
        label: "Nivel de Luz (Lux)",
        data: [],
        borderColor: "green",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
    ],
  });

  const updateDataFromSocket = (data) => {
    const newTime = new Date().toLocaleTimeString();

    setDataTemperatura((prevData) => ({
      ...prevData,
      labels: [...prevData.labels, newTime],
      datasets: [
        {
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data, data.temperature],
        },
      ],
    }));

    setDataHumedad((prevData) => ({
      ...prevData,
      labels: [...prevData.labels, newTime],
      datasets: [
        {
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data, data.humidity],
        },
      ],
    }));

    setDataCalidadAire((prevData) => {
      const newGasDetected = data.gasDetected ? 1 : 0;
      return {
        ...prevData,
        labels: [...prevData.labels, newTime],
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, newGasDetected],
          },
        ],
      };
    });

    setDataNivelLuz((prevData) => ({
      ...prevData,
      labels: [...prevData.labels, newTime],
      datasets: [
        {
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data, data.lightLevel],
        },
      ],
    }));
  };

  // Conectar al WebSocket
  useEffect(() => {
    const socket = new WebSocket('ws://44.201.247.121:4000');

    socket.onopen = () => {
      console.log('Conexión WebSocket abierta');
    };

    socket.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      updateDataFromSocket(receivedData);
    };

    socket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };

    socket.onerror = (error) => {
      console.log('Error en WebSocket', error);
    };

    return () => {
      socket.close();
    };
  }, []);

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
