import { useEffect, useState } from "react";
import { useSQLiteDB } from "../../database";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { IonButton, IonButtons, IonToolbar } from "@ionic/react";
import { HiChevronLeft } from "react-icons/hi2";
import { BsWhatsapp } from "react-icons/bs";
import { IoSadSharp } from "react-icons/io5";
import { useHistory } from "react-router";
import { Cart as cart, CartI, CartTotal } from "../../interfaces";
import "./cart.css";
import { sendWhatsAppMessage } from "./senMessage";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";

export const Cart = () => {
  const { performSQLAction, initialized } = useSQLiteDB();
  const pp: any = useSelector((state: any) => state.cart);
  const history = useHistory();
  const [items, setItems] = useState<cart>();
  const [isClear, setClear] = useState(false);
  const [total, setTotalPrice] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      loadData();
    }, 100);
  }, []);

  const loadData = async () => {
    if (!pp) {
      setItems([]);
      return;
    }

    setItems(pp);
  };
  
  

  const dropData = async (id_producto: number) => {
    console.log(id_producto);
    
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
              items.length > 0 &&
              items.map((food: cart) => (
                <>
                  <div key={food.id_producto}>
                    <div className="card-container-food">
                      <div className="card-food">
                        <div className="icon-container-food">
                          <img src={food.img_url} />
                        </div>
                        <div className="card-description-food">
                          <h1 className="title-food-cart">{food.product}</h1>
                          <h2 className="price-food limit-text ">
                            {"$" + food.price}
                          </h2>
                        </div>

                        <div className="btn-options-container">
                          <AiFillDelete
                            className="btn-delete-order"
                            onClick={() => dropData(food.id_producto)}
                          />
                        </div>
                      </div>

                      <div className="total-product-container">
                        <h5 className="total-product">{food.total}</h5>
                      </div>
                    </div>
                  </div>
                </>
              ))}

            {items?.id_producto ===0 && (
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
                ¡No hay productos en el carrito!
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
