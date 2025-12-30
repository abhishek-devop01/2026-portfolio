const GlowButton = () => {
  return (
    <a
      href="MailTo: abhishek86755@gmail.com"
      className="
        flex items-center gap-2 
        rounded-full 
        px-3 py-2
        bg-gradient-to-r from-green-500 to-green-600
        text-white text-[0.70rem] md:text-[0.80rem] font-medium tracking-tight
        shadow-lg shadow-green-500/40
        hover:scale-102 cursor-pointer hover:shadow-green-500/50
        transition-all duration-300 ease-in-out
      "
    >
      {/* glowing dot */}
      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
      Contact Me, I'm available for work
    </a>
  );
};

export default GlowButton;
