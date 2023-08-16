import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import "./cardsList.css"
import { Asociado, Cards } from "../../interfaces";
import { FaCircle, FaPlus } from "react-icons/fa";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { postCardsList } from "../../axios/Card";
export const CardsList = () => {
    const cardss = useSelector((state: Cards) => state.card_list);
    const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
    const user: Asociado = useSelector((state: Asociado) => state.user);
    useEffect(() => {
        dispatch(postCardsList(user.Clav_Asociado))
    }, [])


    return (

        <>

            <div className="add-card-container">

                <FaPlus style={{ fontSize: '1.3em', color: 'orangered', fontWeight: 'bold' }} />

                <h5>Agregar otra tarjeta</h5>
            </div>


            <div className="current-card-container">

                <div className="card-list-container">
                    {cardss.length > 0 && cardss.map((card: Cards) => (



                        <div key={card.numTarjeta}>
                            <div className="card-number-container">

                                <FaCircle className={card.Activo === 1 ? "far-Icon" : "far-Icon-non-active"} />
                                {card.numTarjeta} <h5>{card.Activo === 1 ? "(Activa)" : "(Desactivada)"}</h5>
                            </div>


                        </div>


                    ))}
                </div>
            </div>
        </>
    )

}