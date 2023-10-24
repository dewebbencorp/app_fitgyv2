import { AiOutlineCloseCircle } from "react-icons/ai";
import { CardsList } from ".";
import { useEffect } from "react";

export const WelcomeCards = ({ setModal }: any) => {
  const backButtonHandler = () => {
    setModal(false);
  };
  useEffect(() => {
    document.addEventListener("ionBackButton", backButtonHandler);
    return () => {
      document.removeEventListener("ionBackButton", backButtonHandler);
    };
  }, []);

  return (
    <>
      <div className="WC-container">
        <div className="wcl">
          <h1>Agrega una nueva tarjeta</h1>
          <CardsList/>
        </div>
      </div>
    </>
  );
};
