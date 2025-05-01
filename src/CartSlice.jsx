import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);

      if (itemToUpdate) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          itemToUpdate.quantity = quantity;
        }
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => 
  state.cart.items.reduce(
    (total, item) => total + (parseFloat(item.cost.replace('$', '')) * item.quantity),
    0
  );

export default cartSlice.reducer;