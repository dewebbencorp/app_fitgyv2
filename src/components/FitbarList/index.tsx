import "./fitbar.css";
import { IonContent, IonProgressBar, IonRouterLink } from "@ionic/react";
import { ProductoCategorias } from "../../interfaces";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useHistory } from "react-router";
import { fetchTypesFood } from "../../axios/Food";
import { goToFoodByType } from "../../store/slices/params";

export const FitbarList = () => {

  const food: ProductoCategorias = useSelector(
    (state: ProductoCategorias) => state.types_food
  );

  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  useEffect(() => {
    dispatch(fetchTypesFood());
  }, [dispatch]);

  const history = useHistory();
  const handleDivClick = (id: number) => {
    dispatch(goToFoodByType(id))
    history.push(`/home/fitbar/food/`);
  };

  const Food = Object.values(food);

  // Filtrar los elementos que cumplen con la interfaz ProductoCategorias
  const categorias: ProductoCategorias[] = Food.filter(
    (item) =>
      typeof item === "object" && item !== null && "id_categoria" in item
  );

  return (
    <>

      <IonContent>
        <div className="header-info-container">
          <div className="header-info">
            <h2 className="header-title-1">
              Realiza tu pedido a través de
            </h2>
            <span className="progresbar-line">
              <IonProgressBar value={1} color="light" className="custom-pg" />
            </span>

            <h1 className="header-title-2">
              WhatsApp
            </h1>
          </div>
        </div>
        <div className="main-contaier">
          {categorias?.map((type_food) => (
            <div
              className="card-container"
              onClick={() => handleDivClick(type_food.id_categoria)}
              key={type_food.id_categoria}
            >
              <div className="card">
                <div className="icon-container">
                  <img className="icon_type_food" src={type_food.media_url} />
                </div>
                <div className="card-description">
                  <h1 className="title">{type_food.nombre}</h1>
                  <h2 className="description limit-text ">
                    {type_food.descripcion + "..."}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </>
  );


};
