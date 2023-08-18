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

        <div className="WC-container">
            <h1 style={{ fontFamily: 'var(--poppins)', fontSize: '1.7em', marginTop:'5vh',marginBottom:'3vh' }}>Agrega una nueva tarjeta</h1>
            <div style={{ paddingRight: '2rem' }}>

                <CardsList />
            </div>
        </div>
    </>)
}