import { useEffect, useState } from "react";
import { useSQLiteDB } from "../../database";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { IonButton, IonButtons, IonToolbar } from "@ionic/react";
import { HiChevronLeft } from "react-icons/hi2";
import { BsWhatsapp } from "react-icons/bs";
import { IoSadSharp } from "react-icons/io5";
import { useHistory } from "react-router";
import { CartI, CartTotal } from "../../interfaces";
import "./cart.css";
import { sendWhatsAppMessage } from "./senMessage";
import { AiFillDelete } from "react-icons/ai";

export const Cart = () => {
  const { performSQLAction, initialized } = useSQLiteDB();
  const history = useHistory();
  const [items, setItems] = useState<Array<CartI>>();
  const [isClear, setClear] = useState(false);
  const [total, setTotalPrice] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      loadData();
    }, 100);
  }, []);

  const loadData = async () => {
    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const total_prod = await db?.query(
          `SELECT 
          id_order, name_product,
          price,
          COUNT(name_product) AS total_product,
          image_url  

          FROM orders
          GROUP BY 
          name_product 
          ORDER BY
          date_added DESC;
          `
        );
        const totalPrice = await db?.query(
          `SELECT  SUM(price) AS total_price FROM orders `
        );

        const total_price = totalPrice?.values;
        const result = total_prod?.values;

        if (result != undefined && total_price != undefined) {
          setItems(result);
          setTotalPrice(total_price[0].total_price);
        }
      });
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const dropData = async (nameProduct: string) => {
    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const drop_order = await db?.query(
          `DELETE FROM orders
            WHERE name_product = '${nameProduct}'
          `
        );

        setItems([]);

        setTimeout(() => {
          loadData();
        }, 50);
      });
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleBackClick = () => {
    history.goBack();
  };

  const handleWhatsAppClick = () => {
    sendWhatsAppMessage(items ?? [], setClear);
  };

  if (isClear) {
    setClear(false);
    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const drop_order = await db?.query(`DELETE FROM orders`);

        const result = drop_order;

        if (result?.values?.length == 0) {
          console.log("BORRAR TODO EL CARRITO");
          setItems([]);
          setTotalPrice(0);
        }
      });
    } catch (error) {
      alert((error as Error).message);
    }
  }
  return (
    <>
      <div className="cart-main-container">
        <div className="toolbar">
          <IonToolbar>
            <IonButtons slot="start">
              <HiChevronLeft
                onClick={() => handleBackClick()}
                style={{ fontSize: "2.5rem" }}
              />
            </IonButtons>
            <h1 className="label-title">Mi carrito</h1>
          </IonToolbar>
        </div>

        <div className="cart-main">
          <div className="cart-container">
            {items &&
              items.map((food) => (
                <>
                  <div key={food.name_product}>
                    <div className="card-container-food">
                      <div className="card-food">
                        <div className="icon-container-food">
                          <img src={food.image_url} />
                        </div>
                        <div className="card-description-food">
                          <h1 className="title-food-cart">
                            {food.name_product}
                          </h1>
                          <h2 className="price-food limit-text ">
                            {"$" + food.price}
                          </h2>
                        </div>

                        <div className="btn-options-container">
                          <AiFillDelete
                            className="btn-delete-order"
                            onClick={() => dropData(food.name_product)}
                          />
                        </div>
                      </div>

                      <div className="total-product-container">
                        <h5 className="total-product">{food.total_product}</h5>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            {items && items?.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontFamily: "keyan",
                  fontSize: "1.2rem",
                  gap: "1.5rem",
                  animation:
                    "shimmerAnimation  4s ease-in-out alternate-reverse infinite",
                }}
                className="ring"
              >
                ¡No hay productos en en carrito!
                <IoSadSharp
                  style={{
                    fontSize: "2rem",
                  }}

                  className="bell-joke"
                />
              </div>
            )}
          </div>
        </div>
        <div className="cart-total-container">
          <h4>Total</h4>
          <h5> {"$" + total}</h5>
        </div>
      </div>

      <div className="btn-pay-container" onClick={() => handleWhatsAppClick()}>
        <div className="btn-whats-container">
          <h5 className="text-got">Pedir por WhatsApp</h5>
          <BsWhatsapp className="btn-whats" />
        </div>
      </div>
    </>
  );
};
