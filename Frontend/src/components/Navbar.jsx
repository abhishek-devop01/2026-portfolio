import { Link } from "react-router-dom";
import axios from "../utils/axios";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [resumeUrl, setResumeUrl] = useState(null);

    useEffect(() => {
        async function getResume() {
            const res = await axios.get("/api/admin/resume");
            setResumeUrl(res.data.resume.url);
        }

        getResume().catch((error) => {});
    }, []);

    return (
        <div className="w-full py-5 pt-[2rem] flex items-center justify-between">
            <div className="left">
                <Link
                    to="/"
                    smooth="true"
                    duration={500}
                    className="cursor-pointer text-md font-extralight flex items-center justify-center gap-2 md:gap-4"
                >
                    <h2 className="text-sm md:text-lg">
                        <span className="font-normal">Abhishek </span>Kr Sharma
                    </h2>

                    <span className=" font-thin block text-[0.70rem] md:text-[0.90rem] py-[0.15rem] px-3 md:px-5 rounded-full bg-[#EF6A93] shadow-[0_6px_20px_4px_rgba(244,114,182,0.25)]">
                        portfolio
                    </span>
                </Link>
            </div>

            <div className="right font-thin flex items-center justify-center gap-5">
                <Link
                    to="#"
                    className="cursor-pointer text-md hidden md:block opacity-60"
                >
                    Work Samples
                </Link>

                <a
                    href={resumeUrl || "#"}
                    download="abhishek.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-md hidden md:block opacity-60 ${
                        !resumeUrl && "pointer-events-none opacity-30"
                    }`}
                >
                    Explore Resume
                </a>

                <a
                    href="https://github.com/abhishek-devop01"
                    target="_blank"
                    className={`text-md hidden md:flex cursor-pointer  items-center justify-center gap-2`}
                >
                    <i className="ri-github-fill text-2xl"></i>
                    See Github
                </a>

                <div className="flex md:hidden items-center justify-center gap-1 text-[#EF6A93]">
                    <i className="ri-menu-2-line text-sm"></i>
                    <span className="block text-sm">Menu</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
