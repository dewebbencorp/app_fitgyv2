import React, { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IonModal } from "@ionic/react";
import "./news.css";

export const FullScreenImage = ({ Image, setModal }: any) => {
  const backButtonHandler = () => {
    setModal(false); // Cerrar el modal
  };

  useEffect(() => {
    document.addEventListener("ionBackButton", backButtonHandler);
    return () => {
      document.removeEventListener("ionBackButton", backButtonHandler);
    };
  }, []);

  return (
    <IonModal className="i-modal" isOpen={true}>
      <div className="full-image-container">
        <div
          style={{
            position: "absolute",
            fontSize: "2.5rem",
            display: "flex",
            justifyContent: "center",
            top: "1.5rem",
            width: "100%",
            animation:
              "shimmerAnimation 2s ease-in-out alternate-reverse infinite",
          }}
        >
          <AiOutlineCloseCircle onClick={() => backButtonHandler()} />
        </div>

        <img src={Image} />
      </div>
    </IonModal>
  );
};
