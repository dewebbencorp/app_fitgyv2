import { IonButtons, IonContent, IonToolbar } from "@ionic/react";
import { Toaster, toast } from "react-hot-toast";
import { RiSubtractFill } from "react-icons/ri";

import "./foodetail.css";

import { useEffect, useState } from "react";

import { BsFillArrowDownSquareFill, BsPlus } from "react-icons/bs";
import { HiChevronLeft } from "react-icons/hi2";

export const UpdateOrder = ({ food, showModal }): any => {
  console.log(food);

  const { img_url, id_producto, product, price, total } = food;
  const [t, setTotal] = useState<number>(food ? total : 0);
  return (
    <>
      <IonToolbar id="tbg">
        <IonButtons slot="start">
          <HiChevronLeft
            onClick={() => showModal(false)}
            style={{ fontSize: "3.2rem", marginBottom: "0rem" }}
          />
        </IonButtons>
      </IonToolbar>
      <Toaster />

      {food && (
        <IonContent>
          <div className="gmt-2">.</div>
          <div className="main-container-food-2" key={id_producto}>
            <div className="food-image-container-">
              <img src={img_url} />
            </div>

            <div className="food-description-container">
              <div className="title-food">
                {" "}
                <h1>{product}</h1>{" "}
              </div>
              <div className="categoria-food"></div>
              <div className="description-food">
                <h5>{<div> Precio: ${price}</div>}</h5>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  paddingTop: "1rem",
                  animation:
                    " shimmerAnimation 1s ease-in-out alternate-reverse infinite",
                }}
              >
                <span style={{ fontSize: "1rem" }}>Confirma tú pedido</span>
                <BsFillArrowDownSquareFill
                  style={{
                    fontSize: "2rem",
                    marginTop: "1rem",
                    color: "orangered",
                  }}
                />
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
