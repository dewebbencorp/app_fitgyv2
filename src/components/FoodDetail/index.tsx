import { IonButton, IonButtons, IonToolbar } from "@ionic/react";
import { HiChevronLeft } from "react-icons/hi2";
import { useHistory, useParams } from "react-router";
import { UseFecthPost } from "../../api/post";
import { ProductoDetalle } from "../../interfaces";
import "./foodetail.css";

export const FoodDetail = () => {
  const { id } = useParams();

  const request = {
    id_Producto: id,
  };
  console.log(id);

  const history = useHistory();

  const handleBackClick = () => {
    history.goBack();
  };

  const { data, loading, error, detaiError } = UseFecthPost(
    request,
    "getProducto.php"
  );
  const food: ProductoDetalle = data[0];
  console.log(food);

  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={() => handleBackClick()}>
            <HiChevronLeft style={{ fontSize: "2rem" }} />
          </IonButton>
        </IonButtons>
      </IonToolbar>

      {loading && <div>Cargando...</div>}
      {food && (
        <div className="main-container-food">
          <h1>
            <div className="food-image-container">
              <img className="img-food-detail" src={food.media_url} />
            </div>
            <div className="food-description-container">
              <div className="title-food">
                {" "}
                <h1>{food.nombreProducto}</h1>{" "}
              </div>
              <div className="categoria-food">
                <h5>Categoria</h5>
                <h5>{food.categoria}</h5>
              </div>
              <div className="description-food">
                <p>{food.descripcion}</p>
              </div>
            </div>
          </h1>
        </div>
      )}
    </>
  );
};
