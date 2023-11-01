import {
  IonAccordion,
  IonAccordionGroup,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { CuponList as cpl } from "../../interfaces";
import "./cupon.css";
import { ShareBarcode } from "./ShareBarcode";

export const CuponL = (data: any) => {
  const res: cpl[] = data.data;

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "black",
        paddingTop: "0",
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
              <IonCol>Fecha generado </IonCol>
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
                        {list.generado
                          .slice(0, 10)
                          .split("-")
                          .reverse()
                          .join("-")}
                      </IonCol>
                    </IonRow>
                  </div>
                  <div className="slotac" slot="content">
                    <ShareBarcode
                      code={list.codigo}
                      name={list.beneficiario}
                      view={false}
                    />
                  </div>
                </IonAccordion>
              </IonAccordionGroup>
            ))}
        </IonGrid>
      </div>
    </main>
  );
};
