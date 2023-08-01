import { useEffect, useState } from "react";
import { useSQLiteDB } from "../../database";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { fetchTypesFood } from "../Food";
import { ProductoCategorias } from "../../interfaces";
import { addFoodTypes } from "../../store/slices/typeFoodSlice";

export const Repo = () => {
  const [query, setQuery] = useState([]);

  const [view, setView] = useState([]);
  const { initialized, performSQLAction } = useSQLiteDB();
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const food: ProductoCategorias[] = useSelector(
    (state: any) => Object.values(state.types_food) // Convertir el objeto a un arreglo
  );

  useEffect(() => {
    if (initialized) {
      getData();
    }
  }, [initialized]);

  const getData = async () => {
    await performSQLAction(async (db: SQLiteDBConnection | undefined) => {
      const totalPrice = await db?.query(
        `SELECT SUM(price) AS total_price FROM orders`
      );

      const total_price = totalPrice?.values || [];

      setQuery(total_price);
    });
  };

  useEffect(() => {
    chdata();
  }, [query]);

  const chdata = () => {  
    console.log(food.length);
    
    if (12 < 6) {
      console.log("FETCH DATA");
      dispatch(fetchTypesFood())
      
      
      
    } else {
      console.log("DB LOCAL");
      dispatch(addFoodTypes(query))
    }


  };

  return view;
};
