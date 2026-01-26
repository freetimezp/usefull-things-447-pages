import Appear from "@/components/textanimation/Appear";
import React from "react";

const page = () => {
  return (
    <section className="h-screen w-full bg-[#009C49] flex items-center justify-center">
      <div className="max-w-7xl">
        {/* <Appear delay={1}> */}
          <h1 className="text-[16vw] font-big tracking-tight text-center text-neutral-300 leading-[.8]">
            NEXT JS PAGE TRANSITION
          </h1>
        {/* </Appear> */}
      </div>
    </section>
  );
};

export default page;
