import { IonButton, IonButtons, IonToolbar } from "@ionic/react";
import { HiChevronLeft } from "react-icons/hi2";
import { useHistory, useParams } from "react-router";
import { UseFecthPost } from "../../api/post";
import { ProductoDetalle } from "../../interfaces";
import car_img from "./images/img_car.png";
import "./foodetail.css";
import { InAppBrowser } from "@ionic-native/in-app-browser";

export const FoodDetail = () => {
  const { id } = useParams();

  const request = {
    id_Producto: id,
  };
  console.log(id);

  const history = useHistory();
  const addToCart = (data: ProductoDetalle) => {
    console.log(data);
  };
  const handleBackClick = () => {
    history.goBack();
  };

  const { data, loading, error, detaiError } = UseFecthPost(
    request,
    "getProducto.php"
  );
  const food: ProductoDetalle = data[0];

  const sendWhatsAppMessage = (message : ProductoDetalle) => {

    const data : string = `Producto: ${message.nombreProducto}, Descripcion ${message.descripcion} ` 
    const url = `https://api.whatsapp.com/send?phone=${9981797450}&text=${encodeURIComponent(data)}`;
    InAppBrowser.create(url, '_system');
  };

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
      {error && (
        <div>
          {" "}
          <h1>Error :</h1> {detaiError.toString()}
        </div>
      )}
      {food && (
        <>
          <div className="main-container-food">
            <div className="container-food">
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
                    <h5 style={{ color: "var(--ion-tab-bar-background)" }}>
                      Categoría
                    </h5>
                    <h5>{food.categoria}</h5>
                  </div>
                  <div className="description-food">
                    <p>{food.descripcion}</p>
                  </div>
                </div>
              </h1>
            </div>
            <div className="car-options-container"> 
              <button className="btn-container"  onClick={() => sendWhatsAppMessage(food)}>
                <img src={car_img} className="car-img" />
                <div className="btn-info">Agregar al cariito</div>
              </button>

              <button style={{ backgroundColor: "var(--ion-transparent)" }}>
                <img className="car" src={car_img} />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
