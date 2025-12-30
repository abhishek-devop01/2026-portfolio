import { useState, useEffect, useRef } from "react";
import GlowText from "../components/GlowText";
import WorkCard from "../components/WorkCard";
import EmptyState from "../components/EmptyState";
import axios from "../utils/axios";

const Works = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const sectionRef = useRef(null);
    const imagesLoadedCountRef = useRef(0);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("/api/admin/projects");
                setProjects(response.data.projects);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleImageLoaded = () => {
        imagesLoadedCountRef.current += 1;

        if (window.locomotiveScroll) {
            window.locomotiveScroll.update();
        }

        if (imagesLoadedCountRef.current === projects.length) {
            setTimeout(() => {
                if (window.locomotiveScroll) {
                    window.locomotiveScroll.update();
                }
            }, 100);
        }
    };

    const transformProjectsToWorkData = (projects) => {
        if (!projects || projects.length === 0) {
            return [];
        }

        const rows = [];
        let currentRow = [];

        projects.forEach((project, index) => {
            const card = {
                _id: project._id,
                wrapperClass: getWrapperClass(index),
                image: project.thumbnail || "/images/comingsoon.webp",
                year: project.year.toString(),
                role: project.role,
                title: project.title,
                link: project.link,
                onImageLoad: handleImageLoaded,
            };

            currentRow.push(card);

            if (
                currentRow.length === 2 ||
                (index === projects.length - 1 && currentRow.length > 0)
            ) {
                rows.push({
                    rowClass: getRowClass(rows.length),
                    cards: [...currentRow],
                });
                currentRow = [];
            }
        });

        return rows;
    };

    const getWrapperClass = (index) => {
        const mod = index % 3;
        if (mod === 0) {
            return "relative w-full md:w-[55%] aspect-[1/1] overflow-hidden rounded-3xl md:rounded-4xl";
        } else if (mod === 1) {
            return "relative w-full md:w-[32%] aspect-[5/5] overflow-hidden rounded-3xl md:rounded-4xl";
        } else {
            return "relative w-full md:w-[50%] aspect-[1/1] overflow-hidden rounded-4xl";
        }
    };

    const getRowClass = (rowIndex) => {
        const mod = rowIndex % 3;
        if (mod === 0) {
            return "flex md:flex-row flex-col justify-start md:gap-50 gap-10 px-5 py-5 md:py-10 items-end";
        } else if (mod === 1) {
            return "flex md:flex-row flex-col justify-center md:gap-50 gap-10 px-5 py-5 md:py-10 items-end";
        } else {
            return "flex flex-col md:flex-row-reverse justify-start md:gap-50 gap-10 px-5 py-5 md:py-10 items-end";
        }
    };

    const workData = transformProjectsToWorkData(projects);

    return (
        <div
            id="work"
            data-scroll-section
            ref={sectionRef}
            className="w-full pt-25 pb-10"
        >
            <div className="heading pb-10 md:pb-20 flex flex-col items-baseline justify-start">
                <span className="md:text-[1.5vw] font-semibold text-[4.5vw] flex items-center
                 gap-3 leading-7 tracking-tight">
                    <div className="dash h-0.5 bg-white w-10"></div>
                    What I do
                </span>
                <GlowText title={"Work Samples."} />
            </div>

            {loading ? (
                <EmptyState type="loading" />
            ) : error ? (
                <EmptyState type="error" message={error} />
            ) : workData.length === 0 ? (
                <EmptyState
                    type="empty"
                    message="No projects to showcase yet. Stay tuned!"
                />
            ) : (
                workData.map((row, i) => (
                    <div key={i} className={`row${i + 1} ${row.rowClass}`}>
                        {row.cards.map((card) => (
                            <WorkCard key={card._id} card={card} />
                        ))}
                    </div>
                ))
            )}
        </div>
    );
};

export default Works;
