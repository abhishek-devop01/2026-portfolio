import React from "react";

const GlowText = ({ title }) => {
  return (
    <div className="text relative">
      <h1 className="md:text-8xl text-5xl font-bold tracking-tight blur-[80px]
       saturate-[1] text-pink-300 py-2">
        {title}
      </h1>

      <h1
        className="absolute top-0 text-5xl md:text-8xl font-bold tracking-tight
       bg-[url('/images/bloomText.jpeg')]
       bg-clip-text text-transparent bg-cover bg-center py-2"
      >
        {title}
      </h1>
    </div>
  );
};

export default GlowText;
