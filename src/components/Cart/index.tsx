import { useEffect, useState } from "react";

import { IonActionSheet, IonButtons, IonModal, IonToolbar } from "@ionic/react";
import { HiChevronLeft, HiPencil } from "react-icons/hi2";
import { BsWhatsapp } from "react-icons/bs";
import { IoPencilOutline, IoSadSharp } from "react-icons/io5";
import { useHistory } from "react-router";
import { Asociado, Cart as cart } from "../../interfaces";
import "./cart.css";
import { sendWhatsAppMessage } from "./senMessage";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { dropAllCart, dropOrder } from "../../store/slices/cart";
import { cartTotal } from "../../store/services/cart";
import { UpdateOrder } from "../FoodDetail/UpdateOrder";
import toast, { Toaster } from "react-hot-toast";

export const Cart = () => {
  const items = useSelector((state: any) => state.cart);
  const history = useHistory();
  const [isClear, setClear] = useState(false);
  const [isDetail, setDetail] = useState(false);
  const [product, setProduct] = useState<cart>();
  const dispatch = useDispatch();
  const user: Asociado = useSelector((state: Asociado) => state.user);
  useEffect(() => {
    
    setTimeout(() => {
      loadData();
    }, 1);
  }, []);

  const backButtonHandler = () => {
    setDetail(false); // Cerrar el modal

  };

  useEffect(() => {
   
    document.addEventListener("ionBackButton", backButtonHandler);
    return () => {
      document.removeEventListener("ionBackButton", backButtonHandler);
    };
  }, []);

  const loadData = async () => {};

  const handleBackClick = () => {
    const previousPath = history.location.state?.prevPath || undefined;

    console.log(previousPath);

    if (previousPath) {
      window.location.href = previousPath;
      return;
    } else {
      history.goBack();
    }
  };

  const handleWhatsAppClick = () => {
    sendWhatsAppMessage(
      items,
      setClear,
      `${user.Nombre_Asociado} ${user.Apellidos}`,
      user.Clav_Asociado
    );
  };

  if (isClear) {
    setClear(false);
    dispatch(dropAllCart(items));
  }

  const showDetail = (data: any, total: number) => {
    setDetail(true);

    setProduct(data);
  };

  const onDeletedOrder = (id: number) => {
    dispatch(dropOrder(id));
    toast.success("Eliminado", {
      position: "top-right",
      style: { marginTop: "1.5rem" },
    });
  };

  return (
    <>
      <Toaster />
      <div className="cart-main-container">
        <div className="toolbar">
          <IonToolbar>
            <IonButtons slot="start">
              <HiChevronLeft
                onClick={() => handleBackClick()}
                style={{ fontSize: "2.5rem" }}
              />
            </IonButtons>
            <h1 className="label-title">Mi carrito</h1>
          </IonToolbar>
        </div>

        <div className="cart-main">
          <div className="cart-container">
            {items &&
              items.length !== 0 &&
              items.map((food: cart) => (
                <>
                  <div key={food.id_producto}>
                    <div className="card-container-food  ">
                      <div className="card-food">
                        <div className="icon-container-food ">
                          <img src={food.img_url} />
                        </div>
                        <div className="card-description-food">
                          <h1 className="title-food-cart">{food.product}</h1>
                          <h2 className="price-food limit-text ">
                            {"$" + food.price}
                          </h2>
                        </div>

                        <div className="btn-options-container">
                          <IoPencilOutline
                            className="btn-update-order"
                            onClick={() => showDetail(food, food.total)}
                          />
                          <AiFillDelete
                            className="btn-delete-order"
                            onClick={() => onDeletedOrder(food.id_producto)}
                          />
                        </div>
                      </div>

                      <div className="total-product-container">
                        <h5 className="total-product">{food.total}</h5>
                      </div>
                    </div>
                  </div>
                </>
              ))}

            {items.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontFamily: "keyan",
                  fontSize: "1.2rem",
                  gap: "1.5rem",
                  animation:
                    "shimmerAnimation  4s ease-in-out alternate-reverse infinite",
                }}
                className="ring"
              >
                ¡No hay productos en el carrito!
                <IoSadSharp
                  style={{
                    fontSize: "2rem",
                  }}
                  className="bell-joke"
                />
              </div>
            )}
          </div>
        </div>
        <div className="cart-total-container">
          <h4>Total</h4>
          <h5> {"$" + cartTotal().total_price}</h5>
        </div>
      </div>

      {items.length > 0 && (
        <div
          className="btn-pay-container"
          onClick={() => handleWhatsAppClick()}
        >
          <div className="btn-whats-container">
            <h5 className="text-got">Pídelo por WhatsApp</h5>
            <BsWhatsapp className="btn-whats" />
          </div>
        </div>
      )}

      <IonModal id="md" isOpen={isDetail}>
        <UpdateOrder food={product} showModal={setDetail} />
      </IonModal>
    </>
  );
};
