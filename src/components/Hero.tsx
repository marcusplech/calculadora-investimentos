import React from "react";

const Hero = () => {
  return (
    <section className="bg-black h-64 sm:h-80 lg:h-[343px] py-[88px] px-8 lg:p-[120px]">
      <div className="w-full h-full flex align-center flex-col justify-center gap-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFFFFC]">
          Simulador de investimentos
        </h1>
        <span className="text-lg sm:text-xl lg:text-2xl font-normal text-[#BFBDB6]">
          Descubra o quanto você pode economizar.
        </span>
      </div>
    </section>
  );
};

export default Hero;
