import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Rating from './Rating';

const ProductCard = styled.div`
  background-color: #111;
  border-radius: 0;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.div`
  height: 0;
  padding-bottom: 100%; /* Creates a square aspect ratio */
  position: relative;
  overflow: hidden;
`;

const ProductImageInner = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProductBody = styled.div`
  padding: 20px;
  color: #fff;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled(Link)`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #fff;
  text-decoration: none;
  
  &:hover {
    color: #ccc;
  }
`;

const ProductDescription = styled.p`
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 15px;
  line-height: 1.4;
  flex-grow: 1;
`;

const ProductPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 10px 0;
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const AddToCartButton = styled(Link)`
  background-color: #fff;
  color: #000;
  border: none;
  padding: 10px 15px;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    background-color: #000;
    color: #fff;
    border: 1px solid #fff;
  }
`;

const Product = ({ product }) => {
  // Truncate description to a fixed length
  const truncateDescription = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <ProductCard>
      <ProductImage>
        <Link to={`/product/${product._id}`}>
          <ProductImageInner src={product.images[0]} alt={product.name} />
        </Link>
      </ProductImage>
      
      <ProductBody>
        <ProductTitle to={`/product/${product._id}`}>
          {product.name}
        </ProductTitle>
        
        <Rating
          value={product.rating}
          text={`${product.numReviews} reviews`}
        />
        
        <ProductDescription>
          {truncateDescription(product.description)}
        </ProductDescription>
        
        <ProductFooter>
          <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
          <AddToCartButton to={`/product/${product._id}`}>
            View Details
          </AddToCartButton>
        </ProductFooter>
      </ProductBody>
    </ProductCard>
  );
};

export default Product;
