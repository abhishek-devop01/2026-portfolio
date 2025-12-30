import React, { useEffect, useState } from "react";
import GlowText from "../components/GlowText";
import EmptyState from "../components/EmptyState";
import axios from "../utils/axios";

const Honors = () => {
    const [honors, setHonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const viewCertificate = (url) => {
        window.open(url, "_blank");
    };

    useEffect(() => {
        async function getHonors() {
            try {
                const res = await axios.get("/api/admin/honors", {
                    withCredentials: true,
                });
                setHonors(res.data.honors);

                setTimeout(() => {
                    if (window.locomotiveScroll) {
                        window.locomotiveScroll.update();
                    }
                }, 100);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        getHonors();
    }, []);

    return (
        <div data-scroll-section className="w-full pt-15 pb-15">
            <div className="heading pb-5 md:pb-20 flex flex-col items-baseline justify-start">
                <span className="md:text-[1.5vw] font-semibold text-[4.5vw] flex items-center gap-3 leading-7 tracking-tight">
                    <div className="dash h-0.5 bg-white w-10"></div>
                    Achievements
                </span>
                <GlowText title={"Honors."} />
            </div>

            <div className="flex md:flex-row gap-10 flex-col-reverse justify-between">
                {/* Left div - Always visible with parallax */}
                <div className="left w-full md:w-[30%] flex items-start md:items-center">
                    <div
                        data-scroll
                        data-scroll-speed="-0.8"
                        className="photo w-full md:w-[60%] flex flex-col justify-center gap-2"
                    >
                        <span className="block uppercase text-sm">
                            featured
                        </span>
                        <div className="profile w-full h-[12rem] overflow-hidden rounded-2xl bg-red-400">
                            <img
                                className="h-full w-full object-cover"
                                src="/images/headshot1.avif"
                                alt=""
                            />
                        </div>
                        <p className="text-sm">
                            I'm a developer with a keen interest in solving
                            real-world problems through hackathons and
                            structured coding challenges.
                        </p>
                    </div>
                </div>

                {/* Right div - Conditional content */}
                <div className="right w-full md:w-[60%]">
                    {loading ? (
                        <div className="min-h-[40vh] flex items-center justify-center">
                            <EmptyState type="loading" />
                        </div>
                    ) : error ? (
                        <div className="min-h-[40vh] flex items-center justify-center">
                            <EmptyState type="error" message={error} />
                        </div>
                    ) : honors.length === 0 ? (
                        <div className="min-h-[40vh] flex items-center justify-center">
                            <EmptyState
                                type="empty"
                                message="More achievements coming soon!"
                            />
                        </div>
                    ) : (
                        <>
                            {honors.map((item, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className="slim-card border-b gap-4 flex items-center justify-between py-7"
                                    >
                                        <div className="flex items-center justify-center gap-5 md:gap-20">
                                            <div className="top-left text-[#c0c0c0]">
                                                <div className="text text-[0.75rem]">
                                                    <span>{item.position}</span>
                                                </div>
                                                <span className="text-[0.75rem] text-[#30E897]">
                                                    {item.year}
                                                </span>
                                            </div>
                                            <div className="middle">
                                                <h3 className="text-[5vw] md:text-[1.8vw] font-bold tracking-tight">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <div
                                            onClick={() =>
                                                viewCertificate(
                                                    item.certificate
                                                )
                                            }
                                            className="arrow hover:-rotate-45 transition-all duration-200 shrink-0 cursor-pointer w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-[#414141]"
                                        >
                                            <img
                                                className="invert"
                                                src="/images/arrow.svg"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Honors;
