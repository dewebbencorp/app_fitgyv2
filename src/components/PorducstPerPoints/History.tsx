import { useEffect, useState } from "react";
import { Asociado, ComprasHistorial } from "../../interfaces";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { purchaseHistory } from "../../axios/Food";
import { BiTransfer } from "react-icons/bi";
import {
  IonAccordion,
  IonAccordionGroup,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { Loading } from "../LoadScreen";

interface PchHistoryProps {
  user: Asociado;
}

export const PchHistory = ({ user }: PchHistoryProps) => {
  const [history, setHis] = useState<ComprasHistorial[]>();
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const his = await dispatch(purchaseHistory(user.Clav_Asociado));
      setHis(his);
    } catch (error) {
      console.error("Error fetching purchase history:", error);
    }
  };

  return (
    <>
      <main>
        <IonGrid>
          <IonRow class="title-row">
            <IonCol>Fecha</IonCol>
            <IonCol>Abono/Cargo</IonCol>
            <IonCol>Total</IonCol>
          </IonRow>
          {!history && <Loading />}
          <section>
            {history &&
              history.map((list) => (
                <>
                  <IonAccordionGroup>
                    <IonAccordion value="first">
                      <div slot="header">
                        <IonRow>
                          <BiTransfer />
                          <IonCol>{list.fecha}</IonCol>
                          <IonCol>
                            {list.tipo == "A " ? (
                              <div style={{color:'greenyellow'}}>+{list.monto}</div>
                            ) : (
                              <div style={{color:'#ff7b5a'}}>-{list.monto}</div>
                            )}
                          </IonCol>
                          <IonCol>{list.saldo} Pts</IonCol>
                        </IonRow>
                      </div>
                      <div className="hdetail" slot="content">
                        <h1>Producto</h1>
                        <p>{list.detalle}</p>
                      </div>
                    </IonAccordion>
                  </IonAccordionGroup>
                </>
              ))}
          </section>
        </IonGrid>
      </main>
    </>
  );
};

/* ABONO = AUMENTA

CARGO = DISMINUYE
*/
