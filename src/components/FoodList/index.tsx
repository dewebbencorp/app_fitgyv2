import {
  IonBackButton,
  IonButtons,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
} from "@ionic/react";
import "./foodList.css";
import { HiChevronLeft } from "react-icons/hi2";
import { useParams } from "react-router";
import { UseFecthPost } from "../../api/post";
import {
  ProductoPorCategoria,
  ProductoCategorias,
  ProductoDetalle,
} from "../../interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from "react-router-dom";
import car_img from "./../FoodDetail/images/img_car.png";
import add_img from "./images/img_add.png";
import "swiper/css";
import { useSQLiteDB } from "../../database";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";

export const ListFood = () => {
  const { id } = useParams();
  const history = useHistory();
  const { performSQLAction, initialized } = useSQLiteDB();

  const goToCart = () => {
    history.push("/home/carrito");
  };

  const request = {
    id_Categoria: id,
  };

  const { loading, error, detaiError, data } = UseFecthPost(
    request,
    "getCategoria_producto.php"
  );

  const producto: ProductoPorCategoria[] = data;

  const handleBackClick = () => {
    history.goBack();
  };

  const handleDetailClick = (id: number) => {
    history.push(`/home/fitbar/food/detail/${id}`);
  };

  const addToCart = async (data: ProductoPorCategoria) => {
    try {
      // add test record to db
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        await db?.query(
          `INSERT INTO orders ( name_product, price, image_url, name_client, date_added )
          VALUES (?,?,?,?,datetime('now'));`,
          [data.nombreProducto, data.costo, data.media_url, "sebas"]
        );

        const respSelect = await db?.query(`SELECT * FROM orders;`);
        console.log(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
    } finally {
      alert("Producto añadido");
    }
  };

  return (
    <>
      <IonToolbar key={1}>
        <IonButtons slot="start">
          <IonButton onClick={() => handleBackClick()}>
            <HiChevronLeft style={{ fontSize: "2rem" }} />
          </IonButton>
        </IonButtons>
      </IonToolbar>

      <h1 className="title-list-food">The Fit Bar</h1>
      <h1 className="sub-title-list-food">Menu</h1>
      {loading && <div>Cargando...</div>}

      <Swiper className="swiper" spaceBetween={0} slidesPerView={1.5}>
        {producto?.map((food) => (
          <>
            <SwiperSlide key={food.id_producto} className="slide">
              <div
                className="food-container"
                onClick={() => handleDetailClick(food.id_producto)}
              >
                <div className="image-container-food">
                  <img className="image-food" src={food.media_url} />
                </div>

                <div className="description-info-container">
                  <div className="description-list-food">
                    <h1
                      style={{
                        fontSize: "0.4rem",
                        letterSpacing: "0.2rem",
                        margin: "0",
                      }}
                    >
                      {" "}
                      • • • • • •{" "}
                    </h1>

                    <h2 className="text-categoria">{food.categoria}</h2>
                    <h1 className="text-name-food">{food.nombreProducto}</h1>
                  </div>
                  <div className="price-container">
                    <h1 className="text-price-food">
                      {"$" + food.costo.slice(0, -3)}
                    </h1>
                    <h1 className="vertical-text">ИXM</h1>
                  </div>
                </div>
              </div>

              <div className="add-to-cart">
                <img src={add_img} onClick={() => addToCart(food)} />
              </div>
            </SwiperSlide>
          </>
        ))}
      </Swiper>

      {!loading && (
        <div className="got-cart">
          <img onClick={() => goToCart()} className="car" src={car_img} />
        </div>
      )}
    </>
  );
};
