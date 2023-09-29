import { PiPencilSimple } from "react-icons/pi";
import { useEffect, useState } from "react";
import points from "./images/ponts.png";
import schedule from "./images/schedule.png";
import { IonActionSheet, IonContent, IonModal } from "@ionic/react";
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

export const UserProfile = () => {
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

  useEffect(() => {
    calculateDeadline();
  }, []);
  const openGallery = async () => {
    if (user != null) {
      const image = await Camera.getPhoto({
        source: CameraSource.Photos,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });

      const imageBase64 = image.base64String;

      if (imageBase64) {
        upph(imageBase64);
      }
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
          },
        });

        const ph = await dispatch(uploadPhono(upImg, user.Clav_Asociado));
        if (ph) {
          toast.dismiss();
          toast.success("Foto actualizada");
          setTimeout(() => {
            window.location.replace("/home/perfil");
          }, 500);
        }
      } catch (error: any) {
        toast.dismiss();
        toast.error(`${error.message}`);
        console.error("Error al subir la imagen:", error);
      } finally {
        //
      }
    }
  };

  const gotPp = () => {
    if (user.permisos !== 0) {
      window.location.href = "/pp";
    }
  };

  return (
    <>
      <IonContent>
        <Toaster />

        <div className="main-ctn">
          <div className="head-containaer-1"></div>
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
                <h3 className="kenyan">MI CUENTA</h3>
                <h5>Revisar detalles de mi cuenta</h5>
              </div>

              <PiPencilSimple
                className="pencil"
                onClick={() => setModal(true)}
              />
            </div>

            <h3 className="kenyan" style={{ fontSize: "1.7em" }}>
              CLIENTE PREMIUM
            </h3>

            <div className="ponits-container" onClick={() => gotPp()}>
              <img className="points-icon" src={points} />
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
              <h1 className="kenyan">MEMBRESÍA</h1>
              <h2>Activa hasta: {deadline && deadline} </h2>
            </div>
          </div>
        </div>
        <div className="btn-close-container" onClick={cerrarSesion}>
          <div className="btn-close">Cerrar Sesión</div>
        </div>
      </IonContent>

      <IonModal isOpen={showModal}>
        <div className="btn-close-update-container">
          <AiOutlineCloseCircle
            className="btn-close-update"
            onClick={() => setModal(false)}
          />
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
      ></IonActionSheet>
    </>
  );
};
