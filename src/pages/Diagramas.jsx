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
import * as XLSX from "xlsx"; // Importamos la librería XLSX

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Container = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const GraphWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const GraphContainer = styled.div`
  width: 45%;
  min-width: 300px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MetricsTable = styled.table`
  margin: 20px auto;
  width: 80%;
  border-collapse: collapse;
`;

const MetricsRow = styled.tr`
  border: 1px solid #ddd;
  text-align: center;

  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const MetricsHeader = styled.th`
  padding: 10px;
  background-color: #007bff;
  color: white;
`;

const MetricsCell = styled.td`
  padding: 10px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export function Diagramas() {
  const [sensorData, setSensorData] = useState([]); // Mantener todos los datos de los sensores
  const [temperaturas, setTemperaturas] = useState([]);
  const [humedades, setHumedades] = useState([]);
  const [indiceConfort, setIndiceConfort] = useState([]);
  const [probabilidadEscarcha, setProbabilidadEscarcha] = useState([]);

  const calcularIndiceConfort = (temperatura, humedad) => temperatura + 0.5555 * (humedad - 10);
  const calcularProbabilidadEscarcha = (temperatura, humedad) => Math.max(0, 100 - (temperatura + humedad / 10));

  const calcularEstadisticas = (data) => {
    const filteredData = data.filter((value) => typeof value === "number" && !isNaN(value));

    if (filteredData.length === 0) return { media: "-", mediana: "-", moda: "-" };

    const media = (filteredData.reduce((a, b) => a + b, 0) / filteredData.length).toFixed(2);
    const sorted = [...filteredData].sort((a, b) => a - b);
    const mediana =
      sorted.length % 2 === 0
        ? ((sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2).toFixed(2)
        : sorted[Math.floor(sorted.length / 2)].toFixed(2);

    const frecuencias = {};
    filteredData.forEach((num) => {
      frecuencias[num] = (frecuencias[num] || 0) + 1;
    });
    const maxFrecuencia = Math.max(...Object.values(frecuencias));
    const modas = Object.keys(frecuencias).filter((key) => frecuencias[key] === maxFrecuencia);
    
    return { media, mediana, moda: modas.join(", ") };
  };

  const updateDataFromSocket = (data) => {
    console.log("Datos recibidos:", data); // Para depurar

    if (data.temperature && data.humidity) {
      setTemperaturas((prev) => [...prev, data.temperature]);
      setHumedades((prev) => [...prev, data.humidity]);

      setIndiceConfort((prev) => [...prev, calcularIndiceConfort(data.temperature, data.humidity)]);
      setProbabilidadEscarcha((prev) => [...prev, calcularProbabilidadEscarcha(data.temperature, data.humidity)]);

      const newData = {
        timestamp: new Date().toLocaleString(),
        temperature: data.temperature,
        airQuality: data.gasDetected ? "Detectado" : "No detectado",
        lightIntensity: data.light || 0,
      };

      setSensorData((prevData) => [...prevData, newData]); // Acumular los datos en el estado
    }
  };

  useEffect(() => {
    const socket = new WebSocket("wss://coolfresh-api.freemyip.com:4000");

    socket.onopen = () => console.log("Conexión WebSocket abierta");

    socket.onmessage = (event) => {
      try {
        const receivedData = JSON.parse(event.data);
        updateDataFromSocket(receivedData);
      } catch (error) {
        console.error("Error al procesar los datos del WebSocket:", error);
      }
    };

    socket.onerror = (error) => console.error("Error en WebSocket:", error);
    socket.onclose = () => console.log("Conexión WebSocket cerrada");

    return () => socket.close();
  }, []);

  // Función para exportar los datos a un archivo Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(sensorData); // Convertir los datos a una hoja de Excel
    const wb = XLSX.utils.book_new(); // Crear un libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, "Datos de Sensores"); // Agregar la hoja al libro
    XLSX.writeFile(wb, "datos_sensores.xlsx"); // Descargar el archivo Excel
  };

  const estadisticasConfort = calcularEstadisticas(indiceConfort);
  const estadisticasEscarcha = calcularEstadisticas(probabilidadEscarcha);
  const estadisticasTemperatura = calcularEstadisticas(temperaturas);
  const estadisticasHumedad = calcularEstadisticas(humedades);

  return (
    <Container>
      <Section>
        <SectionTitle>Estadísticas de los Sensores</SectionTitle>
        <MetricsTable>
          <thead>
            <tr>
              <MetricsHeader>Parámetro</MetricsHeader>
              <MetricsHeader>Media</MetricsHeader>
              <MetricsHeader>Mediana</MetricsHeader>
              <MetricsHeader>Moda</MetricsHeader>
            </tr>
          </thead>
          <tbody>
            <MetricsRow>
              <MetricsCell>Temperatura</MetricsCell>
              <MetricsCell>{estadisticasTemperatura.media}</MetricsCell>
              <MetricsCell>{estadisticasTemperatura.mediana}</MetricsCell>
              <MetricsCell>{estadisticasTemperatura.moda}</MetricsCell>
            </MetricsRow>
            <MetricsRow>
              <MetricsCell>Humedad</MetricsCell>
              <MetricsCell>{estadisticasHumedad.media}</MetricsCell>
              <MetricsCell>{estadisticasHumedad.mediana}</MetricsCell>
              <MetricsCell>{estadisticasHumedad.moda}</MetricsCell>
            </MetricsRow>
            <MetricsRow>
              <MetricsCell>Índice de Confort</MetricsCell>
              <MetricsCell>{estadisticasConfort.media}</MetricsCell>
              <MetricsCell>{estadisticasConfort.mediana}</MetricsCell>
              <MetricsCell>{estadisticasConfort.moda}</MetricsCell>
            </MetricsRow>
            <MetricsRow>
              <MetricsCell>Probabilidad de Escarcha</MetricsCell>
              <MetricsCell>{estadisticasEscarcha.media}</MetricsCell>
              <MetricsCell>{estadisticasEscarcha.mediana}</MetricsCell>
              <MetricsCell>{estadisticasEscarcha.moda}</MetricsCell>
            </MetricsRow>
          </tbody>
        </MetricsTable>
        <Button onClick={exportToExcel}>Exportar a Excel</Button>
      </Section>

      <Section>
        <SectionTitle>Gráficas de los Sensores</SectionTitle>
        <GraphWrapper>
          <GraphContainer>
            <h3>Temperatura</h3>
            <Line data={{
              labels: temperaturas.map((_, index) => `Medición ${index + 1}`),
              datasets: [{
                label: "Temperatura (°C)",
                data: temperaturas,
                fill: false,
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.1,
              }],
            }} />
          </GraphContainer>

          <GraphContainer>
            <h3>Humedad</h3>
            <Line data={{
              labels: humedades.map((_, index) => `Medición ${index + 1}`),
              datasets: [{
                label: "Humedad (%)",
                data: humedades,
                fill: false,
                borderColor: "rgba(153, 102, 255, 1)",
                tension: 0.1,
              }],
            }} />
          </GraphContainer>
        </GraphWrapper>
      </Section>
    </Container>
  );
}
