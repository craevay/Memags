import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #111;
  color: #fff;
  padding: 60px 5% 30px;
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
`;

const FooterColumn = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FooterLogo = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 2px;
`;

const FooterHeading = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #fff;
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #fff;
  }
`;

const FooterText = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const FooterContact = styled.p`
  color: #ccc;
  margin-bottom: 5px;
`;

const CopyrightText = styled.p`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #333;
  color: #ccc;
`;

const SocialLink = styled.a`
  color: #ccc;
  margin-right: 15px;
  font-size: 20px;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #fff;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterColumn>
          <FooterLogo>MEMAGS</FooterLogo>
          <FooterText>
            Creating beautiful photo magnets to help you capture and display your most precious memories.
          </FooterText>
          <div style={{ marginTop: '20px' }}>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </SocialLink>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </SocialLink>
            <SocialLink href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-pinterest"></i>
            </SocialLink>
          </div>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>PRODUCTS</FooterHeading>
          <FooterLinks>
            <FooterLink>
              <StyledLink to="/products/square">Square Photo Magnets</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/products/round">Round Photo Magnets</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/products/custom">Custom Shapes</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/products/gift-sets">Gift Sets</StyledLink>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>HELP</FooterHeading>
          <FooterLinks>
            <FooterLink>
              <StyledLink to="/shipping">Shipping Info</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/faq">FAQ</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/returns">Returns</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/privacy">Privacy Policy</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/terms">Terms of Service</StyledLink>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>QUICK LINKS</FooterHeading>
          <FooterLinks>
            <FooterLink>
              <StyledLink to="/about">About Us</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/reviews">Reviews</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/how-it-works">How It Works</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/contact">Contact Us</StyledLink>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>CONTACT INFORMATION</FooterHeading>
          <FooterContact>123 Magnet Avenue</FooterContact>
          <FooterContact>Suite 101</FooterContact>
          <FooterContact>New York, NY 10001</FooterContact>
          <FooterContact>hello@memags.com</FooterContact>
          <FooterContact>(555) 123-4567</FooterContact>
        </FooterColumn>
      </FooterWrapper>
      
      <CopyrightText>
        &copy; {new Date().getFullYear()} MEMAGS. All rights reserved.
      </CopyrightText>
    </FooterContainer>
  );
};

export default Footer;
