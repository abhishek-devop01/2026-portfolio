const WorkCard = ({ card }) => {
    const handleImageLoad = () => {
        // Update Locomotive when image loads
        const scrollContainer = document.querySelector(
            "[data-scroll-container]"
        );
        if (scrollContainer && scrollContainer.locomotive) {
            scrollContainer.locomotive.update();
        }
    };

    return (
        <div className={card.wrapperClass}>
            <img
                data-scroll
                data-scroll-speed="-1.5"
                className="h-[120%] aspect-[1/1] object-cover absolute -top-[10%]"
                src={card.image}
                alt={card.title}
                onLoad={handleImageLoad}
                onError={handleImageLoad} // Also update on error
            />
            <div className="details absolute bottom-3 left-3 md:bottom-5 md:left-5 flex flex-col items-start gap-1 md:gap-2">
                <div className="px-2 py-1 text-xs md:px-3 md:py-1 select-none md:text-sm rounded-full text-black bg-white">
                    Year: {card.year}
                </div>
                <div className="px-2 py-1 text-xs md:px-3 md:py-1 select-none md:text-sm rounded-full text-black bg-white">
                    Role: {card.role}
                </div>
                <div className="flex items-center justify-center gap-3">
                    <div className="px-3 py-1 md:px-5 md:py-2 font-semibold select-none text-lg md:text-xl rounded-full text-black bg-white">
                        {card.title}
                    </div>
                    {card.link && (
                        <a
                            href={card.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link h-9 md:h-13 w-9 md:w-13 flex items-center p-2 cursor-pointer hover:-rotate-45 transition-all duration-200 shrink-0 justify-center bg-white rounded-full"
                        >
                            <img
                                className="h-full w-full object-fill"
                                src="/images/arrow.svg"
                                alt="arrow"
                            />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkCard;
