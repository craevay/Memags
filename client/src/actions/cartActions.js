import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
  CART_UPDATE_ITEM_QTY,
  CART_UPLOAD_CUSTOM_IMAGE
} from '../constants/cartConstants';

// Add item to cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.images[0],
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  
  // Save to localStorage
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// Remove item from cart
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  
  // Update localStorage
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// Update item quantity in cart
export const updateCartItemQty = (productId, qty) => (dispatch, getState) => {
  dispatch({
    type: CART_UPDATE_ITEM_QTY,
    payload: { productId, qty },
  });
  
  // Update localStorage
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// Upload custom image for a cart item (for photo magnets)
export const uploadCustomImage = (productId, imageFile) => async (dispatch, getState) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    
    const { data } = await axios.post('/api/upload', formData, config);
    
    dispatch({
      type: CART_UPLOAD_CUSTOM_IMAGE,
      payload: {
        productId,
        imageUrl: data,
      },
    });
    
    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

// Save shipping address
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  
  // Save to localStorage
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

// Save payment method
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  
  // Save to localStorage
  localStorage.setItem('paymentMethod', JSON.stringify(data));
};

// Clear cart items (used after successful order)
export const clearCart = () => (dispatch) => {
  dispatch({ type: CART_CLEAR_ITEMS });
  localStorage.removeItem('cartItems');
};
