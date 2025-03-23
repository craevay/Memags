import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Meta from '../components/Meta';

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 100px auto 50px;
  padding: 0 20px;
  color: #fff;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div``;

const InfoSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  position: relative;
  padding-bottom: 10px;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 3px;
    background-color: #fff;
  }
`;

const InfoText = styled.p`
  margin-bottom: 10px;
  line-height: 1.6;
  color: #ccc;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const IconWrapper = styled.div`
  min-width: 40px;
  height: 40px;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const ContactForm = styled.form`
  background-color: #111;
  padding: 30px;
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #ccc;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  background-color: #222;
  border: 1px solid #333;
  color: #fff;
  
  &:focus {
    outline: none;
    border-color: #555;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  background-color: #222;
  border: 1px solid #333;
  color: #fff;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #555;
  }
`;

const SubmitButton = styled.button`
  background-color: #fff;
  color: #000;
  border: none;
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #000;
    color: #fff;
    border: 1px solid #fff;
  }
`;

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const submitHandler = (e) => {
    e.preventDefault();
    
    // Here we would typically send the form data to a backend API
    // For now, we'll just simulate success with a toast notification
    
    toast.success('Your message has been sent. We\'ll get back to you soon!');
    
    // Clear form fields
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };
  
  return (
    <ContactContainer>
      <Meta title="Contact Us | MEMAGS" />
      <PageTitle>Contact Us</PageTitle>
      
      <ContactGrid>
        <ContactInfo>
          <InfoSection>
            <SectionTitle>Get in Touch</SectionTitle>
            <InfoText>
              Have a question about our photo magnets or need assistance with your order?
              We're here to help! Contact us using any of the methods below or fill out the form.
            </InfoText>
          </InfoSection>
          
          <InfoSection>
            <SectionTitle>Contact Information</SectionTitle>
            
            <InfoItem>
              <IconWrapper>
                <i className="fas fa-map-marker-alt"></i>
              </IconWrapper>
              <div>
                <InfoText>123 Magnet Avenue</InfoText>
                <InfoText>Suite 101</InfoText>
                <InfoText>New York, NY 10001</InfoText>
              </div>
            </InfoItem>
            
            <InfoItem>
              <IconWrapper>
                <i className="fas fa-phone-alt"></i>
              </IconWrapper>
              <InfoText>(555) 123-4567</InfoText>
            </InfoItem>
            
            <InfoItem>
              <IconWrapper>
                <i className="fas fa-envelope"></i>
              </IconWrapper>
              <InfoText>hello@memags.com</InfoText>
            </InfoItem>
          </InfoSection>
          
          <InfoSection>
            <SectionTitle>Business Hours</SectionTitle>
            <InfoText>Monday - Friday: 9am to 6pm EST</InfoText>
            <InfoText>Saturday: 10am to 4pm EST</InfoText>
            <InfoText>Sunday: Closed</InfoText>
          </InfoSection>
          
          <SocialLinks>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </SocialLink>
            <SocialLink href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-pinterest"></i>
            </SocialLink>
          </SocialLinks>
        </ContactInfo>
        
        <ContactForm onSubmit={submitHandler}>
          <FormTitle>Send Us a Message</FormTitle>
          
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <FormInput
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Subject</FormLabel>
            <FormInput
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Message</FormLabel>
            <FormTextarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </FormGroup>
          
          <SubmitButton type="submit">Send Message</SubmitButton>
        </ContactForm>
      </ContactGrid>
    </ContactContainer>
  );
};

export default ContactScreen;
