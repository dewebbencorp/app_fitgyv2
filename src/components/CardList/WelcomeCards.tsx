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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "0rem",
          }}
        >
          <AiOutlineCloseCircle
            className="btn-close-update"
            onClick={backButtonHandler}
          />
        </div>
        <h1
          style={{
            fontFamily: "var(--poppins)",
            fontSize: "1.7em",
            marginTop: "5vh",
            marginBottom: "3vh",
          }}
        >
          Agrega una nueva tarjeta
        </h1>
        <div style={{ paddingRight: "2rem" }}>
          <CardsList />
        </div>
      </div>
    </>
  );
};
