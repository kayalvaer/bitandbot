import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkOpenCart: false,
  cart: [],
  games: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
    },

    addTilCart: (state, action) => {
      state.cart = [...state.cart, action.payloadd.item];
    },

    deleteFraCart: (state, action) => {
      state.cart = state.cart.filter((game) => game.id !== action.payload.id);
    },

    increaseQuantity: (state, action) => {
      state.cart = state.cart.map((game) => {
        if (game.id === action.payload.id) {
          game.count++;
        }
        return game;
      });
    },

    decreaseQuantity: (state, action) => {
      state.cart = state.cart.map((game) => {
        if (game.id === action.payload.id && game.count > 1) {
          game.count--;
        }
        return game;
      });
    },

    setCheckOpenCart: (state) => {
      state.checkOpenCart = !state.checkOpenCart;
    },
  },
});

export const {
  setGames,
  addTilCart,
  deleteFraCart,
  increaseQuantity,
  decreaseQuantity,
  setCheckOpenCart,
} = cartSlice.actions;

export default cartSlice.reducer;
