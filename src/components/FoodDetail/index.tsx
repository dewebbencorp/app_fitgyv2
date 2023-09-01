import { IonCheckbox, IonContent, IonItem, IonToggle } from "@ionic/react";
import { Toaster, toast } from "react-hot-toast";
import { HiChevronLeft } from "react-icons/hi2";
import { useHistory, useParams } from "react-router";
import { RiSubtractFill } from "react-icons/ri";
import { ProductoDetalle } from "../../interfaces";

import "./foodetail.css";
import { useSQLiteDB } from "../../database";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { postFoodDetail } from "../../axios/Food";
import { Loading } from "../LoadScreen";
import { BsPlus } from "react-icons/bs";

export const FoodDetail = () => {
  const [loading, setLoadig] = useState(true);
  const [total, setTotal] = useState<number>(1);
  const [checkboxValues, setCheckboxValues] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const { performSQLAction, initialized } = useSQLiteDB();

  const options = [
    "Arroz",
    "Salsa italiana",
    "Pimienta",
    "Zanahoria",
    // Agrega más opciones aquí si es necesario
  ];

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  const goToCart = () => {
    history.push("/carrito");
  };

  const handleBackClick = () => {
    history.goBack();
  };

  const addToCart = async (
    data: ProductoDetalle,
    total: number,
    complements: any
  ) => {
    try {
      // add test record to db
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        for (let i = 0; total - 1 >= i; i++) {
          console.log(" soy un el numero", i, "de ", total);

          await db?.query(
            `INSERT INTO orders ( name_product, price, image_url, name_client, date_added )
            VALUES (?,?,?,?,datetime('now'));`,
            [data.nombre, data.costo, data.img_url, "dev"]
          );
        }
        setTotal(1);
      });
    } catch (error) {
      alert((error as Error).message);
    } finally {
      toast.success("Producto añadido", {
        duration: 2000,
        position: "top-center",
        style: {
          marginTop: "1rem",
          borderRadius: "10px",
          background: "white",
          color: "blach",
          fontSize: "0.8em",
          fontFamily: "var(--poppins)",
          fontStyle: "italic",
        },
      });
    }
  };

  const foodi: any = useSelector((state: ProductoDetalle) => state.detail_food);

  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  useEffect(() => {
    dispatch(postFoodDetail(id));
    setTimeout(() => {
      setLoadig(false);
    }, 500);
  }, [dispatch]);

  const food: ProductoDetalle = foodi[0];

  console.log(checkboxValues);

  return (
    <>
      <Toaster />

      <HiChevronLeft
        onClick={() => handleBackClick()}
        style={{ fontSize: "3.2rem", marginBottom: "0rem" }}
      />
      {loading && <Loading />}
      {food && (
        <IonContent>
          <div className="main-container-food" key={food.costo}>
            {food.categoria === "BATIDOS" ||
            food.categoria === "HOTCAKES Y AVENA" ||
            food.categoria === "SANDWICHES" ? (
              <div className="food-image-container-2">
                <img className="img-food-detail" src={food.img_url} />
              </div>
            ) : (
              <div className="food-image-container">
                <img className="img-food-detail" src={food.img_url} />
              </div>
            )}
            <div>
              <h1>
                <div className="food-description-container">
                  <div className="title-food">
                    {" "}
                    <h1>{food.nombre}</h1>{" "}
                  </div>
                  <div className="categoria-food">
                    <h5 style={{ color: "var(--ion-tab-bar-background)" }}>
                      Categoría
                    </h5>
                    <h5>{food.categoria}</h5>
                  </div>
                  <div className="description-food">
                    <h5>{food.Descripcion ?? <div>{food.nombre} Lorem ipsum dolor sit amet consectetur adipisicing.</div>}</h5>
                  </div>
                </div>
              </h1>
            </div>
          </div>

          {/*

           TODO 

          {options.map((option) => (

            <div className="add-complement-container">
              <p> {option}</p>
              <input
                type="checkbox"
                name={option}
                checked={checkboxValues[option] || false}
                onChange={handleCheckboxChange}
                className="checkbox-input"
              />

            </div>



          ))}


        
        */}

          <div className="car-options-container">
            <div className="btn-container">
              {total > 1 ? (
                <RiSubtractFill
                  style={{ fontSize: "2em" }}
                  onClick={() => setTotal(total - 1)}
                />
              ) : (
                <RiSubtractFill style={{ fontSize: "2em", opacity: "0.5" }} />
              )}
              <p style={{ marginLeft: "4vw", fontSize: "1em" }}> {total}</p>
              <BsPlus
                style={{ fontSize: "2em", marginLeft: "4vw" }}
                onClick={() => setTotal(total + 1)}
              />
            </div>

            <div
              className="add-to-cart-detail"
              onClick={() => addToCart(food, total, checkboxValues)}
            >
              <p>Agregar</p>
              <p>MX${food.costo * total}</p>
            </div>
          </div>
        </IonContent>
      )}
    </>
  );
};
