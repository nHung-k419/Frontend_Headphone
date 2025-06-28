import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CartItem: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddCart: (state, action) => {
      state.CartItem.push(action.payload.result);
      console.log(action.payload);
      
    },
  },
});
export const { AddCart } = cartSlice.actions;
export default cartSlice.reducer;
