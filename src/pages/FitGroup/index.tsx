import { useHistory } from "react-router";
import fitStoreImg from "../Home/img/fitbar.png";

export const FitGroup = () => {
  const history = useHistory();
  const goFitBar = () => {
    history.push(`/fitbar`);
  };
  return (
    <main className="flex flex-col justify-between items-start  h-screen pb-40   ">
      <section className=" flex w-[100%] justify-center items-center text-[2rem] tracking-widest poppins h-[19vh]   bg-gradient-to-r from-[#ff7d04] to-[#ec540d]  rounded-b-[0.7rem] italic bold ">
        TIENDA
      </section>

      <section className="flex justify-center pl-2 pr-5 w-[90%] h-[9rem]   border-b-[2px] border-t-[2px] border-r-[2px] border-[#ec540d]  rounded-r-full ">
        <div
          className="flex  justify-between text-[1.2rem] items-center  "
          onClick={goFitBar}
        >
          <p className="mr-5">
            Lorem ipsum dolor sit amet. | Lorem ipsum dolor sit amet
            |consectetur adipisicing.
          </p>

          <img
            className="w-[6rem] bg-gradient-to-r from-[#ff7d04] to-[#ec540d] rounded-full p-1"
            src={fitStoreImg}
          />
        </div>
      </section>

      <section className="flex ml-[10%] mb-[10vh] justify-end pl-5 pr-2 w-[90%] h-[9rem]   border-b-[2px] border-t-[2px] border-l-[2px] border-[#ec540d]  rounded-l-full ">
        <div className="flex   text-[1.2rem] items-center  ">
          <img
            className="w-[6rem] bg-gradient-to-r from-[#ff7d04] to-[#ec540d] rounded-full p-1"
            src={fitStoreImg}
          />
          <p className="ml-5">
            Lorem ipsum dolor sit amet. | Lorem ipsum dolor sit amet
            |consectetur adipisicing.
          </p>
        </div>
      </section>
    </main>
  );
};
