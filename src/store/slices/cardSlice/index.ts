import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cards } from "../../../interfaces";

const EmptyCard: Cards = {
  numTarjeta: "",
  Activo: 0,
  card_list: undefined
};

export const cardSlice = createSlice({
  name: "card",
  initialState: EmptyCard,
  reducers: {
    setCards: (state: Cards, actiion: PayloadAction<Cards>) => {
      return actiion.payload;
    },
  },
});

export const { setCards } = cardSlice.actions;
export default cardSlice.reducer;
