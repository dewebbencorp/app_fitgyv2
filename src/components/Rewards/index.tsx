import { useInView } from "react-intersection-observer";

export const Rewards = () => {
  const { ref, inView } = useInView();

  return (
    <main ref={ref} className="mt-8 mb-[10vh]">
      <div className={inView ? "animate-appearance-in " : ""}>
        <section className="  animate-appearance-in flex  child:w-[50%] child:h-[100%] items-center bg-gradient-to-r from-[#ff7d04] to-[#ec540d]  rounded-[8px]  border-[1px] border-[#ff7d04] h-[7rem] mt-5 mb-10">
          <div className="flex  justify-center  items-center rewards-left">
            <img
              className="w-11 h-11 "
              src="https://fitbar.mx/img/BEBIDA.3fb51341.png"
            />
          </div>
          <div className="flex justify-start items-center child:text-white ">
            <p className="poppins italic bold text-[1rem]">Promociones</p>
          </div>
        </section>
      </div>
    </main>
  );
};
