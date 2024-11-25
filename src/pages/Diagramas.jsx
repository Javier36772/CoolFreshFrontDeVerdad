import React, { useState, useEffect } from "react";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const GraphsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 90%;
  max-width: 1200px;
`;

const GraphContainer = styled.div`
  flex: 1 1 45%;
  min-width: 300px;
  max-width: 600px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MetricsContainer = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  color: #333;
`;

export function Diagramas() {
  const [probabilidadEscarcha, setProbabilidadEscarcha] = useState(() => {
    const data = localStorage.getItem("probabilidadEscarcha");
    return data ? JSON.parse(data) : [];
  });

  const [tiempoAbierto, setTiempoAbierto] = useState(() => {
    const data = localStorage.getItem("tiempoAbierto");
    return data ? JSON.parse(data) : [];
  });

  // Cálculos de métricas
  const calcularProbabilidadEscarcha = (temperatura, humedad) => {
    if (humedad > 80 && temperatura <= 0) {
      return Math.min(100, 50 + (humedad - 80) * 5 + Math.abs(temperatura) * 10);
    }
    return Math.max(0, 50 - (humedad - 60) * 2 - Math.abs(temperatura) * 5);
  };

  const calcularTiempoAbierto = (temperaturaInicial, temperaturaFinal) => {
    const diferenciaTemperatura = temperaturaFinal - temperaturaInicial;
    return Math.max(0, diferenciaTemperatura * 2);
  };

  // Procesar datos recibidos
  const procesarDatos = (data) => {
    const nuevaProbabilidad = calcularProbabilidadEscarcha(data.temperature, data.humidity);
    const nuevoTiempoAbierto = calcularTiempoAbierto(data.temperature - 5, data.temperature); // Ejemplo: usar temperatura-5 como inicial.

    setProbabilidadEscarcha((prev) => {
      const actualizado = [...prev, nuevaProbabilidad];
      localStorage.setItem("probabilidadEscarcha", JSON.stringify(actualizado));
      return actualizado;
    });

    setTiempoAbierto((prev) => {
      const actualizado = [...prev, nuevoTiempoAbierto];
      localStorage.setItem("tiempoAbierto", JSON.stringify(actualizado));
      return actualizado;
    });
  };

  // WebSocket
  useEffect(() => {
    const socket = new WebSocket("wss://coolfresh-api.freemyip.com:4000");

    socket.onopen = () => console.log("Conexión WebSocket abierta");
    socket.onmessage = (event) => {
      try {
        const receivedData = JSON.parse(event.data);
        console.log("Datos recibidos:", receivedData);
        procesarDatos(receivedData);
      } catch (error) {
        console.error("Error al procesar los datos del WebSocket:", error);
      }
    };

    socket.onerror = (error) => console.error("Error en WebSocket:", error);
    socket.onclose = () => console.log("Conexión WebSocket cerrada");

    return () => socket.close();
  }, []);

  // Métricas
  const promedioEscarcha =
    probabilidadEscarcha.length > 0
      ? (probabilidadEscarcha.reduce((a, b) => a + b, 0) / probabilidadEscarcha.length).toFixed(2)
      : "N/A";

  const totalTiempoAbierto =
    tiempoAbierto.length > 0 ? tiempoAbierto.reduce((a, b) => a + b, 0).toFixed(2) : "N/A";

  return (
    <Container>
      <h1>Diagramas</h1>
      <GraphsWrapper>
        <GraphContainer>
          <Line
            data={{
              labels: probabilidadEscarcha.map((_, i) => `Muestra ${i + 1}`),
              datasets: [
                {
                  label: "Probabilidad de Escarcha (%)",
                  data: probabilidadEscarcha,
                  borderColor: "green",
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  tension: 0.3,
                },
              ],
            }}
          />
          <MetricsContainer>
            <p>Promedio de probabilidad de escarcha: {promedioEscarcha}%</p>
          </MetricsContainer>
        </GraphContainer>
        <GraphContainer>
          <Line
            data={{
              labels: tiempoAbierto.map((_, i) => `Muestra ${i + 1}`),
              datasets: [
                {
                  label: "Tiempo Abierto (min)",
                  data: tiempoAbierto,
                  borderColor: "orange",
                  backgroundColor: "rgba(255, 165, 0, 0.2)",
                  tension: 0.3,
                },
              ],
            }}
          />
          <MetricsContainer>
            <p>Total de tiempo abierto: {totalTiempoAbierto} minutos</p>
          </MetricsContainer>
        </GraphContainer>
      </GraphsWrapper>
    </Container>
  );
}
