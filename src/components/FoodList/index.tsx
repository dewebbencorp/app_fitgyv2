import { IonBackButton, IonButtons, IonToolbar, IonTitle, IonButton, IonIcon } from "@ionic/react";
import './foodList.css'
import { HiChevronLeft } from "react-icons/hi2";
import { useParams } from "react-router";
import { UseFecthPost } from "../../api/post";
import { PoroductoPorCategoria, ProductoCategorias } from "../../interfaces";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useHistory } from 'react-router-dom';

import 'swiper/css';
import { h } from "ionicons/dist/types/stencil-public-runtime";


export const ListFood = () => {
    const { id } = useParams();

    const request = {
        id_Categoria: id,
    };

    const { loading, error, detaiError, data } = UseFecthPost(request)

    console.log(data);
    const producto: PoroductoPorCategoria[] = data


    const history = useHistory();


    const handleBackClick = () => {
        history.goBack();
    };

    return (
        <>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton onClick={() => handleBackClick()}>
                        <HiChevronLeft style={{ fontSize: '2rem' }}/>

                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <h1 className="title-list-food">Menu</h1>
            {loading && <div>Cargando...</div>}


            <Swiper
                className='swiper'
                spaceBetween={50}
                slidesPerView={2}
            >

                {producto?.map(food => (
                    <>

                        <SwiperSlide className='slide' key={food.id_producto}>

                            <div className="food-container">
                                <div className="image-container-food">
                                    <img className="image-food" src={food.media_url} />
                                </div>


                                <h2>{food.categoria}</h2>
                                <h2>{food.nombreProducto}</h2>
                                <h1>
                                    $ {food.costo}
                                </h1>

                            </div>
                        </SwiperSlide>


                    </>


                ))

                }




            </Swiper>







        </>
    )
}