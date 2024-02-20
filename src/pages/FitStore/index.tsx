import axios from "axios";
import {
  IonButtons,
  IonContent,
  IonProgressBar,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { HiChevronLeft } from "react-icons/hi2";
import { useHistory } from "react-router";
import { cartTotal as totalState } from "../../store/services/cart";
import car_img from "./../../components/FoodDetail/images/img_car.png";
export const FitStoreList = () => {
  const [data, setData] = useState<any[]>([]); // Initialize with an empty array
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const fetchMoreData = useRef(true);
  const [cartTotal, setCartTotal] = useState(0);
  useEffect(() => {

    setCartTotal(totalState().total_length);
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );
        setData((prevData) => [...prevData, ...res.data.results]);

        fetchMoreData.current = !!res.data.info.next;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page]);

  const loadMoreData = async () => {
    if (fetchMoreData.current && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLIonContentElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      loadMoreData();
    }
  };

  const handleBackClick = () => {
    window.location.href = "/home/fitgroup";
  };

  const goToCart = () => {
    history.push("/carrito", { prevPath: history.location.pathname });
  };

  useEffect(() => {
    document.addEventListener("ionBackButton", (ev: any) => {
      ev.detail.register(10, () => {
        handleBackClick();
      });
    });
  }, []);

  return (
    <IonContent class="relative">
      <IonToolbar className="bg-gradient-to-r from-[#ff7d04] to-[#ec540d] rounded-bl-[3rem] animate-appearance-in-2">
        <IonButtons slot="start">
          <HiChevronLeft
            onClick={handleBackClick}
            className="absolute z-10 left-[-0.2rem] top-[-6.5rem] text-[2.5rem]"
          />
        </IonButtons>

        <div className="header-info">
          <h2 className="header-title-1">Realiza tu pedido </h2>
          <h2 className="header-title-1">a través de</h2>
          <span className="progresbar-line">
            <IonProgressBar value={1} color="light" className="custom-pg" />
          </span>

          <h1 className="header-title-2">WhatsApp</h1>
        </div>
      </IonToolbar>

      <section
        className=" p-10 h-[70vh] overflow-y-auto grid grid-cols-2 gap-4 "
        onScroll={handleScroll}
      >
        {data.map((character: any) => (
          <div
            key={character.id}
            className="flex flex-col justify-center items-center gap-4"
          >
            <img className=" h-32 rounded-md" src={character.image} />
            <h1>{character.name.slice(0, 10)}...</h1>
          </div>
        ))}
      </section>

      {loading && <IonProgressBar color="primary" type="indeterminate" />}

      <div className=" absolute bottom-5 right-5 z-20">
            {cartTotal > 0 && <span> {cartTotal}</span>}
            <img onClick={() => goToCart()} className="car" src={car_img} />
          </div>
    </IonContent>
  );
};
