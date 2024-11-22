import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar componentes necesarios para ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Contenedor principal
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

// Contenedor para alinear gráficas horizontalmente
const GraphsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que las gráficas se muevan a otra fila si no caben */
  justify-content: center; /* Centra las gráficas */
  gap: 20px; /* Espaciado entre las gráficas */
  width: 90%; /* Limita el ancho total del contenedor */
  max-width: 1200px; /* Máximo ancho total */
`;

// Contenedor para cada gráfica
const GraphContainer = styled.div`
  flex: 1 1 45%; /* Las gráficas ocuparán hasta el 45% del espacio disponible */
  min-width: 300px; /* Ancho mínimo para evitar que se compriman demasiado */
  max-width: 600px; /* Ancho máximo de cada gráfica */
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export function Diagramas() {
  const [probabilidadEscarcha, setProbabilidadEscarcha] = useState([10, 20, 30, 40, 50]);
  const [tiempoAbierto, setTiempoAbierto] = useState([5, 10, 15, 20, 25]);

  // Función para manejar la conexión al WebSocket
  useEffect(() => {
    const socket = new WebSocket(`${VITE_WS_HOST}`);

    socket.onopen = () => {
      console.log("Conexión WebSocket establecida.");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data); 

      if (data) {
        const newProbabilidad = calculateProbabilidadEscarcha(data);
        const newTiempoAbierto = calculateTiempoAbierto(data);
        
        setProbabilidadEscarcha((prev) => [...prev.slice(1), newProbabilidad]);
        setTiempoAbierto((prev) => [...prev.slice(1), newTiempoAbierto]);
      }
    };

    socket.onclose = () => {
      console.log("Conexión WebSocket cerrada.");
    };

    socket.onerror = (error) => {
      console.error("Error en WebSocket: ", error);
    };

    // Limpiar la conexión al cerrar el componente
    return () => {
      socket.close();
    };
  }, []);

  
  const calculateProbabilidadEscarcha = (data) => {
    // Lógica para calcular la probabilidad de escarcha
    // Esto debe ser adaptado a tus necesidades reales (puedes usar los valores de data)
    return Math.min(100, Math.max(0, (data.humidity + data.temperature) / 2)); 
  };

  const calculateTiempoAbierto = (data) => {
    // Lógica para calcular el tiempo abierto
    // Esto debe ser adaptado a tus necesidades reales (puedes usar los valores de data)
    return Math.min(60, data.lightLevel * 0.1);
  };

 
  const dataProbabilidadEscarcha = {
    labels: ["1 AM", "2 AM", "3 AM", "4 AM", "5 AM"],
    datasets: [
      {
        label: "Probabilidad de Escarcha (%)",
        data: probabilidadEscarcha,
        borderColor: "green",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
    ],
  };

  // Datos para la gráfica de tiempo abierto
  const dataTiempoAbierto = {
    labels: ["1 AM", "2 AM", "3 AM", "4 AM", "5 AM"],
    datasets: [
      {
        label: "Tiempo en que estuvo abierto (min)",
        data: tiempoAbierto,
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <Container>
      <h1>Diagramas</h1>
      <GraphsWrapper>
        <GraphContainer>
          <Line
            data={dataProbabilidadEscarcha}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Probabilidad de Escarcha",
                },
              },
            }}
          />
        </GraphContainer>
        <GraphContainer>
          <Line
            data={dataTiempoAbierto}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Tiempo en que estuvo abierto",
                },
              },
            }}
          />
        </GraphContainer>
      </GraphsWrapper>
    </Container>
  );
}
