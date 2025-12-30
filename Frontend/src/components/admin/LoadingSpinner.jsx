import React from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner = ({
    size = "md",
    fullScreen = false,
    text = "",
    color = "#EF6A93",
}) => {
    // Size variants
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12",
        xl: "w-16 h-16",
    };

    const textSizeClasses = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
    };

    const spinner = (
        <div className="flex flex-col items-center justify-center gap-3">
            <Loader2
                className={`${sizeClasses[size]} animate-spin`}
                style={{ color }}
            />
            {text && (
                <p
                    className={`${textSizeClasses[size]} text-white/70 font-medium`}
                >
                    {text}
                </p>
            )}
        </div>
    );

    // Full screen loading overlay
    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-[#111] flex items-center justify-center z-50">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative">{spinner}</div>
            </div>
        );
    }

    // Inline spinner
    return spinner;
};

export default LoadingSpinner;
