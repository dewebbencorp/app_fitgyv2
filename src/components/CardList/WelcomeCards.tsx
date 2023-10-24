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
          
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginTop: "0rem",
            position: "absolute",
            top: "0",
            right: "-0.1rem",
            fontSize: "2rem",
          }}
        >
          <AiOutlineCloseCircle onClick={() => backButtonHandler()} />
        </div>
          <h1>Agrega una nueva tarjeta</h1>
          <CardsList />
        </div>
      </div>
    </>
  );
};
