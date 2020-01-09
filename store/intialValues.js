export const auth = {
  isLoading: false,
  values: {},
  error: null
}

export const items = {
  isLoading: false,
  values: [],
  error: null
};

export const categories = {
  isLoading: false,
  values: [],
  error: null
};

export const cartItems = {
  isLoading: false,
  values: [],
  error: null
}

export const cart = {
  isLoading: false,
  values: {
    item_total_price: 0,
    discount_amount: 0,
    taxes: 0,
    cart_total: 0,
    total_saved: 0
  },
  error: null
}

export const initialState = {
  items: items,
  categories: categories,
  cart: cart,
  cartItems: cartItems,
}
