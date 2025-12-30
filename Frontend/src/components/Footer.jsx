const Footer = () => {
    return (
        <footer
            data-scroll-section
            className="w-full border-t pt-7 md:pt-9 pb-3 md:pb-5 border-[#74747483]"
        >
            <div className="w-full flex md:flex-row flex-col gap-1 md:items-center justify-between">
                <div className="left">
                    <div className="flex text-sm items-center justify-center md:justify-start gap-3">
                        
                        <span>
                            <a
                                href="https://www.linkedin.com/in/abhishek-m-sharma-88b403281/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ➀ Linkedin
                            </a>
                        </span>
                        <span>
                            <a
                                href="https://github.com/abhishek-devop01"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ➁ GitHub
                            </a>
                        </span>
                        <span>
                            <a
                                href="https://x.com/2EZ4xAbhishek"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ➂ Twitter
                            </a>
                        </span>
                    </div>
                </div>
                <div className="right">
                    <h4 className="uppercase text-[0.70rem] md:text-[0.75rem] text-center flex items-center justify-center gap-1">
                        © 2025 Abhishek — Created with{" "}
                        <i className="ri-heart-line text-pink-400 text-lg"></i>{" "}
                        by me
                    </h4>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
