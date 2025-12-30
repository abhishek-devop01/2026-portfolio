import React from "react";
import GlowText from "../components/GlowText";

const Certifications = () => {
  const certificates = [
    {
      title: "Job-Ready Cohort 1.0",
      desc: "by Sheryians Coding School, a Full-Stack Web Development program covering Frontend, Backend, Deployment.",
      link: "https://ik.imagekit.io/mfac8dwut/Portfolio%20Assets/cohort1-completion.png?updatedAt=1758639229527",
    },
  ];

  return (
    <div className=" w-full pt-16 pb-20 md:pb-25 md:pt-24">
      {/* Heading */}
      <div className="heading pb-8 md:pb-16 flex flex-col items-baseline justify-start">
        <span className="md:text-[1.5vw] font-semibold text-[4.5vw] flex items-center gap-3 leading-7 tracking-tight">
          <div className="dash h-0.5 bg-white w-10"></div>
          Accreditations
        </span>
        <GlowText title={"Certifications."} />
      </div>

      {/* Cards */}
      <div className="cards flex flex-col gap-12">
        {certificates.map((certificate, idx) => {
          if (idx % 2 == 0) {
            return (
              <div
                key={idx}
                className="card border-b border-b-[#747474c2] pb-10 flex md:flex-row gap-6 flex-col-reverse justify-between items-center"
              >
                <div className="left w-full md:w-1/2">
                  <h2 className="text-2xl md:text-4xl font-semibold pb-3">
                    {certificate.title}
                  </h2>
                  <p className="md:text-lg text-base leading-6 text-gray-200">
                    {certificate.desc}
                  </p>
                </div>
                <div className="right shrink-0 h-[15rem] w-full md:w-[30rem] rounded-2xl overflow-hidden shadow-lg">
                  <img
                    className="h-full w-full object-cover object-top"
                    src={
                      certificate.link
                        ? certificate.link
                        : "/images/comingsoon.webp"
                    }
                    alt="Certificate"
                  />
                </div>
              </div>
            );
          }

          return (
            <div
              key={idx}
              className="card border-b border-b-[#747474c2] pb-10 flex md:flex-row-reverse gap-6 flex-col-reverse justify-between items-center"
            >
              <div className="left w-full md:w-1/2">
                <h2 className="text-2xl md:text-4xl font-semibold pb-3">
                  {certificate.title}
                </h2>
                <p className="md:text-lg text-base leading-6 text-gray-200">
                  {certificate.desc}
                </p>
              </div>
              <div className="right shrink-0 h-[15rem] w-full md:w-[30rem] rounded-2xl overflow-hidden shadow-lg">
                <img
                  className="h-full w-full object-cover"
                  src={
                    certificate.link
                      ? certificate.link
                      : "/images/comingsoon.webp"
                  }
                  alt="Certificate"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Certifications;
