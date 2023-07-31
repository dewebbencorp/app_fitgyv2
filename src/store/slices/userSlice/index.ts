import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Asociado } from "../../../interfaces";

const initialState: Asociado = {
  Nombre_Asociado: "",
  CorreoE: "",
  Clav_Asociado: 0,
  passedit: 0,
  Telefono: "",
  TipoMembresia: "",
  Apellidos: "",
  NombreMem: "",
  imgAvatar: "",
  fechaO: "",
  titular: 0,
  esSocio: 0,
  puntos: 0,
  vencio: 0,
  diasRestantes: 0,
  user: undefined
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state: Asociado, action: PayloadAction<Asociado>) => {
      const aso: Asociado = action.payload;
      return { ...state, ...aso };
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
