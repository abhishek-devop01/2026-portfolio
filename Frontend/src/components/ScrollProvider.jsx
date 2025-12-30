import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import imagesLoaded from "imagesloaded";
import "locomotive-scroll/dist/locomotive-scroll.css";

const ScrollProvider = ({ children }) => {
    const containerRef = useRef(null);
    const locomotiveScrollRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        // Initialize Locomotive Scroll
        const scroll = new LocomotiveScroll({
            el: containerRef.current,
            lerp: 0.08,
            smooth: true,
            smartphone: {
                smooth: false,
            },
            tablet: {
                smooth: false,
            },
            multiplier: 1.0, // Add this
            class: "is-inview", // Add this
        });

        locomotiveScrollRef.current = scroll;
        containerRef.current.locomotive = scroll;
        window.locomotiveScroll = scroll;

        // Wait for all images to load before initial update
        imagesLoaded(containerRef.current, () => {
            scroll.update();
            setTimeout(() => scroll.update(), 500); // Add delayed update
        });

        // Update on window resize
        const handleResize = () => {
            scroll.update();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (scroll) scroll.destroy();
            if (containerRef.current) {
                containerRef.current.locomotive = null;
            }
            window.locomotiveScroll = null;
        };
    }, []);

    return (
        <div data-scroll-container ref={containerRef}>
            {children}
        </div>
    );
};

export default ScrollProvider;
