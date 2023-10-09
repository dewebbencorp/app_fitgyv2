import { IonContent, IonToolbar } from "@ionic/react";
import { Toaster, toast } from "react-hot-toast";
import { RiSubtractFill } from "react-icons/ri";

import "./foodetail.css";

import { useEffect, useState } from "react";

import { BsPlus } from "react-icons/bs";

export const UpdateOrder = ({ food }): any => {
  console.log(food);


  const {img_url, id_producto, product,price, total } = food
  const [t, setTotal] = useState<number>(food ? total : 0);
  return (
    <>
      <Toaster />

      {food && (
        <IonContent>
          <div className="gmt">.</div>
          <div className="main-container-food" key={id_producto}>
            <div className="food-image-container">
              <img src={img_url} />
            </div>

            <div className="food-description-container">
              <div className="title-food">
                {" "}
                <h1>{product}</h1>{" "}
              </div>
              <div className="categoria-food"></div>
              <div className="description-food">
                <h5>{<div>{product}</div>}</h5>
              </div>
            </div>
          </div>

          <div className="car-options-container">
            <div className="btn-container">
              {t > 1 ? (
                <RiSubtractFill
                  style={{ fontSize: "2em" }}
                  onClick={() => setTotal(t - 1)}
                />
              ) : (
                <RiSubtractFill style={{ fontSize: "2em", opacity: "0.5" }} />
              )}
              <p style={{ marginLeft: "4vw", fontSize: "1em" }}> {t}</p>
              <BsPlus
                style={{ fontSize: "2em", marginLeft: "4vw" }}
                onClick={() => setTotal(t + 1)}
              />
            </div>

            <div className="add-to-cart-detail">
              <p>Agregar</p>
              <p>MX${price * t}</p>
            </div>
          </div>
        </IonContent>
      )}
    </>
  );
};
