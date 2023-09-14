import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Importar los estilos de Swiper
import { useSelector, useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { fetchNewsData } from "../../axios/News";
import { NewsData } from "../../interfaces";
import "./news.css";
import { FullScreenImage } from "./fullScreenImage";
import { Loading2 } from "../LoadScreen";

export const News = () => {
  const [showModal, setModal] = useState(false);
  const [fullImage, setFullImage] = useState<string>();
  const fotos: NewsData[] = useSelector((state: NewsData[]) => state.news_dta);

  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

  const setActiveModal = (value: boolean, image_url: string) => {
    setFullImage(image_url);
    setModal(value);
  };

  useEffect(() => {
    dispatch(fetchNewsData());
  }, []);
  


  return (
    <>
      <h1 className="kenyan">
        <i> NOTICIAS </i>
      </h1>

      <div className="news-container">
        <Swiper className="swiper" spaceBetween={15} slidesPerView={2.5}>
          <div>
            {fotos ? (
              fotos.map((item, index) => (
                <SwiperSlide className="slide" key={index}>
                  <img
                    className="news-phono"
                    src={item.Img}
                    onClick={() => setActiveModal(true, item.Img)}
                  />
                </SwiperSlide>
              ))
            ) : (
              <div className="l2container">
                <h5>Cargando...</h5>
                <Loading2 />
              </div>
            )}
          </div>
        </Swiper>
      </div>
      {showModal && <FullScreenImage Image={fullImage} setModal={setModal} />}
    </>
  );
};
