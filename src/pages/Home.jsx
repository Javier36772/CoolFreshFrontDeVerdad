// Home.jsx
import React from "react";
import styled from "styled-components";
import fridgeImage from '../assets/fridge.webp'; // Asegúrate de que esta ruta sea correcta
import { Footer } from "../components/Footer"; // Importa el Footer

export function Home() {
  return (
    <Container>
      <HeroSection>
        <TextContainer>
          <Title>Revolucione la gestión de su frigorífico</Title>
          <Subtitle>
          Descubra la solución definitiva para monitorear las estadisticas del funcionamiento de su refrigerador.
          </Subtitle>
        </TextContainer>
        <Image src={fridgeImage} alt="Fridge" />
      </HeroSection>

      <FeaturesSection>
        <FeatureCard>
          <FeatureTitle>Medidas precisas</FeatureTitle>
          <FeatureText>Obtenga datos precisos sobre las dimensiones interiores de su frigorífico, garantizando una utilización óptima del espacio.</FeatureText>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>Analisis inteligente</FeatureTitle>
          <FeatureText>Analice el diseño de su refrigerador con nuestra tecnología de última generación para optimizar la eficiencia.</FeatureText>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>Interfaz facil de usar</FeatureTitle>
          <FeatureText>Disfrute de una interfaz intuitiva que facilita la navegación por los datos.</FeatureText>
        </FeatureCard>
      </FeaturesSection>

      <HowItWorksSection>
        <StepCard>
          <StepTitle>Paso 1: Instalar</StepTitle>
          <StepText>Instale fácilmente su CoolFresh en su refrigerador y comience con facilidad.</StepText>
        </StepCard>
        <StepCard>
          <StepTitle>Paso 2: Analizar</StepTitle>
          <StepText>Deje que el dispositivo recopile datos y analice el espacio para proporcionar información útil</StepText>
        </StepCard>
        <StepCard>
          <StepTitle>Paso 3: Seguridad</StepTitle>
          <StepText>Verifique que todas las caracteristicas de su refri funcionen correctamente</StepText>
        </StepCard>
      </HowItWorksSection>

      <Footer /> {/* Footer al final de la página */}
    </Container>
  );
}

// Styled Components for Home

const Container = styled.div`
  padding: 2rem;
`;

const HeroSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.bgHighlight || "#f5f5f5"};
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const TextContainer = styled.div`
  max-width: 50%;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.primary || "#007bff"};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Image = styled.img`
  max-width: 40%;
  border-radius: 8px;
`;

const FeaturesSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const FeatureCard = styled.div`
  flex: 1;
  padding: 1rem;
  background-color: ${({ theme }) => theme.bgHighlight || "#f5f5f5"};
  border-radius: 8px;
  margin: 0 0.5rem;
  text-align: center;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const FeatureText = styled.p`
  font-size: 1rem;
`;

const HowItWorksSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const StepCard = styled.div`
  flex: 1;
  padding: 1rem;
  background-color: ${({ theme }) => theme.bgHighlight || "#f5f5f5"};
  border-radius: 8px;
  margin: 0 0.5rem;
  text-align: center;
`;

const StepTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StepText = styled.p`
  font-size: 1rem;
`;

export default Home;
