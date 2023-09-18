import React, { useEffect, useState } from "react";
import "./survey.css";
import { useDispatch, useSelector } from "react-redux";
import { getQuestion, sendSurvey } from "../../axios/Survey";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Asociado, Preguntas, ResponseUpdate } from "../../interfaces";
import toast, { Toaster } from "react-hot-toast";

export const Survey = () => {
    const [selectedValue, setSelectedValue] = useState<number>(1);
    const [isVisible, setIsVisible] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const user: Asociado = useSelector((state: Asociado) => state.user);
    const question: Preguntas = useSelector((state: any) => state.survey);
    const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

    let DAYS_TO_RUN = [1, 3]  // DIAS LUNES Y MIERCOLES
    let DAY: number = 23
    let HOURS: number = 12
    let MINUTES: number = 40
    let SECONDS: number = 30

    const handleRadioChange = (event: { target: { value: React.SetStateAction<null>; }; }) => {
        setSelectedValue(event.target.value);
    };
    const backButtonHandler = () => {
        setIsVisible(false);
    };

    useEffect(() => {
        task()
        document.addEventListener('ionBackButton', backButtonHandler);
        return () => {
            document.removeEventListener('ionBackButton', backButtonHandler);
        };
    }, []);

    const task = () => {
        const date = new Date();
        const currentDate = date.getTime();
        const desiredDate = new Date(date);
        desiredDate.setHours(HOURS, MINUTES, SECONDS);
        if (DAYS_TO_RUN.includes(date.getDay()) && date.getDate() === DAY && currentDate <= desiredDate.getTime()) {
            console.log("modal");


            setIsVisible(true);
        }

        dispatch(getQuestion(user.Clav_Asociado))
    };

    const sendResponse = async () => {

        setIsButtonDisabled(true)

        toast.loading('Enviando respuesta')

        try {
            const res: ResponseUpdate = await dispatch(sendSurvey(user.Clav_Asociado, selectedValue, question.id_pregunta))
            if (res.response) {
                console.log(res.response);
                setTimeout(() => {
                    toast.dismiss()
                    toast.success(`${res.response}`)
                    setIsVisible(false)
                }, 500);
            }
        } catch (error) {
            toast.dismiss()
            toast.error(`Error ${error}`)
        }

    }



    return (
        <>
      

            <Toaster />
            {isVisible && question.detalle_pregunta && <div className="card-container-survey">
                <div className="survey-card">
                    {question ? <h1>{question.detalle_pregunta}</h1> : <h1>Lorem ipsum dolor sit amet.</h1>}
                    <div className="rating">
                        <input
                            value="5"
                            name="rating"
                            id="star5"
                            type="radio"
                            checked={selectedValue === 5}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="star5"></label>
                        <input
                            value="4"
                            name="rating"
                            id="star4"
                            type="radio"
                            checked={selectedValue === 4}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="star4"></label>
                        <input
                            value="3"
                            name="rating"
                            id="star3"
                            type="radio"
                            checked={selectedValue === 3}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="star3"></label>
                        <input
                            value="2"
                            name="rating"
                            id="star2"
                            type="radio"
                            checked={selectedValue === 2}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="star2"></label>
                        <input
                            value="1"
                            name="rating"
                            id="star1"
                            type="radio"
                            checked={selectedValue === 1}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="star1"></label>
                    </div>
                    <button className="btn-send-survey" onClick={() => sendResponse()} disabled={isButtonDisabled}>
                        Enviar
                    </button>
                </div>
            </div>
            }
        </>

    );
};
