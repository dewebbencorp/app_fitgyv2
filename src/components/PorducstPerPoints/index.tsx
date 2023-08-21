import { useEffect, useState } from 'react'
import './pp.css'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Asociado, ProductosPorPuntos } from '../../interfaces';
import { producsPerPoints } from '../../axios/Food';
import { IonContent } from '@ionic/react';
import { HiChevronLeft } from 'react-icons/hi2';
import { Loading2 } from '../LoadScreen';


export const PP = () => {
    const user: Asociado = useSelector((state: Asociado) => state.user);
    const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

    const backButtonHandler = () => {
        window.location.href = '/home/perfil'
    };

    const [dta, setDta] = useState<ProductosPorPuntos[]>()
    useEffect(() => {

        getPp()
        document.addEventListener('ionBackButton', backButtonHandler);
        return () => {
            document.removeEventListener('ionBackButton', backButtonHandler);
        };
    }, [])


    const getPp = async () => {
        try {
            const data = await dispatch(producsPerPoints(150));
            setDta(data)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }



    return (<>
        <HiChevronLeft onClick={() => backButtonHandler()} style={{ fontSize: "3.2rem", marginBottom: "0rem" }} />

        <IonContent>
            <div className="pp-main-container">

                <div className='pp-title'>
                    <h1>{user.puntos} PTS</h1>
                    <h3>¿Ya tienes planes para tus puntos?</h3>

                </div>
                {!dta && <> Cargando... <Loading2 /></>}

                {dta?.map(products =>

                    <>
                        <div className=" pp-card" key={products.id_producto}>
                            <div className="pts-container">
                                <div className="pts">
                                    <h5 className="pts-font">{Math.floor(products.costo)} pts</h5>
                                </div>

                            </div>
                            <h3 className='pp-card-font' >{products.nombre}</h3>

                            {Math.floor(products.costo) > user.puntos ?
                                <h4 className='pp-card-font'>Ya casi es tuyo </h4> : <h4 className='pp-card-font'>Puedes tenerlo</h4>}

                        </div>

                    </>
                )}
            </div>
        </IonContent>



    </>)
}