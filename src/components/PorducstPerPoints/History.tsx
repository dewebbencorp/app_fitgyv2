import { useEffect, useState } from "react"
import { Asociado, ComprasHistorial } from "../../interfaces"
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { purchaseHistory } from "../../axios/Food";

interface PchHistoryProps {
    user: number;
}
const tableStyles = {
    borderCollapse: 'separate', // Cambiado a 'separate' para usar borderSpacing
    borderSpacing: '0 10px',    // Espacio vertical de 10px entre filas
    width: '100%',
    border: '1px solid black'
  };
  
  
  const cellStyles = {
    border: '1px solid white',
    padding: '8px',
    textAlign: 'left'
  };
  
  const responsiveStyles = {
    overflowX: 'auto',
    backgroundColor: 'black',
    margin:'1rem',
    textAlign: 'center'
  };
export const PchHistory = ({ user }: PchHistoryProps) => {
    const [history, setHis] = useState<ComprasHistorial[]>();
    const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const his = await dispatch(purchaseHistory(user));
            setHis(his);
        } catch (error) {
            console.error("Error fetching purchase history:", error);
        }
    };

    return (
        <>



            {
                history && history.map(list =>

                    <div style={responsiveStyles}>
                    <table style={tableStyles}>
                      <tbody>
                        <tr>
                          <th style={cellStyles}>Detalle</th>
                          <th style={cellStyles}>Ticket</th>
                          <th style={cellStyles}>Monto</th>
                          <th style={cellStyles}>Fecha</th>
                          <th style={cellStyles}>Saldo</th>
                          <th style={cellStyles}>Tipo</th>
                          <th style={cellStyles}>Total</th>
                        </tr>
                        <tr>
                          <td style={cellStyles}>{list.detalle}</td>
                          <td style={cellStyles}>{list.ticket}</td>
                          <td style={cellStyles}>{list.monto}</td>
                          <td style={cellStyles}>{list.fecha}</td>
                          <td style={cellStyles}>{list.saldo}</td>
                          <td style={cellStyles}>{list.tipo}</td>
                          <td style={cellStyles}>{list.total}</td>
                        </tr>
                      </tbody>
                    </table>
                 
                  </div>

                )
            }
        </>
    );
};
