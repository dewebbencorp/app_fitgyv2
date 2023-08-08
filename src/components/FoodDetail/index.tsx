import { IonContent } from "@ionic/react";
import { Toaster, toast } from 'react-hot-toast';
import { HiChevronLeft } from "react-icons/hi2";
import { useHistory, useParams } from "react-router";
import { ProductoDetalle } from "../../interfaces";
import car_img from "./images/img_car.png";
import "./foodetail.css";
import { useSQLiteDB } from "../../database";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { postFoodDetail } from "../../axios/Food";
import { Loading } from "../LoadScreen";

export const FoodDetail = () => {
  const [loading, setLoadig] = useState(true)
  const history = useHistory();
  const { id } = useParams()
  const { performSQLAction, initialized } = useSQLiteDB();

  const goToCart = () => {
    history.push("/carrito");
  };

  const handleBackClick = () => {
    history.goBack();
  };

  const addToCart = async (data: ProductoDetalle) => {
    try {
      // add test record to db
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        await db?.query(
          `INSERT INTO orders ( name_product, price, image_url, name_client, date_added )
          VALUES (?,?,?,?,datetime('now'));`,
          [data.nombreProducto, data.costo, data.media_url, "sebas"]
        );

      });
    } catch (error) {
      alert((error as Error).message);
    } finally {
      toast.success('Producto añadido', {
        duration: 2000,
        position: "top-center",
        style: {
          marginTop: '1rem',
          borderRadius: '10px',
          background: 'white',
          color: 'blach',
          fontSize: '.8em',
          fontFamily: 'var(--poppins)',
          fontStyle: 'italic'
        }
      })
    }
  };

  const foodi: ProductoDetalle = useSelector(
    (state: ProductoDetalle) => state.detail_food
  );

  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  useEffect(() => {

    dispatch(postFoodDetail(id));
    setTimeout(() => {
      setLoadig(false)
    }, 500);


  }, [dispatch]);

  const food: ProductoDetalle = foodi[0];



  return (
    <>
      <Toaster />
      <HiChevronLeft onClick={() => handleBackClick()} style={{ fontSize: "3.2rem", marginBottom: "0rem" }} />
      {loading && <Loading />}
      {food && (
        <IonContent>
          <div className="main-container-food" key={food.costo}>
            {food.categoria === 'BATIDOS' || food.categoria === 'HOTCAKES Y AVENA' || food.categoria === 'SANDWICHES' ?
              <div className="food-image-container-2">
                <img className="img-food-detail" src={food.media_url} />
              </div> : <div className="food-image-container">
                <img className="img-food-detail" src={food.media_url} />
              </div>}
            <div className="container-food">
              <h1>
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
                  Agregar al carrito
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
        </IonContent>
      )}


    </>
  );
};
