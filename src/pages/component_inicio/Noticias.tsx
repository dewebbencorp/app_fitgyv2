
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";
import { useEffect } from 'react';
// Import Swiper styles
import 'swiper/css';
import './css/noticias.css'
import { NewsData } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { fetchNewsData } from '../../axios/News';
const Noticias = () => {

    
    const fotos: NewsData[] = useSelector((state: NewsData[]) => state.news_dta);
    const baseFolder = "https://187.188.16.29:4431/webservice-app/anuncios/";

    const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

    useEffect(() => {
        dispatch(fetchNewsData());
    }, []);




    return (
        <div className="noticias">

            <h4 className='kenyan'><i> NOTICIAS </i></h4>

            <Swiper
                className='swiper'
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}>

                {fotos.map((item, index) => (
                    <SwiperSlide className='slide' key={index}><img src={baseFolder + item.Img} /></SwiperSlide>
                ))}



            </Swiper>

        </div>

    );

}
export default Noticias;