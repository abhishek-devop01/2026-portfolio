import axios from "../utils/axios";
import { useEffect, useRef, useState } from "react";
import EmptyState from "../components/EmptyState";

function AccordionItem({ skill }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const toggleAccordion = () => {
        setOpen(!open);

        // Update Locomotive Scroll after animation completes
        setTimeout(() => {
            if (window.locomotiveScroll) {
                window.locomotiveScroll.update();
            }
        }, 750); // Match the transition duration
    };

    return (
        <div className="border-b border-gray-700 py-6">
            <button
                onClick={toggleAccordion}
                className="flex w-full justify-between items-center cursor-pointer"
            >
                <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-md bg-[#14281D] flex items-center justify-center">
                        <i
                            className={`${skill.icon} text-2xl text-[#3BE698]`}
                        ></i>
                    </div>
                    <h2 className="text-white select-none text-lg md:text-4xl font-semibold">
                        {skill.title}
                    </h2>
                </div>
                <div className="expand flex items-center justify-center gap-2">
                    <span className="hidden md:inline font-semibold">
                        Expand
                    </span>
                    <i
                        className={`ri-arrow-down-s-line text-2xl text-white transition-transform duration-500 ${
                            open ? "rotate-180" : ""
                        }`}
                    ></i>
                </div>
            </button>
            <div
                ref={ref}
                className="overflow-hidden transition-all duration-700 pl-9"
                style={{
                    maxHeight: open ? ref.current?.scrollHeight : 0,
                }}
            >
                <div className="pt-7">
                    {skill.content.map((section, i) => (
                        <div key={i} className="mb-3 w-[95%] m-auto">
                            <h3 className="text-white text-md md:text-2xl font-semibold">
                                {section.section}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function SkillsAccordion() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getSkills() {
            try {
                const res = await axios.get("/api/admin/skills");
                setSkills(res.data.skills);
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

        getSkills();
    }, []);

    // Add resize observer to update scroll on any content changes
    useEffect(() => {
        if (skills.length > 0 && window.locomotiveScroll) {
            const updateScroll = () => {
                window.locomotiveScroll.update();
            };

            // Update scroll periodically when accordions might be animating
            const interval = setInterval(updateScroll, 1000);

            return () => clearInterval(interval);
        }
    }, [skills]);

    if (loading) {
        return <EmptyState type="loading" />;
    }

    if (error) {
        return <EmptyState type="error" message={error} />;
    }

    if (skills.length === 0) {
        return <EmptyState type="empty" message="Skills data coming soon!" />;
    }

    return (
        <div className="flex flex-col items-center py-10">
            <div className="w-full md:w-[90%] space-y-3">
                {skills.map((skill, index) => (
                    <AccordionItem key={index} skill={skill} />
                ))}
            </div>
        </div>
    );
}
