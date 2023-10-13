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

  const [checkedIndex, setCheckedIndex] = useState(0);

  const handleChecked = (index: number, data: Cards) => {
    setCheckedIndex(index);
    console.table(data);
  };

  return (
    <>
      <div className="mtj">
        {!cardss[0] && <Loading2 />}

        <div className="add-card" onClick={() => setInput(true)}>
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
          cardss.map((card: Cards, index: number) => (
            <section className="card-number-ctn" key={index}>
              <input
                type="checkbox"
                name=""
                id=""
                checked={index === checkedIndex}
                onClick={() => handleChecked(index, card)}
              />
              <div>
                <span>{card.numTarjeta}</span>
                <span className={checkedIndex === index ? " act " : " act2 "}>
                  {checkedIndex === index ?  " (Activa) " : "(Desactivada)"}
                </span>
              </div>
            </section>
          ))}
      </div>

      <IonModal isOpen={showInput}>
        <AddCard setModal={setInput} />
      </IonModal>
    </>
  );
};
