import { useEffect, useState } from "react";
import { useSQLiteDB } from "../../database";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";

export const Repo = () => {
  const [query, setQuery] = useState({});
  const { initialized, performSQLAction } = useSQLiteDB();

  useEffect(() => {
    if (initialized) {
      getData();
    }
  }, [initialized]);

  const getData = async () => {
    performSQLAction(async (db: SQLiteDBConnection | undefined) => {
      const totalPrice = await db?.query(
        `SELECT  SUM(price) AS total_price FROM orders `
      );

      const total_price = totalPrice?.values;

      if(total_price!=undefined){
        setQuery(total_price)
      }

    });
  };

  return query;
};
