import { useEffect } from "react";


export const AddCard = ({ setModal }: any) => {

    const backButtonHandler = () => {
        setModal(false); // Cerrar el modal
    };

    useEffect(() => {
        document.addEventListener('ionBackButton', backButtonHandler);
        return () => {
            document.removeEventListener('ionBackButton', backButtonHandler);
        };
    }, []);
    return (
        <>
            <button onClick={backButtonHandler}>close</button>
            hello
        </>
    )
}