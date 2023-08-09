import { IonModal } from "@ionic/react"
import "./news.css"

export const FullScreenImage = ({ Image, setModal }: any) => {

    const close = () => {
        setModal(false)
    }
    return (<>
        <IonModal isOpen={true}>
            <div className="full-image-container">

                <img src={Image} />
                <button onClick={close}>Cerrar x</button>

            </div>
        </IonModal>


    </>)
}
