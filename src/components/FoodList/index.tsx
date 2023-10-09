import { HiChevronLeft } from "react-icons/hi2";
import { Toaster, toast } from "react-hot-toast";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory, useParams } from "react-router-dom";
import { Cart, ProductoPorCategoria } from "../../interfaces";
import { useSQLiteDB } from "../../database";
import { postFoodByType } from "../../axios/Food";
import { Loading, LoadingImage } from "../LoadScreen";
import car_img from "./../FoodDetail/images/img_car.png";
import add_img from "./images/img_add.png";
import "./foodList.css";
import "swiper/css";
import { IonBackButton, IonButtons, IonToolbar } from "@ionic/react";
import { addProduct } from "../../store/slices/cart";

export const ListFood = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [producto, setProducto] = useState<ProductoPorCategoria[]>();
  const foodByType: any = useSelector(
    (state: ProductoPorCategoria) => state.food_by_tye
  );

  interface RouteParams {
    id: string;
  }

  const { id } = useParams<RouteParams>();

  const history = useHistory();
  const { performSQLAction, initialized } = useSQLiteDB();
  initialized;
  const handleDetailClick = (id: number) => {
    window.location.href = `/fitbar/food/detail/${id}`;
  };
  const goToCart = () => {
    history.push("/carrito");
  };

  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setShowLoading(true);
    const dta = await dispatch(postFoodByType(id));
    if (dta) {
      setProducto(dta);
      setShowLoading(false);
    }
  };
  const handleBackClick = () => {
    window.location.href = "/home/fitbar";
  };

  const addToCart2 = async (data: ProductoPorCategoria) => {
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
    }
  };

  const addToCart = async (data: ProductoPorCategoria) => {
    const product: Cart = {
      id_producto: data.id_producto,
      product: data.nombreProducto,
      price: data.costo,
      total: 1,
      img_url: data.media_url,
    };

    dispatch(addProduct(product));

    toast.success("Producto añadido", {
      duration: 2000,
      position: "top-center",
      style: {
        marginTop: "1rem",
        borderRadius: "10px",
        background: "white",
        color: "blach",
        fontSize: ".8em",
        fontFamily: "var(--poppins)",
        fontStyle: "italic",
      },
    });
  };
  const [loadImage, setLoadImage] = useState(true);
  const Loaded = () => {
    setLoadImage(false);
  };
  return (
    <>
      <Toaster />

      <IonToolbar>
        <IonButtons slot="start">
          <HiChevronLeft
            onClick={() => handleBackClick()}
            style={{ fontSize: "3.2rem", marginBottom: "0rem" }}
          />
        </IonButtons>
      </IonToolbar>

      <h1 className="title-list-food" style={{ color: "white" }}>
        The Fit Bar
      </h1>
      <h1 className="sub-title-list-food">MENÚ</h1>
      {foodByType[0]?.id_categoria != id && showLoading && <Loading />}

      <div className="main-fl-container">
        <Swiper className="swiper" spaceBetween={50} slidesPerView={1}>
          {foodByType[0]?.id_categoria != id ? (
            <div>You need an internet connection! </div>
          ) : (
            producto?.map((food: ProductoPorCategoria) => (
              <>
                <SwiperSlide key={food.id_producto} className="slide">
                  <div
                    className="food-container"
                    onClick={() => handleDetailClick(food.id_producto)}
                  >
                    {/* {food.id_categoria == 4 ||
                    food.id_categoria == 5 ||
                    food.id_categoria == 6 ||
                    food.id_categoria != 7 ? (
                      <div className="image-container-food-2">
                        {loadImage && <LoadingImage />}
                        <img src={food.media_url} onLoad={Loaded} />
                      </div>
                    ) : (
                      food.id_categoria != 7 && (
                        <div className="image-container-food">
                          {loadImage && <LoadingImage />}
                          <img src={food.media_url} onLoad={Loaded} />
                        </div>
                      )
                    )}

                    {food.id_categoria == 7 && (
                      <div className="image-container-food-3">
                        {loadImage && <LoadingImage />}
                        <img src={food.media_url} onLoad={Loaded} />
                      </div>
                    )} */}

                    <div className="image-container-food-finally">
                      {loadImage && <LoadingImage />}
                      <img
                        className="image-fl"
                        src={food.media_url}
                        onLoad={Loaded}
                      />
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
                        <h1 className="text-categoria">{food.categoria}</h1>
                        <h1 className="text-name-food">
                          {food.nombreProducto}
                        </h1>
                      </div>
                      <div className="price-container">
                        <h1 className="text-price-food">
                          {"$" + food.costo.toString().slice(0, -3)}
                        </h1>
                        <h1 className="vertical-text">ИXM</h1>
                      </div>
                    </div>
                  </div>

                  <div className="add-to-cart ">
                    <img src={add_img} onClick={() => addToCart(food)} />
                  </div>
                </SwiperSlide>
              </>
            ))
          )}
        </Swiper>

        {producto && producto.length > 0 && (
          <div className="got-cart">
            <img onClick={() => goToCart()} className="car" src={car_img} />
          </div>
        )}
      </div>
    </>
  );
};
