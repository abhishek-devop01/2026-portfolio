import React from "react";
import GlowText from "../components/GlowText";
import GlowButton from "../components/GlowButton";

const About = () => {
    return (
        <div data-scroll-section className="w-full pb-20">
            <div className="heading pt-5 flex flex-col items-baseline justify-start">
                <p className="md:text-[2.5vw] text-[6vw] pl-[0.4vw] leading-2 tracking-tight">
                    Not so
                </p>
                <GlowText title={"Boring."} />
                <p className="md:text-[2.5vw] text-[6vw] pl-[0.4vw] flex tracking-tight items-center gap-2">
                    about me section{" "}
                    <img
                        className="h-10 md:h-15"
                        src="/images/message.png"
                        alt=""
                    />
                </p>
            </div>
            <div className="h-full w-full pt-20 md:pt-40 flex items-center justify-center">
                <div className="w-full gap-8 h-full flex flex-col md:flex-row justify-between items-center">
                    <div className="w-[60%] self-start md:self-center md:w-[20%]">
                        <h3 className="pb-1.5 md:pb-3 font-semibold text-sm md:text-base">
                            About Me.
                        </h3>
                        <p className="text-[#979FAD] capitalize text-sm md:text-base">
                            I am Abhishek kr Sharma, I create unconventional yet
                            functional & visually pleasing interfaces for the
                            web application.
                        </p>
                    </div>
                    <div className="seperator gap-10 flex flex-col-reverse md:flex-row">
                        <div className="w-full flex text-center flex-col gap-5 md:gap-10 items-center justify-center">
                            <div className="heading relative leading-none flex flex-col items-center justify-center">
                                <div className="text relative pb-1">
                                    <h1 className="md:text-[6vw] text-[19vw] font-[800] tracking-tight blur-[90px] saturate-[1] opacity-60 text-[#30E897] py-2">
                                        Let's Build Together
                                    </h1>
                                    <h1 className="absolute top-0 text-[19vw] md:text-[6vw] font-[800] tracking-tight bg-[url('/images/big-green-mask.jpg')] bg-clip-text text-transparent bg-cover bg-center py-2">
                                        Let's Build Together
                                    </h1>
                                </div>
                                <span className="block text-2xl pb-3 md:text-[3vw] font-semibold">
                                    From Vision to Reality
                                </span>
                            </div>
                            <p className="text-center font-thin w-[90%]">
                                From designing sleek interfaces to building
                                scalable web solutions, <br /> I'm here to help
                                you turn your vision into reality.
                            </p>
                            <GlowButton />
                        </div>
                        <div className="w-[60%] md:text-left self-end md:self-center md:w-[20%]">
                            <h3 className="pb-1.5 md:pb-3 font-semibold text-sm md:text-base capitalize">
                                Things I Can Help you with.
                            </h3>
                            <p className="text-[#979FAD] capitalize text-sm md:text-base">
                                Web App / front-end
                                Development/ Back-end Development
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
