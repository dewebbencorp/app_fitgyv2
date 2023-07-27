import { IonButton, IonButtons, IonToolbar } from "@ionic/react";
import { HiChevronLeft } from "react-icons/hi2";
import { useHistory, useParams } from "react-router";
import { UseFecthPost } from "../../api/post";
import { ProductoDetalle } from "../../interfaces";
import car_img from "./images/img_car.png";
import "./foodetail.css";
import { useSQLiteDB } from "../../database";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
export const FoodDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const { performSQLAction, initialized } = useSQLiteDB();
  const request = {
    id_Producto: id,
  };

  const handleBackClick = () => {
    history.goBack();
  };

  const goToCart = () => {
    history.push("/home/carrito");
  };

  const { data, loading, error, detaiError } = UseFecthPost(
    request,
    "getProducto.php"
  );

  const addToCart = async (data: ProductoDetalle) => {
    try {
      // add test record to db
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        await db?.query(
          `INSERT INTO orders ( name_product, price, image_url, name_client )
          VALUES (?,?,?,?);`,
          [data.nombreProducto, data.costo, data.media_url,"sebas"]
        );
        
        const respSelect = await db?.query(`SELECT * FROM orders;`);
        console.log(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const food: ProductoDetalle = data[0];

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
                    <h5>
                      {food.descripcion ?? (
                        <div>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Unde, eligendi?
                        </div>
                      )}
                    </h5>
                  </div>
                </div>
              </h1>
            </div>
            <div className="car-options-container">
              <button className="btn-container">
                <img src={car_img} className="car-img" />
                <div className="btn-info" onClick={() => addToCart(food)}>
                  Agregar al cariito
                </div>
              </button>

              <button
                style={{ backgroundColor: "var(--ion-transparent)" }}
                onClick={() => goToCart()}
              >
                <img className="car" src={car_img} />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
