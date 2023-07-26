import { useEffect, useState } from "react";
import { useSQLiteDB } from "../../database";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { IonButton, IonButtons, IonToolbar } from "@ionic/react";
import { HiChevronLeft } from "react-icons/hi2";
import { useHistory } from "react-router";

export const Cart = () => {
  const { performSQLAction, initialized } = useSQLiteDB();
  const history = useHistory();
  const [items, setItems] = useState<Array<any>>();

  // useEffect to load data on component mount
  useEffect(() => {
    setTimeout(() => {
      loadData();
    },100);
  }, []);

  const loadData = async () => {
    try {
      // query db
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT * FROM orders;`);
        const result = respSelect?.values;
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
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={() => handleBackClick()}>
            <HiChevronLeft style={{ fontSize: "2rem" }} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <h1>Hello cart</h1>

      {/* Render items when available */}
      {items && (
        <ul>
          {items.map((item) => (
            <li key={item.id_order}>
              <h1> {item.id_order}</h1>
              <h2>{item.name_product}</h2>
            </li>
          ))}
        </ul>
      )}

      {/* Button to manually trigger data load */}
      <button onClick={() => loadData()}>get</button>
    </>
  );
};
