

import { HiChevronLeft } from "react-icons/hi2";
import { Toaster, toast } from 'react-hot-toast';
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory, useParams } from "react-router-dom";
import { ProductoPorCategoria } from "../../interfaces";
import { useSQLiteDB } from "../../database";
import { postFoodByType } from "../../axios/Food";
import { Loading } from "../LoadScreen";
import car_img from "./../FoodDetail/images/img_car.png";
import add_img from "./images/img_add.png";

import "./foodList.css";
import "swiper/css";

export const ListFood = () => {
  const [showLoading, setShowLoading] = useState(true);
  const foodByType: any = useSelector(
    (state: ProductoPorCategoria) => state.food_by_tye
  );

  const { id } = useParams()


  const history = useHistory();
  const { performSQLAction, initialized } = useSQLiteDB();
  initialized;
  const handleDetailClick = (id: number) => {
    window.location.href = `/fitbar/food/detail/${id}`
  };
  const goToCart = () => {
    history.push("/carrito");
  };



  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  useEffect(() => {
    dispatch(postFoodByType(id));

    setTimeout(() => {
      setShowLoading(false);
    }, 5000);
  }, [dispatch]);


  const data = Object.values(foodByType);

  const producto: ProductoPorCategoria[] = data.filter(
    (item) =>
      typeof item === "object" && item !== null && "id_categoria" in item
  );

  const handleBackClick = () => {


    window.location.href = '/home/fitbar'

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




  return (
    <>
      <Toaster />
      <HiChevronLeft onClick={() => handleBackClick()} style={{ fontSize: "3.2rem", marginBottom: "0rem" }} />

      <h1 className="title-list-food">The Fit Bar</h1>
      <h1 className="sub-title-list-food">MENÚ</h1>
      {foodByType[0]?.id_categoria != id && showLoading && <Loading />}

      <div className="main-fl-container">
        <Swiper className="swiper" spaceBetween={50} slidesPerView={1}>
          {producto[0]?.id_categoria != id ? <div>You need an internet connection!  </div> : (producto?.map((food) => (
            <>
              <SwiperSlide
                key={food.id_producto}
                className="slide"

              >
                <div className="food-container" onClick={() => handleDetailClick(food.id_producto)}>

                  {food.id_categoria == 4 || food.id_categoria == 5 || food.id_categoria == 6 || food.id_categoria == 7 ? (
                    <div className="image-container-food-2">
                      <img className="image-food" src={food.media_url} />
                    </div>
                  ) : <div className="image-container-food">
                    <img className="image-food" src={food.media_url} />
                  </div>}


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
          )))}


        </Swiper>

        {producto.length > 0 && producto[0].id_categoria == id && (
          <div className="got-cart">
            <img onClick={() => goToCart()} className="car" src={car_img} />
          </div>
        )}

      </div>

    </>
  );
};
