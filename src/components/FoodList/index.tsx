import { IonBackButton, IonButtons, IonToolbar, IonTitle } from "@ionic/react";
import './foodList.css'
import { useParams } from "react-router";

export const ListFood = () => {
    const { id } = useParams();
    return (
        <>
            <IonToolbar>
                <IonTitle>Hello ListFood</IonTitle>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="//home/fitbar" />
                </IonButtons>
            </IonToolbar>
            <h1>Menu</h1>

            <div className="card-container-h">
                <div className="card-h">

                    <h3>id_food = {id}</h3>

                </div>


            </div>

            <div className="card-container-h">
                <div className="card-h">

                    <h3>id_food = {id}</h3>

                </div>


            </div>


        </>
    )
}