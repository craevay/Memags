import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(-${props => props.currentSlide * 100}%);
`;

const CarouselSlide = styled.div`
  min-width: 100%;
  padding: 20px;
`;

const TestimonialCard = styled.div`
  background-color: ${props => props.dark ? '#111' : '#f9f9f9'};
  color: ${props => props.dark ? '#fff' : '#333'};
  padding: 40px;
  border-radius: 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const QuoteIcon = styled.div`
  font-size: 30px;
  color: ${props => props.dark ? '#666' : '#ddd'};
  margin-bottom: 20px;
`;

const TestimonialText = styled.p`
  font-size: 18px;
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 20px;
  color: ${props => props.dark ? '#ccc' : '#555'};
`;

const CustomerInfo = styled.div`
  margin-top: 30px;
`;

const CustomerImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 15px;
`;

const CustomerName = styled.h4`
  font-size: 18px;
  margin-bottom: 5px;
`;

const CustomerTitle = styled.p`
  font-size: 14px;
  color: ${props => props.dark ? '#aaa' : '#777'};
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 1;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
  
  &:focus {
    outline: none;
  }
  
  &.prev {
    left: -20px;
  }
  
  &.next {
    right: -20px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.active ? '#000' : '#ccc'};
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:focus {
    outline: none;
  }
`;

const testimonials = [
  {
    id: 1,
    text: "I ordered photo magnets for my mom's birthday and she absolutely loved them! The quality is excellent and they arrived much faster than I expected. Will definitely order again.",
    name: "Sarah Johnson",
    title: "Happy Customer",
    image: "/images/testimonial-1.jpg"
  },
  {
    id: 2,
    text: "These magnets are perfect for my refrigerator photo gallery. The colors are vibrant and true to the original photos. Customer service was also very helpful when I had questions.",
    name: "Michael Rodriguez",
    title: "Repeat Customer",
    image: "/images/testimonial-2.jpg"
  },
  {
    id: 3,
    text: "I've ordered from several photo printing services, and MEMAGS is by far the best quality. The magnets are sturdy, the images are sharp, and they make wonderful gifts.",
    name: "Emily Chen",
    title: "Photography Enthusiast",
    image: "/images/testimonial-3.jpg"
  }
];

const TestimonialCarousel = ({ dark }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const slideCount = testimonials.length;

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slideCount);
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, slideCount]);

  const nextSlide = () => {
    setAutoplay(false);
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slideCount);
  };

  const prevSlide = () => {
    setAutoplay(false);
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slideCount) % slideCount);
  };

  const goToSlide = (index) => {
    setAutoplay(false);
    setCurrentSlide(index);
  };

  return (
    <CarouselContainer>
      <CarouselButton className="prev" onClick={prevSlide}>
        &#10094;
      </CarouselButton>
      
      <CarouselTrack currentSlide={currentSlide}>
        {testimonials.map((testimonial) => (
          <CarouselSlide key={testimonial.id}>
            <TestimonialCard dark={dark}>
              <QuoteIcon dark={dark}>
                ❝
              </QuoteIcon>
              <TestimonialText dark={dark}>{testimonial.text}</TestimonialText>
              <CustomerInfo>
                <CustomerImage src={testimonial.image} alt={testimonial.name} />
                <CustomerName>{testimonial.name}</CustomerName>
                <CustomerTitle dark={dark}>{testimonial.title}</CustomerTitle>
              </CustomerInfo>
            </TestimonialCard>
          </CarouselSlide>
        ))}
      </CarouselTrack>
      
      <CarouselButton className="next" onClick={nextSlide}>
        &#10095;
      </CarouselButton>
      
      <Dots>
        {testimonials.map((_, index) => (
          <Dot
            key={index}
            active={currentSlide === index}
            onClick={() => goToSlide(index)}
          />
        ))}
      </Dots>
    </CarouselContainer>
  );
};

export default TestimonialCarousel;
