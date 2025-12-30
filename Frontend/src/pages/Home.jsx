import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../utils/axios";

const Home = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const [resumeUrl, setResumeUrl] = useState(null);

    useEffect(() => {
        async function getResume() {
            const res = await axios.get("/api/admin/resume");
            setResumeUrl(res.data.resume.url);
        }

        getResume().catch((err) => {});
    }, []);

    const getGMTOffset = () => {
        const offsetMinutes = -time.getTimezoneOffset();
        const sign = offsetMinutes >= 0 ? "+" : "-";
        const absOffset = Math.abs(offsetMinutes);
        const hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
        const minutes = String(absOffset % 60).padStart(2, "0");
        return `GMT (${sign}${hours}:${minutes})`;
    };

    return (
        <div id="home" data-scroll-section className="w-full">
            <Navbar />
            <div className="heading font-semibold flex flex-col items-start relative pb-30 pt-15 md:pt-40">
                <div className="flex w-full justify-start gap-[12vw]">
                    <h1 className="text-[19vw] md:text-[12vw] leading-none tracking-tight">
                        FullStack
                    </h1>
                    <div className="sub-text absolute bottom-0 md:static flex items-center justify-center gap-10 md:gap-15">
                        <span className="text-[0.67rem] font-medium text-gray-400 pt-0 block uppercase">
                            Currently Available For <br /> Freelance Worldwide
                        </span>
                        <span className="text-[0.67rem] font-medium text-gray-400 pt-0 block uppercase">
                            My local Time{" "}
                            {time.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}{" "}
                            <br />
                            {getGMTOffset()}
                        </span>
                    </div>
                </div>
                <div className="w-max md:w-full leading-none flex flex-col md:flex-row items-end md:items-baseline md:py-4 md:justify-end md:gap-10">
                    <p className="italianno-regular pr-3 text-[15vw] leading-none md:text-[9vw] text-[#30E897]">
                        " Web "
                    </p>
                    <h1 className="text-[19vw] md:text-[12vw] leading-[0.5]">
                        Developer
                    </h1>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <a
                    href={resumeUrl || "#"}
                    download="abhishek_resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block px-5 py-2 mt-15 text-[0.85rem] font-semibold md:hidden md:mt-0 rounded-full bg-[#ef6993] text-white text-center ${
                        !resumeUrl && "pointer-events-none"
                    }`}
                >
                    Download Resume Offline
                </a>
            </div>
        </div>
    );
};

export default Home;
