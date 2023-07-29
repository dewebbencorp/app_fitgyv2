import "./fitbar.css";
import { UseFecth } from "../../api/get";
import { useHistory } from "react-router-dom";
import { IonContent, IonRouterLink } from "@ionic/react";
import { ProductoCategorias } from "../../interfaces";

export const FitbarList = () => {
  const history = useHistory();
  const handleDivClick = (id: number) => {
    history.push(`/home/fitbar/food/${id}`);
  };

  const { data, loading, error, detaiError } = UseFecth("getCategorias.php");

  const categorias: ProductoCategorias[] = data;

  return (
    <>
      <div className="header-info">
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur autem
          distinctio animi ipsum omnis?
        </h1>
      </div>
      <IonContent>
        {loading && <div>Cargando...</div>}
        {error && (
          <div>
            Parece que ha ocurrido un error:{" "}
            <h1 className="error">{detaiError.toString()}</h1>
          </div>
        )}
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
                    {type_food.descripcion.slice(0, 105) + "..."}
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
