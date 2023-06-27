// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";
import {useState} from 'react';
// Import Swiper styles
import 'swiper/css';
import './css/noticias.css'
const Noticias = () =>{

    const [fotos,setFoto] = useState([]);

    return(
        <div className="noticias">
         
                 <h4 className='kenyan'><i> NOTICIAS </i></h4>

                 <Swiper
                spaceBetween={50}
                slidesPerView={3}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
             
            >
                <SwiperSlide className='slide'>Slide 1</SwiperSlide>
                <SwiperSlide className='slide'>Slide 2</SwiperSlide>
                <SwiperSlide className='slide'>Slide 3</SwiperSlide>
                <SwiperSlide className='slide'>Slide 4</SwiperSlide>
                
            </Swiper>
          
        </div>

    );

}
export default Noticias;