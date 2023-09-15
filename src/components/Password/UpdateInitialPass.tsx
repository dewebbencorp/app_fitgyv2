import { useState } from "react";
import { ChangePassword } from "../Profile/ChangePassword";
import "./pwd.css";
import { Asociado } from "../../interfaces";
import { useSelector } from "react-redux";

export const UpdateInitialPass = () => {
  const user: Asociado = useSelector((state: Asociado) => state.user);

  return (
    <>
      {user.passedit == 0 && user.Clav_Asociado ? (
        <div className="Initial-pass-container" style={{ marginTop: "10vh" }}>
          <ChangePassword />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
