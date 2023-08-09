import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Importar los estilos de Swiper
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { fetchNewsData } from '../../axios/News';
import { NewsData } from '../../interfaces';
import "./news.css"
import { FullScreenImage } from './fullScreenImage';

export const News = () => {

    const [showModal, setModal] = useState(false)
    const [fullImage, setFullImage] = useState<string>()
    const fotos: NewsData[] = useSelector((state: NewsData[]) => state.news_dta);
    const baseFolder = "https://187.188.16.29:4431/webservice-app/anuncios/";

    const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

    const setActiveModal = (value: boolean, image_url: string) => {
        console.log(`preview is ${value}`);
        setFullImage(image_url)
        setModal(value)
    }

    useEffect(() => {
        dispatch(fetchNewsData());
    }, []);

    return (
        <>
            <div className='news-container'>
                <h4 className='kenyan'><i> NOTICIAS </i></h4>

                <Swiper
                    className='swiper'
                    spaceBetween={0}
                    slidesPerView={2.5}
                >
                    <div >
                        {fotos.map((item, index) => (
                            <SwiperSlide className='slide' key={index}>
                                <img className="news-phono" src={baseFolder + item.Img} onClick={() => setActiveModal(true, baseFolder + item.Img)} />
                            </SwiperSlide>
                        ))}
                    </div>
                </Swiper>


            </div>
            {showModal && <FullScreenImage Image={fullImage} setModal={setModal} />}


        </>
    );
}
