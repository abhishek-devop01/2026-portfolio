import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="relative max-w-2xl w-full text-center">
                <div className="mb-8">
                    <h1 className="text-[110px] sm:text-[130px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EF6A93] to-[#EF6A93]/50 leading-none">
                        404
                    </h1>
                </div>

                <div className="mb-8 space-y-3">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-base sm:text-lg text-white/60 max-w-md mx-auto px-4">
                        The page you're looking for doesn't exist or has been
                        moved. Let's get you back on track!
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
                    <button
                        onClick={() => navigate("/")}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-[#EF6A93] hover:bg-[#EF6A93]/80 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#EF6A93] focus:ring-offset-2 focus:ring-offset-[#1B1B1B] flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        Go to Homepage
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/10 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#1B1B1B] flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                </div>

                {/* Decorative Element */}
                <div className="mt-12 flex justify-center gap-2">
                    <div
                        className="w-2 h-2 rounded-full bg-[#EF6A93] animate-bounce"
                        style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                        className="w-2 h-2 rounded-full bg-[#EF6A93]/70 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                        className="w-2 h-2 rounded-full bg-[#EF6A93]/40 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
