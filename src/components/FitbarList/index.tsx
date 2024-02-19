import "./fitbar.css";
import {
  IonButtons,
  IonContent,
  IonProgressBar,
  IonRouterLink,
  IonToolbar,
} from "@ionic/react";
import { ProductoCategorias } from "../../interfaces";
import { useEffect, useState } from "react";
import car_img from "./../FoodDetail/images/img_car.png";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useHistory } from "react-router";
import { fetchTypesFood } from "../../axios/Food";
import { cartTotal as totalState } from "../../store/services/cart";
import { Loading } from "../LoadScreen";
import { HiChevronLeft } from "react-icons/hi2";

export const FitbarList = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const food: ProductoCategorias = useSelector(
    (state: ProductoCategorias) => state.types_food
  );

  const history = useHistory();

  const handleBackClick = () => {
    
    window.location.href = "/home/fitgroup";
  };

  useEffect(() => {
    document.addEventListener("ionBackButton", (ev: any) => {
      ev.detail.register(10, () => {
        handleBackClick();
      });
    });
  }, []);

  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  useEffect(() => {
    if (food) {
      setLoading(false);
    }
    getData();
  }, []);
  const goToCart = () => {
    history.push("/carrito", { prevPath: history.location.pathname });
  };

  const getData = async () => {
    const res = await dispatch(fetchTypesFood());
    setCartTotal(totalState().total_length);
    if (res) {
      setLoading(false);
    }
  };

  const handleDivClick = (id: number) => {
    history.push(`/fitbar/food/${id}`);
  };

  const Food = Object.values(food);

  const categorias: ProductoCategorias[] = Food.filter(
    (item) =>
      typeof item === "object" && item !== null && "id_categoria" in item
  );

  return (
    <>
      {loading && <Loading />}
      <IonContent id="ion-fitbar">
        <IonToolbar class=" bg-gradient-to-r from-[#ff7d04] to-[#ec540d]  rounded-bl-[3rem] animate-appearance-in-2">
          <IonButtons slot="start">
            <HiChevronLeft
              onClick={() => handleBackClick()}
              className=" absolute z-10 left-[-0.2rem] top-[-6.5rem] text-[2.5rem]"
            />
          </IonButtons>

          <div className="header-info">
            <h2 className="header-title-1">Realiza tu pedido </h2>
            <h2 className="header-title-1">a través de</h2>
            <span className="progresbar-line">
              <IonProgressBar value={1} color="light" className="custom-pg" />
            </span>

            <h1 className="header-title-2">WhatsApp</h1>
          </div>
        </IonToolbar>

        <div className="main-contaier animate-appearance-in">
          {categorias?.map((type_food) => (
            <div
              className="card-container"
              onClick={() => handleDivClick(type_food.id_categoria)}
              key={type_food.id_categoria}
            >
              <div className="card">
                <div className="icon-ctn">
                  {type_food.id_categoria === 7 ? (
                    <img
                      className="icon_type_food-2"
                      src={type_food.media_url}
                    />
                  ) : (
                    <img className="icon_type_food" src={type_food.media_url} />
                  )}
                </div>

                <div className="card-description">
                  <h1 className="title">{type_food.nombre}</h1>
                  <h2 className="description ">
                    {type_food.descripcion.slice(0, 18) + "..."}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className=" float-cart">
          {cartTotal > 0 && <span> {cartTotal}</span>}
          <img onClick={() => goToCart()} className="car" src={car_img} />
        </div>
      </IonContent>
    </>
  );
};
