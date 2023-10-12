import {
  IonAccordion,
  IonAccordionGroup,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { CuponList as cpl } from "../../interfaces";
import "./cupon.css";

export const CuponL = (data: any) => {
  const res: cpl[] = data.data;

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "black",
        paddingTop: "1rem",
        width: "100%",
        fontFamily: "Poppins",
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "black",
          overflowY: "scroll",
          maxHeight: "100vh",
        }}
      >
        <IonGrid>
          <div>
            <IonRow class="title-row-2">
              <IonCol>Asociado</IonCol>
              <IonCol>Vencimiento</IonCol>
            </IonRow>
          </div>
          {res &&
            res.map((list: cpl) => (
              <IonAccordionGroup>
                <IonAccordion value="first">
                  <div
                    slot="header"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "0.8rem",
                      marginBottom: "2rem",
                      border: "1px solid orangered",
                      borderRadius: "0.5rem",
                      backgroundColor: "black",
                      height: "2.5rem",
                    }}
                  >
                    <IonRow>
                      <IonCol>
                        {list.clave_asociado}-{list.asociado.slice(0, 6)} ...
                      </IonCol>
                      <IonCol>
                        {list.vencimiento
                          .slice(0, 10)
                          .split("-")
                          .reverse()
                          .join("-")}
                      </IonCol>
                      
                    </IonRow>
                  </div>
                  <div className="slotac" slot="content">
                    <span>Generado por :</span>
                    <p>
                      {list.asociado.slice(0, 1).toUpperCase() +
                        list.asociado.toLowerCase().slice(1, 100)}
                    </p>
                    <span>Befeficiario : </span>
                    <p>
                      {list.beneficiario.slice(0, 1).toUpperCase() +
                        list.beneficiario.toLowerCase().slice(1, 100)}
                    </p>

                    <span>Detalle :</span>
                    <>
                      {list.utilizado ? (
                        <p>Ya se ha utilizado</p>
                      ) : (
                        <p>Aún no se ha utilizado</p>
                      )}{" "}
                    </>
                  </div>
                </IonAccordion>
              </IonAccordionGroup>
            ))}
        </IonGrid>
      </div>
    </main>
  );
};
