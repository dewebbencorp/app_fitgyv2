// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";
import { useState, useEffect } from 'react';
// Import Swiper styles
import 'swiper/css';
import './css/noticias.css'
const Noticias = () => {

    const [fotos, setFoto] = useState<{ Img: string, texto: string }[]>([]);
    const urlFoto = "https://187.188.16.29:4431/webservice-app/anuncios/";
    const url = "https://187.188.16.29:4431/webservice-app2/controllers/getNoticias.php";
    useEffect(() => {

        fetch(url, {
            method: 'GET', // or 'PUT'
            // data can be `string` or {object}!

            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {

                console.log(data);
                setFoto(data);


                // Manejar la respuesta del servidor




            })
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
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
                modules={[Autoplay]}


            >

                {fotos.map((item, index) => (
                    <SwiperSlide className='slide' key={index}><img src={urlFoto + item.Img} /></SwiperSlide>
                ))}



            </Swiper>

        </div>

    );

}
export default Noticias;