import React, { useState, useEffect } from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IonModal } from "@ionic/react";
import "./news.css";

export const FullScreenImage = ({ Image, setModal }: any) => {

    const backButtonHandler = () => {
        setModal(false); // Cerrar el modal
    };

    useEffect(() => {
        document.addEventListener('ionBackButton', backButtonHandler);
        return () => {
            document.removeEventListener('ionBackButton', backButtonHandler);
        };
    }, []);

    return (
        <IonModal className="i-modal" isOpen={true}>
            <div className="full-image-container">

                <AiOutlineCloseCircle className="btn-close-new" onClick={() => backButtonHandler()} />
                <img src={Image} />

            </div>
        </IonModal>
    );
};
