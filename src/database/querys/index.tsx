import {
  CapacitorSQLite,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { useSQLiteDB } from "..";
import { useEffect } from "react";
import { ProductoDetalle } from "../../interfaces";

export const GetCart = () => {
  let data: any = [];

  const { performSQLAction, initialized } = useSQLiteDB();

  const LoadData = async () => {
    try {
      // query db

      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT * FROM orders;`);

        console.log(respSelect?.values);
        data = respSelect?.values;
      });
    } catch (error) {
      alert((error as Error).message);
    }

    return data;
  };

  // INSERT
  initialized;
  LoadData();
  return { data };
};

/*

export const AddToCard = (data: ProductoDetalle) => {
  const { performSQLAction, initialized } = useSQLiteDB();

  try {
    // add test record to db
    performSQLAction(async (db: SQLiteDBConnection | undefined) => {
      await db?.query(
        `INSERT INTO orders (name_client, name_product,price )
        VALUES (?,?,?);`,
        [data.nombreProducto, "sebas", 250.32]
      );

      // update ui
      const respSelect = await db?.query(`SELECT * FROM orders;`);
      console.log(respSelect?.values);
    });
  } catch (error) {
    alert((error as Error).message);
  }
};


*/