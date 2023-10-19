import { useEffect, useState } from "react";
import points from "./images/ponts.png";
import schedule from "./images/schedule.png";
import {
  IonActionSheet,
  IonButtons,
  IonContent,
  IonModal,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../store/slices/userSlice";
import { App } from "@capacitor/app";
import { Asociado } from "../../interfaces";
import "./profile.css";
import { UpdateProfile } from "./UpdateProfile";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GetDeadLine } from "./GetDeadLine";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { uploadPhono } from "../../axios/User";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Toaster, toast } from "react-hot-toast";
import { close, cloudUpload } from "ionicons/icons";
import { SendWh } from "../SendWh";
import { BASE_AVATAR_PROFILE } from "../../constants";
import { HiChevronLeft, HiOutlinePencil } from "react-icons/hi2";
import { PP } from "../PorducstPerPoints";

export const UserProfile = ({ showP }: any) => {
  const [showModal, setModal] = useState(false);
  const [actionSh, setActionSh] = useState(false);
  const user: Asociado = useSelector((state: Asociado) => state.user);

  const history = useHistory();

  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const cerrarSesion = () => {
    const shouldSendMessage = window.confirm("Salir?");

    if (shouldSendMessage) {
      dispatch(removeUser());
      history.replace("/");
      App.exitApp();
    }
  };

  const { deadline, calculateDeadline } = GetDeadLine(user.fecha_vencimiento);
  let INBODY_MESSAGE = `Hola mi nombre es ${user.Nombre_Asociado} ${user.Apellidos}, me gustaria saber como puedo agendar un inbody`;
  const backButtonHandler = () => {
    showP(false);
  };
  useEffect(() => {
    document.addEventListener("ionBackButton", backButtonHandler);
    return () => {
      document.removeEventListener("ionBackButton", backButtonHandler);
    };
  }, []);

  useEffect(() => {
    calculateDeadline();
  }, []);

  const openGallery = async () => {
    try {
      if (user != null) {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Base64,
          source: CameraSource.Photos,
          quality: 100,
        });

        if (photo.base64String) {
          upph(photo.base64String);
        }
      }
    } catch (error) {
      toast(JSON.stringify(error.message), {
        position: "top-right",
        style: { marginTop: "1.5rem" },
      });
    }
  };

  const upph = async (upImg: string) => {
    if (upImg) {
      try {
        console.log("SE ESTA SUBIENDO");
        toast.loading("Subiendo foto", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            marginTop: "1.5rem",
          },
          position: "top-right",
        });

        const ph = await dispatch(uploadPhono(upImg, user.Clav_Asociado));
        if (ph) {
          toast.dismiss();
          toast.success("Foto actualizada", {
            position: "top-right",
            style: { marginTop: "1.5rem" },
          });
          setTimeout(() => {
            showP(false);
            showP(true);
          }, 500);
        }
      } catch (error: any) {
        toast.dismiss();
        toast.error(`${error.message}`);
        console.error("Error al subir la imagen:", error, {
          position: "top-right",
          style: { marginTop: "1.5rem" },
        });
      } finally {
        //
      }
    }
  };
  const [pp, setPp] = useState(false);
  const gotPp = () => {
    if (user.permisos !== 0) {
      setPp(true);
    }
  };

  return (
    <>
      <IonContent>
        <Toaster />

        <div className="main-ctn">
          <div className="head-containaer-1">
            <IonToolbar>
              <IonButtons slot="start">
                <HiChevronLeft
                  onClick={() => backButtonHandler()}
                  style={{ fontSize: "3.2rem", marginBottom: "0rem" }}
                />
              </IonButtons>
            </IonToolbar>
          </div>
          <div className="head-containaer-2">
            <div className="profile-data-container">
              <img
                src={BASE_AVATAR_PROFILE + user.imgAvatar}
                onClick={() => setActionSh(true)}
              />
            </div>

            <h1 className="user-name ">{`${user.Nombre_Asociado} ${user.Apellidos}`}</h1>
          </div>
          <div className="my-account">
            <div className="detail-account">
              <div className="detail-title">
                <h3 className="kenyan italic">MI CUENTA</h3>
                <h5 className="poppins-light" style={{ fontSize: "1em" }}>
                  Revisar detalles de mi cuenta
                </h5>
              </div>

              <HiOutlinePencil
                className="pencil"
                onClick={() => setModal(true)}
              />
            </div>

            <h3 className="kenyan italic" style={{ fontSize: "1.7em" }}>
              CLIENTE PREMIUM
            </h3>

            <div className="ponits-container" onClick={() => gotPp()}>
              <img className="points-icon " src={points} />
              <div className="points">
                <h5>Puntos Disponibles</h5>
                <h3 className="kenyan">{user.puntos}</h3>
              </div>
            </div>

            <div
              className="btn-add-inbody-container"
              onClick={() => SendWh(INBODY_MESSAGE)}
            >
              <div className="btn-add-inbody">
                <img className="schedule-icon" src={schedule} />
                <h3>Agendar Inbody</h3>
              </div>
            </div>
            <div className="memberships">
              <h1 className="kenyan italic">MEMBRESÍA</h1>
              <h2 className="poppins-light" style={{ fontSize: "1.2em" }}>
                Activa hasta: {deadline && deadline}{" "}
              </h2>
            </div>
          </div>
        </div>
        <div className="btn-close-container" onClick={cerrarSesion}>
          <div className="btn-close">Cerrar Sesión</div>
        </div>
      </IonContent>

      <IonModal isOpen={showModal}>
        <div
          className="btn-close-update-container"
          onClick={() => setModal(false)}
        >
          <AiOutlineCloseCircle className="btn-close-update" />
        </div>
        <UpdateProfile setModal={setModal} user={user} />
      </IonModal>

      <IonActionSheet
        isOpen={actionSh}
        onDidDismiss={() => setActionSh(false)}
        cssClass="action-sheet"
        buttons={[
          {
            text: "Seleccionar foto de perfil",
            icon: cloudUpload,
            role: "",
            handler: () => {
              openGallery();
            },
          },
          {
            text: "Cancelar",
            icon: close,
            role: "cancel",
          },
        ]}
      />

      <IonModal isOpen={pp}>
        <PP setpp={setPp} />
      </IonModal>
    </>
  );
};
