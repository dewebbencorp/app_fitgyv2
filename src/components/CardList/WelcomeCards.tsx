import { AiOutlineCloseCircle } from "react-icons/ai";
import { CardsList } from "."
import { useEffect } from "react"

export const WelcomeCards = ({ setModal }: any) => {
    const backButtonHandler = () => {
        setModal(false);
    };
    useEffect(() => {
        document.addEventListener('ionBackButton', backButtonHandler);
        return () => {
            document.removeEventListener('ionBackButton', backButtonHandler);
        };
    }, []);

    return (<>
        <div className="btn-close-update-container" onClick={backButtonHandler}>
            <AiOutlineCloseCircle className="btn-close-update" />
        </div>

        <div className="input-card-container">
            <h1>Tarjetas</h1>
            <CardsList />
        </div>
    </>)
}