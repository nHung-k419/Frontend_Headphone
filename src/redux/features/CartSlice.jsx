// import { createSlice } from "@reduxjs/toolkit";

// const loadCartFromStorage = () => {
//   const cart = localStorage.getItem("cart");
//   return cart ? JSON.parse(cart) : [];
// };
// const initialState = {
//   CartItem: loadCartFromStorage(),
//   totalQuantity: 0,
//   totalAmount: 0,
// };

// const saveCartToStorage = (cart) => {
//   localStorage.setItem("cart", JSON.stringify(cart));
// };
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     AddCart: (state, action) => {
//       const product = action.payload;
//       const productId = product?.maxVariant?._id;
//       const exist = state.CartItem.find((item) => item.productId === productId);
//       if (exist) {
//         exist.quantity += 1;
//       } else {
//         state.CartItem.push({
//           productId,
//           quantity: 1,
//         });
//       }
//       saveCartToStorage(state.CartItem);
//     },
//     removeFromCart: (state, action) => {
//       const productId = action.payload;
//       state.CartItem = state.CartItem.filter((item) => item.productId !== productId);

//       saveCartToStorage(state.CartItem);
//     },
//   },
// });
// export const { AddCart, removeFromCart } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GetCartItemsByUser } from "../../services/Client/Cart";
const initialState = {
  CartItem: [],
  totalQuantity: 0,
  totalAmount: 0,
  status: "idle", // idle | loading | succeeded | failed
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async (idUser) => {
  // console.log("idUser", idUser);

  const res = await axios.post(`https://backend-headphone.onrender.com/api/GetCart/${idUser}`, {
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
      // console.log(action.payload);
      const Color = product.Color;
      
      const productId = product?._id;  
      const exist = state.CartItem.find((item) => item?._id === productId || item.Id_ProductVariants?.Id_Products?._id === productId && item?.maxVariant?.Color === Color && item?.Id_ProductVariants?.Color === Color);
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
      console.log(productId);

      state.CartItem = state.CartItem.filter((item) => item.maxVariant?._id !== productId && item.Id_ProductVariants?._id !== productId);
      // console.log("Cart sau khi xóa:", abc);
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

export const { AddCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
