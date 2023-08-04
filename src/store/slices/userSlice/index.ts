import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Asociado } from "../../../interfaces";
import { setAndPersistDbUserState } from "../../userService";

const EmptyUsetState: Asociado = {
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
  initialState: localStorage.getItem('user_data') ? JSON.parse(localStorage.getItem('user_data') as string) : EmptyUsetState,
  
  reducers: {
    addUser: (state: Asociado, action: PayloadAction<Asociado>) => {
      setAndPersistDbUserState(action.payload)
      return action.payload
    },
    removeUser: () =>{
      localStorage.removeItem('user_data')
      return EmptyUsetState
    }


  },
});



export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
