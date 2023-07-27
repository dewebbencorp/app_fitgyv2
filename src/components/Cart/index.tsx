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
import { useHistory } from "react-router";
import { CartI, order } from "../../interfaces";
import "./cart.css";
export const Cart = () => {
  const { performSQLAction, initialized } = useSQLiteDB();
  const history = useHistory();
  const [items, setItems] = useState<Array<CartI>>();

  // useEffect to load data on component mount
  useEffect(() => {
    setTimeout(() => {
      loadData();
    }, 100);
  }, []);

  const loadData = async () => {
    try {
      // query db
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const total = await db?.query(
          `SELECT 
          id_order, name_product,
          price,
          COUNT(name_product) AS total_product,
          SUM(price) AS total_price,
          image_url  

          FROM orders
          GROUP BY 
          name_product `
        );
        const select = await db?.query(`SELECT  * FROM orders `);
        console.log(select?.values);
        const result = total?.values;
        console.log(result);
        if (result != undefined) {
          setItems(result);
        }
      });
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <>
      <div className="cart-main-container">
        <IonButtons slot="start">
          <IonButton onClick={() => handleBackClick()}>
            <HiChevronLeft style={{ fontSize: "2rem" }} />
            <IonLabel>
              <h5>Mi carrito</h5>
            </IonLabel>
          </IonButton>
        </IonButtons>

        <div className="cart-main">
          <div className="cart-container">
            {items &&
              items.map((food) => (
                <>
                  <div className="card-container-food" key={food.id_order}>
                    <div className="card-food">
                      <div className="icon-container-food">
                        <img className="icon_food" src={food.image_url} />
                      </div>
                      <div className="card-description-food">
                        <h1 className="title-food">{food.name_product}</h1>
                        <h2 className="description-food limit-text ">
                          <h5>{"$" + food.price}</h5>
                        </h2>
                      </div>
                    </div>

                    <div className="total-product-container">
                      <h5 className="total-product">{food.total_product}</h5>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
        <div>pay</div>
      </div>
    </>
  );
};
