import { useInView } from "react-intersection-observer";
import { IMG_REWARDS } from "../../constants";

export const Rewards = () => {
  const { ref, inView } = useInView();

  return (
    <main ref={ref} className="mt-8 mb-[10vh]">
      <div className={inView ? "animate-appearance-in " : ""}>
        <section className="  animate-appearance-in flex  child:w-[50%] child:h-[100%] items-center bg-gradient-to-r from-[#ff7d04] to-[#ec540d]  rounded-[8px]  border-[1px] border-[#ff7d04] h-[7.5rem] mt-5 mb-10">
          <div className="flex   items-center justify-start rewards-left">
            <img
              className=" object-cover rounded-full  w-[100%] h-[100%]  "
              src={IMG_REWARDS}
            />
          </div>
          <div className="flex justify-start items-center child:text-white ">
            <p className="poppins italic bold text-[1rem] tracking-widest ">Promociones</p>
          </div>
        </section>
      </div>
    </main>
  );
};
