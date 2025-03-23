import React, { useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addToCart, removeFromCart, updateCartItemQty } from '../actions/cartActions';
import Message from '../components/UI/Message';
import Meta from '../components/Meta';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 100px auto 50px;
  padding: 0 20px;
  color: #fff;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
`;

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div``;

const CartItem = styled.div`
  display: flex;
  border-bottom: 1px solid #333;
  padding: 20px 0;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const ItemImage = styled.div`
  width: 120px;
  height: 120px;
  margin-right: 20px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 576px) {
    margin-bottom: 15px;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ItemName = styled(Link)`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #fff;
  text-decoration: none;
  
  &:hover {
    color: #ccc;
  }
`;

const ItemPrice = styled.div`
  font-size: 1.1rem;
  margin-bottom: 15px;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  
  @media (max-width: 576px) {
    margin-top: 15px;
  }
`;

const QuantitySelect = styled.select`
  background-color: #222;
  color: #fff;
  border: 1px solid #444;
  padding: 5px 10px;
  margin-right: 20px;
  
  &:focus {
    outline: none;
  }
`;

const RemoveButton = styled.button`
  background-color: transparent;
  color: #ff6b6b;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #ff4757;
  }
`;

const CartSummary = styled.div`
  background-color: #111;
  padding: 25px;
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 1.1rem;
`;

const SummaryTotal = styled(SummaryItem)`
  font-weight: 700;
  font-size: 1.3rem;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #333;
`;

const CheckoutButton = styled.button`
  width: 100%;
  background-color: #fff;
  color: #000;
  border: none;
  padding: 15px 0;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
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

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 40px 0;
`;

const ContinueShoppingLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  background-color: #333;
  color: #fff;
  padding: 12px 25px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #444;
  }
`;

const CartScreen = () => {
  const { id: productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get quantity from URL if it exists
  const qty = new URLSearchParams(location.search).get('qty')
    ? Number(new URLSearchParams(location.search).get('qty'))
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  
  // Calculate prices
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const taxPrice = 0.15 * itemsPrice; // 15% tax
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping for orders over $100
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  const updateQtyHandler = (id, newQty) => {
    dispatch(updateCartItemQty(id, Number(newQty)));
  };

  return (
    <CartContainer>
      <Meta title="Shopping Cart | MEMAGS" />
      <PageTitle>Shopping Cart</PageTitle>
      
      {cartItems.length === 0 ? (
        <EmptyCartMessage>
          <Message>Your cart is empty</Message>
          <ContinueShoppingLink to="/products">
            Continue Shopping
          </ContinueShoppingLink>
        </EmptyCartMessage>
      ) : (
        <CartGrid>
          <CartItems>
            {cartItems.map((item) => (
              <CartItem key={item.product}>
                <ItemImage>
                  <img src={item.image} alt={item.name} />
                </ItemImage>
                
                <ItemDetails>
                  <ItemName to={`/product/${item.product}`}>
                    {item.name}
                  </ItemName>
                  
                  <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                  
                  <ItemControls>
                    <QuantitySelect
                      value={item.qty}
                      onChange={(e) => updateQtyHandler(item.product, e.target.value)}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </QuantitySelect>
                    
                    <RemoveButton
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i> Remove
                    </RemoveButton>
                  </ItemControls>
                </ItemDetails>
              </CartItem>
            ))}
          </CartItems>
          
          <CartSummary>
            <SummaryTitle>Order Summary</SummaryTitle>
            
            <SummaryItem>
              <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)}):</span>
              <span>${itemsPrice.toFixed(2)}</span>
            </SummaryItem>
            
            <SummaryItem>
              <span>Tax:</span>
              <span>${taxPrice.toFixed(2)}</span>
            </SummaryItem>
            
            <SummaryItem>
              <span>Shipping:</span>
              <span>
                {shippingPrice === 0 ? 'Free' : `${shippingPrice.toFixed(2)}`}
              </span>
            </SummaryItem>
            
            <SummaryTotal>
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </SummaryTotal>
            
            <CheckoutButton 
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </CheckoutButton>
          </CartSummary>
        </CartGrid>
      )}
    </CartContainer>
  );
};

export default CartScreen;