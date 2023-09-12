import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Asociado } from "../../../interfaces";
import { setAndPersistDbUserState, updateUserState } from "../../services/user";

const EmptyUsetState: Asociado = {
  user: undefined,
  Clav_Asociado: 0,
  passedit: 0,
  Nombre_Asociado: "",
  Telefono: "",
  TipoMembresia: "",
  Apellidos: "",
  CorreoE: "",
  NombreMem: "",
  imgAvatar: "",
  fecha_vencimiento: "",
  status: 0,
  puntos: 0,
  permisos: 0
};

export const userSlice = createSlice({
  name: "user",
  initialState: localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data") as string)
    : EmptyUsetState,

  reducers: {
    addUser: (state: Asociado, action: PayloadAction<Asociado>) => {
      setAndPersistDbUserState(action.payload);
      return action.payload;
    },
    updateUserFields: (
      state: Asociado,
      action: PayloadAction<Partial<Asociado>>
    ) => {
      const updatedState = { ...state, ...action.payload };
      updateUserState(updatedState);
      return updatedState;
    },

    removeUser: () => {
      localStorage.removeItem("user_data");
      return EmptyUsetState;
    },
  },
});

export const { addUser, removeUser, updateUserFields } = userSlice.actions;
export default userSlice.reducer;
