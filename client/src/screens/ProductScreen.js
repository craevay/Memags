import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Rating from '../components/Rating';
import Loader from '../components/UI/Loader';
import Message from '../components/UI/Message';
import Meta from '../components/Meta';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 100px auto 50px;
  padding: 0 20px;
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  color: #fff;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div``;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 20px;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
  opacity: ${props => props.active ? '1' : '0.6'};
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const ProductInfo = styled.div`
  color: #fff;
`;

const ProductTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const ProductRating = styled.div`
  margin: 15px 0;
`;

const ProductPrice = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 20px 0;
`;

const ProductDescription = styled.div`
  margin: 25px 0;
  line-height: 1.6;
  color: #ccc;
`;

const StatusContainer = styled.div`
  margin: 20px 0;
`;

const Status = styled.span`
  color: ${props => props.inStock ? '#4CAF50' : '#F44336'};
  font-weight: 600;
`;

const Quantity = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
`;

const QuantityLabel = styled.label`
  margin-right: 15px;
`;

const QuantitySelect = styled.select`
  padding: 8px 15px;
  background-color: #111;
  color: #fff;
  border: 1px solid #333;
  
  &:focus {
    outline: none;
  }
`;

const AddToCartButton = styled.button`
  display: block;
  width: 100%;
  padding: 15px;
  background-color: #fff;
  color: #000;
  border: none;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 30px;
  
  &:hover {
    background-color: #000;
    color: #fff;
    border: 1px solid #fff;
  }
  
  &:disabled {
    background-color: #444;
    color: #888;
    cursor: not-allowed;
  }
`;

const Section = styled.section`
  margin: 60px 0;
`;

const SectionTitle = styled.h2`
  margin-bottom: 30px;
  font-size: 1.8rem;
  position: relative;
  padding-bottom: 10px;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60px;
    height: 3px;
    background-color: #fff;
  }
`;

const DetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  color: #fff;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #333;
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px 10px;
  width: 30%;
  color: #aaa;
`;

const TableData = styled.td`
  padding: 12px 10px;
`;

const ReviewForm = styled.form`
  margin-top: 30px;
  padding: 20px;
  background-color: #111;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #ccc;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  background-color: #222;
  color: #fff;
  border: 1px solid #333;
  
  &:focus {
    outline: none;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  background-color: #222;
  color: #fff;
  border: 1px solid #333;
  min-height: 120px;
  
  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 25px;
  background-color: #fff;
  color: #000;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #000;
    color: #fff;
    border: 1px solid #fff;
  }
`;

const ReviewsList = styled.div`
  margin-top: 30px;
`;

const ReviewCard = styled.div`
  padding: 20px;
  background-color: #111;
  margin-bottom: 20px;
  border-left: 3px solid #444;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ReviewAuthor = styled.strong`
  font-size: 1.1rem;
`;

const ReviewDate = styled.span`
  color: #aaa;
  font-size: 0.9rem;
`;

const ReviewComment = styled.p`
  color: #ccc;
  margin-top: 15px;
  line-height: 1.5;
`;

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;
  
  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    
    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);
  
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };
  
  // Format date for reviews
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <PageContainer>
      <Meta title={product.name} />
      <BackButton to="/">
        <i className="fas fa-arrow-left"></i> Back to products
      </BackButton>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <ProductLayout>
            <ImageSection>
              <MainImage 
                src={product.images && product.images.length > 0 ? product.images[selectedImage] : '/images/placeholder.jpg'}
                alt={product.name}
              />
              
              {product.images && product.images.length > 1 && (
                <ThumbnailContainer>
                  {product.images.map((image, index) => (
                    <Thumbnail
                      key={index}
                      src={image}
                      alt={`${product.name} - thumbnail ${index + 1}`}
                      active={selectedImage === index}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </ThumbnailContainer>
              )}
            </ImageSection>
            
            <ProductInfo>
              <ProductTitle>{product.name}</ProductTitle>
              
              <ProductRating>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ProductRating>
              
              <ProductPrice>${product.price?.toFixed(2)}</ProductPrice>
              
              <ProductDescription>{product.description}</ProductDescription>
              
              <StatusContainer>
                Status: <Status inStock={product.countInStock > 0}>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </Status>
              </StatusContainer>
              
              {product.countInStock > 0 && (
                <Quantity>
                  <QuantityLabel>Quantity:</QuantityLabel>
                  <QuantitySelect
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </QuantitySelect>
                </Quantity>
              )}
              
              <AddToCartButton
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
              >
                {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </AddToCartButton>
            </ProductInfo>
          </ProductLayout>
          
          <Section>
            <SectionTitle>Product Details</SectionTitle>
            <DetailsTable>
              <tbody>
                <TableRow>
                  <TableHeader>Material</TableHeader>
                  <TableData>{product.material || 'Premium magnetic material'}</TableData>
                </TableRow>
                <TableRow>
                  <TableHeader>Dimensions</TableHeader>
                  <TableData>
                    {product.dimensions ? 
                      `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} inches` : 
                      'Varies by product type'}
                  </TableData>
                </TableRow>
                <TableRow>
                  <TableHeader>Weight</TableHeader>
                  <TableData>{product.weight ? `${product.weight} oz` : 'Lightweight'}</TableData>
                </TableRow>
                <TableRow>
                  <TableHeader>Category</TableHeader>
                  <TableData style={{ textTransform: 'capitalize' }}>{product.category}</TableData>
                </TableRow>
              </tbody>
            </DetailsTable>
          </Section>
          
          <Section>
            <SectionTitle>Reviews</SectionTitle>
            
            {product.reviews && product.reviews.length === 0 && (
              <Message>No reviews yet</Message>
            )}
            
            <ReviewsList>
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id}>
                    <ReviewHeader>
                      <ReviewAuthor>{review.name}</ReviewAuthor>
                      <ReviewDate>{formatDate(review.createdAt)}</ReviewDate>
                    </ReviewHeader>
                    <Rating value={review.rating} />
                    <ReviewComment>{review.comment}</ReviewComment>
                  </ReviewCard>
                ))}
            </ReviewsList>
            
            <SectionTitle>Write a Review</SectionTitle>
            
            {successProductReview && (
              <Message variant="success">
                Review submitted successfully
              </Message>
            )}
            
            {loadingProductReview && <Loader />}
            
            {errorProductReview && (
              <Message variant="danger">{errorProductReview}</Message>
            )}
            
            {userInfo ? (
              <ReviewForm onSubmit={submitHandler}>
                <FormGroup>
                  <FormLabel>Rating</FormLabel>
                  <FormSelect
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </FormSelect>
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Comment</FormLabel>
                  <FormTextarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with this product..."
                  ></FormTextarea>
                </FormGroup>
                
                <SubmitButton type="submit">
                  Submit Review
                </SubmitButton>
              </ReviewForm>
            ) : (
              <Message>
                Please <Link to="/login">sign in</Link> to write a review
              </Message>
            )}
          </Section>
        </>
      )}
    </PageContainer>
  );
};

export default ProductScreen;