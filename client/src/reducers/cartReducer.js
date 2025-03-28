import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS,
    CART_UPDATE_ITEM_QTY,
    CART_UPLOAD_CUSTOM_IMAGE
  } from '../constants/cartConstants';
  
  export const cartReducer = (
    state = { cartItems: [], shippingAddress: {} },
    action
  ) => {
    switch (action.type) {
      case CART_ADD_ITEM:
        const item = action.payload;
        
        // Check if item already exists in cart
        const existItem = state.cartItems.find(
          (x) => x.product === item.product
        );
        
        if (existItem) {
          // Replace existing item
          return {
            ...state,
            cartItems: state.cartItems.map((x) =>
              x.product === existItem.product ? item : x
            ),
          };
        } else {
          // Add new item to cart
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }
      
      case CART_REMOVE_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter((x) => x.product !== action.payload),
        };
      
      case CART_UPDATE_ITEM_QTY:
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product === action.payload.productId
              ? { ...item, qty: action.payload.qty }
              : item
          ),
        };
      
      case CART_UPLOAD_CUSTOM_IMAGE:
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product === action.payload.productId
              ? { ...item, customImage: action.payload.imageUrl }
              : item
          ),
        };
      
      case CART_SAVE_SHIPPING_ADDRESS:
        return {
          ...state,
          shippingAddress: action.payload,
        };
      
      case CART_SAVE_PAYMENT_METHOD:
        return {
          ...state,
          paymentMethod: action.payload,
        };
      
      case CART_CLEAR_ITEMS:
        return {
          ...state,
          cartItems: [],
        };
      
      default:
        return state;
    }
  };