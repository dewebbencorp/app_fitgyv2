import { Asociado } from "../../../interfaces";

export const setAndPersistDbUserState = (userData: Asociado) => {
  localStorage.setItem(
    "user_data",
    JSON.stringify({ ...{ id: 1 }, ...userData })
  );
};

export const updateUserState = (userData: Partial<Asociado>) => {
  const currentState = JSON.parse(localStorage.getItem("user_data") as string);
  const updatedState = { ...currentState, ...userData };
  localStorage.setItem("user_data", JSON.stringify(updatedState));
};
