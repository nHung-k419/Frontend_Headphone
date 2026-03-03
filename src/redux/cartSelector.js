import { createSelector } from "@reduxjs/toolkit";

export const selectCartItems = (state) => state.cart.CartItem;

export const selectTotalQuantity = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);