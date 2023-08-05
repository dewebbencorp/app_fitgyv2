import { Asociado } from "../../../interfaces";

export const setAndPersistDbUserState = (userData: Asociado) => {
  localStorage.setItem(
    "user_data",
    JSON.stringify({ ...{ id: 1 }, ...userData })
  );
};
