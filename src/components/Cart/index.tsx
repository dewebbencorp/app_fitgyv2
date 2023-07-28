import { useEffect, useState } from "react";
import { useSQLiteDB } from "../../database";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import {
  IonButton,
  IonButtons,
  IonCardContent,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonToolbar,
} from "@ionic/react";
import { HiChevronLeft } from "react-icons/hi2";
import { BsWhatsapp } from "react-icons/bs";
import { useHistory } from "react-router";
import { CartI, CartTotal, order } from "../../interfaces";
import "./cart.css";
import { sendWhatsAppMessage } from "./senMessage";
export const Cart = () => {
  const { performSQLAction, initialized } = useSQLiteDB();
  const history = useHistory();
  const [items, setItems] = useState<Array<CartI>>();
  const [cart_total, setTotal] = useState<Array<CartTotal>>();

  // useEffect to load data on component mount
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
        /*console.log(result);
        console.log(total_price); */

        if (result != undefined && total_price != undefined) {
          setItems(result);
          setTotal(total_price);
        }
      });
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleBackClick = () => {
    history.goBack();
  };
  {
    cart_total && <h5>{"$" + cart_total[0].total_price}</h5>;
  }
  let totaL = 0;
  if (cart_total) {
    totaL = cart_total[0].total_price;
  }
  return (
    <>
      <div className="cart-main-container">
        <div className="toolbar">
          <IonButtons slot="start">
            <IonButton onClick={() => handleBackClick()}>
              <HiChevronLeft style={{ fontSize: "2rem" }} />
            </IonButton>
          </IonButtons>

          <h1 className="label-title">Mi carrito</h1>
        </div>

        <div className="cart-main">
          <div className="cart-container">
            {items &&
              items.map((food) => (
                <>
                  <div className="card-container-food" key={food.name_product}>
                    <div className="card-food">
                      <div className="icon-container-food">
                        <img className="icon_food" src={food.image_url} />
                      </div>
                      <div className="card-description-food">
                        <h1 className="title-food-cart">{food.name_product}</h1>
                        <h2 className="price-food limit-text ">
                          {"$" + food.price}
                        </h2>
                      </div>
                    </div>

                    <div className="total-product-container">
                      <h5 className="total-product">{food.total_product}</h5>
                    </div>
                  </div>
                </>
              ))}
            {!items && <div> no have producst</div>}
          </div>
        </div>
        <div className="cart-total-container">
          <h4>Total</h4>
          <h5> {"$" + totaL}</h5>
        </div>
      </div>

      <div className="btn-pay-container">
        <BsWhatsapp
          className="btn-whats"
          onClick={() => sendWhatsAppMessage(items ?? [], totaL)}
        />
      </div>
    </>
  );
};
