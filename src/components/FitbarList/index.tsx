import "./fitbar.css";
import { IonContent, IonRouterLink } from "@ionic/react";
import { ProductoCategorias } from "../../interfaces";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchTypesFood } from "../../repository/Food";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useHistory } from "react-router";

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
    history.push(`/home/fitbar/food/${id}`);
  };

  const valoresFood = Object.values(food);

  // Filtrar los elementos que cumplen con la interfaz ProductoCategorias
  const categorias: ProductoCategorias[] = valoresFood.filter(
    (item) =>
      typeof item === "object" && item !== null && "id_categoria" in item
  );

  return (
    <>
      <div className="header-info">
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur autem
          distinctio animi ipsum omnis?
        </h1>
      </div>
      <IonContent>
        {/*
        
        <div className="head-info">
          <h1>Cargo automatico</h1>
        </div>
        */}
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
