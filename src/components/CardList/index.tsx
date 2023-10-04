import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Asociado, Cards } from "../../interfaces";
import { FaCircle, FaPlus } from "react-icons/fa";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { postCardsList } from "../../axios/Card";
import { IonModal } from "@ionic/react";
import { AddCard } from "./AddCard";
import "./cardsList.css";
import { Loading2 } from "../LoadScreen";
export const CardsList = () => {
  const [showInput, setInput] = useState(false);
  const cardss = useSelector((state: Cards) => state.card_list);
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const user: Asociado = useSelector((state: Asociado) => state.user);
  useEffect(() => {
    dispatch(postCardsList(user.Clav_Asociado));
  }, []);

  return (
    <>
      <div className="add-card-container" onClick={() => setInput(true)}>
        {!cardss[0] && <Loading2 />}
        <div className="card-list-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <FaPlus
              style={{
                fontSize: "1.3em",
                color: "orangered",
                fontWeight: "bold",
              }}
            />

            <h5>Agregar otra tarjeta</h5>
          </div>
          {cardss.length > 0 &&
            cardss.map((card: Cards) => (
              <div key={card.numTarjeta}>
                <div className="card-number-container">
                  <FaCircle
                    className={
                      card.Activo === 1 ? "far-Icon" : "far-Icon-non-active"
                    }
                  />
                  <h3 >{card.numTarjeta} </h3>
                  <h5>{card.Activo === 1 ? "(Activa)" : "(Desactivada)"}</h5>
                </div>
              </div>
            ))}
        </div>
      </div>

      <IonModal isOpen={showInput}>
        <AddCard setModal={setInput} />
      </IonModal>
    </>
  );
};
