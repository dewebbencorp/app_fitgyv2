import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Asociado, Cards, ResponseUpdate } from "../../interfaces";
import { FaCircle, FaPlus } from "react-icons/fa";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { activateCard, invalidateCard, postCardsList } from "../../axios/Card";
import { IonModal } from "@ionic/react";
import { AddCard } from "./AddCard";
import "./cardsList.css";
import { Loading2 } from "../LoadScreen";
import { AiFillDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

export const CardsList = () => {
  const [showInput, setInput] = useState(false);
  const cardss = useSelector((state: Cards) => state.card_list);
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const user: Asociado = useSelector((state: Asociado) => state.user);

  useEffect(() => {
    dispatch(postCardsList(user.Clav_Asociado));
  }, []);

  const [checkedIndex, setCheckedIndex] = useState(0);

  const handleChecked = async (index: number, data: Cards) => {
    setCheckedIndex(index);
    toast.loading("Cargando");
    const res: ResponseUpdate = await dispatch(
      activateCard(data.id_tarjeta, user.Clav_Asociado)
    );

    if (res.status !== 1) {
      toast.dismiss();
      toast.error(res.response);
      return;
    }

    toast.dismiss();
    toast.success(res.response);
  };

  const handleDrop = async (index: number, data: Cards) => {
    if (index === 0) {
      setCheckedIndex(index);
      return;
    }

    const res: ResponseUpdate = await dispatch(invalidateCard(data.id_tarjeta));

    if (res.status !== 1) {
      toast.dismiss();
      toast.error(res.response);
      return;
    }

    toast.dismiss();
    toast.success(res.response);
    dispatch(postCardsList(user.Clav_Asociado));
  };

  return (
    <>
      <Toaster />
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

          <h5>Agregar</h5>
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
              {checkedIndex !== index && (
                <AiFillDelete
                  style={{
                    fontSize: "1.8rem",
                    marginRight: "0.7rem",
                    color: "red",
                  }}
                  onClick={() => handleDrop(index, card)}
                />
              )}
              <div>
                <span>{card.numTarjeta}</span>
                <span className={checkedIndex === index ? " act " : " act2 "}>
                  {checkedIndex === index ? " (Activa) " : "(Desactivada)"}
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
