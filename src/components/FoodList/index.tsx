import { IonBackButton, IonButtons, IonToolbar, IonTitle } from "@ionic/react";
import './foodList.css'
import { useParams } from "react-router";
import { UseFecthPost } from "../../api/post";
import { PoroductoPorCategoria, ProductoCategorias } from "../../interfaces";


export const ListFood = () => {
    const { id } = useParams();

    const request = {
        id_Categoria: id,
    };

    const { data, error, detaiError } = UseFecthPost(request)

    console.log(data);
    const producto : PoroductoPorCategoria[] = data

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

                {producto?.map(food => (
                    <div className="card-h" key={food.id_producto}>
                        <div className="card-content">
                            <img className="card-img" src={food.media_url} />

                        </div>

                        <div className="card-text">
                            <div className="text-categoria">
                                <h1 className="sub-title">{food.categoria}</h1>
                                <h1 className="title"> {food.nombreProducto}</h1>
                            </div>
                            <h5 className="price">$ {food.costo}</h5>
                        </div>
                    </div>
                ))}



            </div>




        </>
    )
}