import { createSlice } from "@reduxjs/toolkit";

const EmptyTypeFood = {
  id_categoria: 0,
};

export const setIdParamaSlice = createSlice({
  name: "food",
  initialState: EmptyTypeFood,
  reducers: {
    goToFoodByType: (state, action) => {
      return action.payload;
    },
  },
});

export const { goToFoodByType } = setIdParamaSlice.actions;
export default setIdParamaSlice.reducer;
