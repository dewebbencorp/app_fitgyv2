import { useEffect } from "react"
import { NewsData } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { fetchNewsData } from "../../axios/News";

export const News = () => {


    const news: NewsData = useSelector(
        (state: NewsData) => state.news_dta
    );

    const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
    useEffect(() => {
        dispatch(fetchNewsData());
    }, [dispatch]);

    console.log(news);

    return (
        <>
            <h1>Hello </h1>
        </>
    )

} 