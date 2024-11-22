import React from "react";
import styled from "styled-components";
import { FaEnvelope, FaPhone, FaWhatsapp, FaFacebookMessenger, FaHeadphones } from 'react-icons/fa';

export function Footer() {
  return (
    <FooterContainer>
      <LogoSection>
        <Logo>CoolFresh</Logo>
        <Nav>
        </Nav>
      </LogoSection>

      <ContactSection>
        <ContactTitle>Contactanos</ContactTitle>
        <ContactInfo>
          <ContactItem><FaEnvelope /> CoolFresh@gmail.com</ContactItem>
          <ContactItem><FaPhone /> +52 9671595081</ContactItem>
        </ContactInfo>
        <SocialIcons>
          <FaWhatsapp />
          <FaFacebookMessenger />
          <FaHeadphones />
        </SocialIcons>
      </ContactSection>
    </FooterContainer>
  );
}

// Styled Components for Footer
const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  background-color: ${({ theme }) => theme.footerBg || '#f1f1f1'};
  color: ${({ theme }) => theme.footerText || '#000'};
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavItem = styled.a`
  color: ${({ theme }) => theme.footerLink || '#000'};
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ContactTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
`;

export default Footer;
