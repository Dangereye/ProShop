import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const inCart = state.cartItems.find((cart) => cart.id === item.id);
      if (inCart) {
        return {
          ...state,
          cartItems: state.cartItems.map((cart) =>
            cart.id === item.id ? item : cart
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    default:
      return state;
  }
};
