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
  values: [],
  error: null
}

export const initialState = {
  items: items,
  categories: categories,
  cart: cart,
  cartItems: cartItems,
}
