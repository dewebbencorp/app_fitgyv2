import { IonButtons, IonContent, IonToolbar } from "@ionic/react";
import { Toaster, toast } from "react-hot-toast";
import { HiChevronLeft } from "react-icons/hi2";
import { useParams } from "react-router";
import { RiSubtractFill } from "react-icons/ri";
import { Cart, ProductoDetalle } from "../../interfaces";
import "./foodetail.css";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { postFoodDetail } from "../../axios/Food";
import { Loading } from "../LoadScreen";
import { BsPlus } from "react-icons/bs";
import { addProduct } from "../../store/slices/cart";

export const FoodDetail = () => {
  const [loading, setLoadig] = useState(true);
  const [food, setFood] = useState<ProductoDetalle>();
  const [total, setTotal] = useState<number>(1);
  const [checkboxValues, setCheckboxValues] = useState({});

  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

  interface RouteParams {
    data: string;
  }
  const { data } = useParams<RouteParams>();

  const handleBackClick = () => {
    window.location.href = `/fitbar/food/${JSON.parse(data)[0].path}`;
  };

  const addToCart = async (data: ProductoDetalle, total: number) => {
    const product: Cart = {
      id_producto: data.id_producto,
      product: data.nombre,
      price: data.costo,
      total: total,
      img_url: data.img_url,
    };

    dispatch(addProduct(product));
    setTotal(1);
    toast.success("Producto añadido", {
      duration: 2000,
      position: "top-right",
      style: {
        marginTop: "1.5rem",
        borderRadius: "10px",
        background: "white",
        color: "blach",
        fontSize: ".8em",
        fontFamily: "var(--poppins)",
        fontStyle: "italic",
      },
    });
  };

  useEffect(async () => {
    const res = await dispatch(postFoodDetail(JSON.parse(data)[0].id));

    if (res.id_producto) {
      setFood(res);
      setTimeout(() => {
        setLoadig(false);
      }, 500);
    }
  }, [dispatch]);

  return (
    <>
      <Toaster />

      <IonToolbar>
        <div className="gmt">.</div>
        <IonButtons slot="start">
          <HiChevronLeft
            onClick={() => handleBackClick()}
            style={{ fontSize: "3.2rem", marginBottom: "0rem" }}
          />
        </IonButtons>
      </IonToolbar>

      {loading && <Loading />}
      {food && (
        <IonContent>
          <div className="gmt">.</div>
          <div className="main-container-food" key={food.costo}>
            <div className="food-image-container">
              <img src={food.img_url} />
            </div>

            <div className="food-description-container">
              <div className="title-food">
                {" "}
                <h1>{food.nombre}</h1>{" "}
              </div>
              <div className="categoria-food">
                <h5
                  style={{
                    color: "var(--ion-tab-bar-background)",
                    margin: "0",
                  }}
                >
                  Categoría
                </h5>
                <h5>{food.categoria}</h5>
              </div>
              <div className="description-food">
                <h5>{food.Descripcion ?? <div>{food.nombre}</div>}</h5>
              </div>
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
              className="flex justify-around items-center child:poppins child:text-[1em] w-[50%] rounded-[0.5rem] mr-2 bg-[var(--ion-tab-bar-background)] child:text-white"
              onClick={() => addToCart(food, total)}
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


