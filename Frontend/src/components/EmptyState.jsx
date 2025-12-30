import { WifiOff, Database, Frown } from "lucide-react";

const EmptyState = ({ type = "error", message }) => {
    const states = {
        error: {
            icon: WifiOff,
            title: "Oops! Couldn't connect",
            defaultMessage: "Looks like the server's taking a coffee break",
            color: "text-red-400",
        },
        empty: {
            icon: Database,
            title: "Nothing here yet",
            defaultMessage: "Check back soon for updates!",
            color: "text-teal-400",
        },
        loading: {
            icon: null,
            title: "Loading...",
            defaultMessage: "Hang tight, fetching the good stuff",
            color: "text-gray-400",
        },
    };

    const state = states[type] || states.error;
    const Icon = state.icon;

    return (
        <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4">
            {Icon && (
                <div className={`mb-4 md:mb-6 ${state.color}`}>
                    <Icon
                        size={32}
                        strokeWidth={1.5}
                        className="md:w-12 md:h-12 w-8 h-8"
                    />
                </div>
            )}
            <h3 className="text-white text-lg md:text-2xl font-semibold mb-2 text-center">
                {state.title}
            </h3>
            <p className="text-gray-400 text-sm md:text-base text-center max-w-md">
                {message || state.defaultMessage}
            </p>
        </div>
    );
};

export default EmptyState;
