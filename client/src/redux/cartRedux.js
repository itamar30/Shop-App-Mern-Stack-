import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },

  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },

    removeProdeuct: (state, action) => {
      const found = state.products.find((p) => p._id === action.payload._id);
      console.log("found is", found);
      if (found !== undefined) {
        const index = state.products.indexOf(found);
        state.products.splice(index, 1);
        state.quantity = state.quantity > 0 ? state.quantity - 1 : 0;
        state.total -=
          state.total > 0 ? action.payload.price * action.payload.quantity : 0;
      }
    },

    emptyCart: (state, action) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },
  },
});

export const { addProduct, removeProdeuct, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
