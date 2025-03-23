import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import Loader from '../components/UI/Loader';
import Message from '../components/UI/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';
import TestimonialCarousel from '../components/TestimonialCarousel';

const Hero = styled.section`
  height: 100vh;
  background-image: url('/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5%;
  position: relative;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 800px;
  color: white;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 6rem;
  font-weight: 700;
  margin-bottom: 2rem;
  line-height: 1.1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  background-color: #fff;
  color: #000;
  padding: 1rem 2.5rem;
  border-radius: 0;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    background-color: #000;
    color: #fff;
    border: 1px solid #fff;
  }
  
  svg {
    margin-left: 10px;
  }
`;

const Section = styled.section`
  padding: 100px 5%;
  text-align: center;
  background-color: ${props => props.dark ? '#000' : '#fff'};
  color: ${props => props.dark ? '#fff' : '#000'};
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const FeaturedProducts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const CategorySection = styled.section`
  padding: 80px 5%;
  background-color: #000;
  color: #fff;
`;

const Categories = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 50px;
`;

const CategoryCard = styled(Link)`
  position: relative;
  height: 300px;
  overflow: hidden;
  text-decoration: none;
  color: #fff;
  
  &:hover img {
    transform: scale(1.05);
  }
  
  &:hover .category-overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const CategoryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
`;

const CategoryName = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 10px;
`;

const CategoryDescription = styled.p`
  font-size: 1rem;
  max-width: 80%;
  text-align: center;
`;

const HowItWorksSection = styled.section`
  padding: 100px 5%;
  background-color: #fff;
  color: #000;
`;

const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-top: 50px;
`;

const Step = styled.div`
  text-align: center;
`;

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto 20px;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const StepDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { keyword, pageNumber = 1 } = useParams();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {keyword ? (
        <>
          <Link to='/' className='btn btn-light'>
            Go Back
          </Link>
          <h1>Search Results for "{keyword}"</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              />
            </>
          )}
        </>
      ) : (
        <>
          <Hero>
            <HeroOverlay />
            <HeroContent>
              <HeroTitle>MEMAGS</HeroTitle>
              <HeroSubtitle>Shop Smart, Live Better</HeroSubtitle>
              <Button to="/products">
                SHOP NOW
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </HeroContent>
          </Hero>

          <Section dark>
            <SectionTitle>Featured Products</SectionTitle>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <FeaturedProducts>
                {products.slice(0, 4).map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </FeaturedProducts>
            )}
            <Button to="/products" style={{ marginTop: '40px' }}>
              VIEW ALL PRODUCTS
            </Button>
          </Section>

          <CategorySection>
            <SectionTitle>Shop By Category</SectionTitle>
            <Categories>
              <CategoryCard to="/products/square">
                <CategoryImage src="/images/category-square.jpg" alt="Square Photo Magnets" />
                <CategoryOverlay className="category-overlay">
                  <CategoryName>Square Photo Magnets</CategoryName>
                  <CategoryDescription>Perfect for Instagram photos</CategoryDescription>
                </CategoryOverlay>
              </CategoryCard>

              <CategoryCard to="/products/round">
                <CategoryImage src="/images/category-round.jpg" alt="Round Photo Magnets" />
                <CategoryOverlay className="category-overlay">
                  <CategoryName>Round Photo Magnets</CategoryName>
                  <CategoryDescription>Smooth edges for a modern look</CategoryDescription>
                </CategoryOverlay>
              </CategoryCard>

              <CategoryCard to="/products/custom">
                <CategoryImage src="/images/category-custom.jpg" alt="Custom Shape Magnets" />
                <CategoryOverlay className="category-overlay">
                  <CategoryName>Custom Shapes</CategoryName>
                  <CategoryDescription>Design your own unique magnets</CategoryDescription>
                </CategoryOverlay>
              </CategoryCard>

              <CategoryCard to="/products/gift-sets">
                <CategoryImage src="/images/category-gift.jpg" alt="Gift Sets" />
                <CategoryOverlay className="category-overlay">
                  <CategoryName>Gift Sets</CategoryName>
                  <CategoryDescription>Perfect presents for loved ones</CategoryDescription>
                </CategoryOverlay>
              </CategoryCard>
            </Categories>
          </CategorySection>

          <Section>
            <SectionTitle>What Our Customers Say</SectionTitle>
            <TestimonialCarousel />
          </Section>

          <HowItWorksSection>
            <SectionTitle>How It Works</SectionTitle>
            <Steps>
              <Step>
                <StepNumber>1</StepNumber>
                <StepTitle>Upload Photos</StepTitle>
                <StepDescription>
                  Choose photos from your camera roll, Instagram, or Facebook.
                </StepDescription>
              </Step>

              <Step>
                <StepNumber>2</StepNumber>
                <StepTitle>Customize</StepTitle>
                <StepDescription>
                  Select magnet shape, size, and customize with frames or text if desired.
                </StepDescription>
              </Step>

              <Step>
                <StepNumber>3</StepNumber>
                <StepTitle>We Print</StepTitle>
                <StepDescription>
                  Our team carefully prints your photos on high-quality magnetic material.
                </StepDescription>
              </Step>

              <Step>
                <StepNumber>4</StepNumber>
                <StepTitle>Fast Delivery</StepTitle>
                <StepDescription>
                  Your custom magnets are shipped directly to your door within days.
                </StepDescription>
              </Step>
            </Steps>
            <Button to="/how-it-works" style={{ marginTop: '40px' }}>
              LEARN MORE
            </Button>
          </HowItWorksSection>

        </>
      )}
    </>
  );
};

export default HomeScreen;