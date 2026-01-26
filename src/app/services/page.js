import Appear from "@/components/textanimation/Appear";
import React from "react";

const page = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen w-full bg-[#FD3736]">
      {/* <Appear delay={1}> */}
        <h1 className=" text-[16vw] font-big tracking-tight text-center text-neutral-800 leading-[.8]">
          Services
        </h1>
      {/* </Appear> */}

      {/* <Appear delay={1.2}> */}
        <p className="text-neutral-800/70 text-xl tracking-widest uppercase mt-8 max-md:mt-4">
          Design • Develop • Deliver
        </p>
      {/* </Appear> */}
    </section>
  );
};

export default page;
