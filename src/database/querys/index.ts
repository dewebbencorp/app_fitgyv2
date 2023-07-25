import {
  CapacitorSQLite,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { useSQLiteDB } from "../../database";
import { useEffect } from "react";
import { ProductoDetalle } from "../../interfaces";

// DATABASE

// hook for sqlite db
const { performSQLAction, initialized } = useSQLiteDB();
// SELECT
useEffect(() => {
  loadData();
}, [initialized]);
const loadData = async () => {
  try {
    // query db
    performSQLAction(async (db: SQLiteDBConnection | undefined) => {
      const respSelect = await db?.query(`SELECT * FROM orders;`);
      console.log(respSelect?.values);
    });
  } catch (error) {
    alert((error as Error).message);
  }
};

// INSERT

const addItem = async (data: ProductoDetalle) => {
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
