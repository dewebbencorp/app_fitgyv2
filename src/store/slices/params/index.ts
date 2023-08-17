import { createSlice } from "@reduxjs/toolkit";

const validCardResponse = {
  mensaje: "",
};

export const setValidateCard = createSlice({
  name: "vcard",
  initialState: validCardResponse,
  reducers: {
    setVCardResponse: (state, action) => {
      return action.payload;
    },
  },
});

export const { setVCardResponse } = setValidateCard.actions;
export default setValidateCard.reducer;
