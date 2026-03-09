import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  CartItem: [],
  totalQuantity: 0,
  totalAmount: 0,
  status: "idle", // idle | loading | succeeded | failed
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async (idUser) => {
  // console.log("idUser", idUser);

  const res = await axios.post(`${API_URL}/api/GetCart/${idUser}`, {
    withCredentials: true,
  });
  // console.log(res.data.resultCartItems);

  return res.data.resultCartItems;
});


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddCart: (state, action) => {
      const product = action.payload;
      const productId = product.Id_ProductVariants;
      const exist = state.CartItem.find(
        (item) => item.Id_ProductVariants === productId
      );

      if (exist) {
        exist.quantity += 1;
      } else {
        state.CartItem.push({
          ...product,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.CartItem = state.CartItem.filter((item) => item.Id_ProductVariants?._id !== productId && item.Id_ProductVariants !== productId);
    },
    clearCart: (state) => {
      state.CartItem = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.CartItem = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { AddCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
